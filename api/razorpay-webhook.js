import { verifyWebhookSignature } from './_lib/razorpay.js';
import { findBookingByHoldId, findBookingByPaymentLinkId, updateBookingRow, appendPaidBooking } from './_lib/sheet.js';
import { createBookingEvent } from './_lib/calendar.js';
import { sendNotifyEmail } from './_lib/gmail.js';
import { deliverEbookPurchase } from './_lib/ebook.js';
import { AVAILABILITY, NOTIFY_EMAIL, WEBINAR_EVENT_ID, getSession } from './_lib/config.js';

export const config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatSlotRange(startISO, endISO, timeZone) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const dateFmt = new Intl.DateTimeFormat('en-IN', { timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('en-IN', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true });
  return `${dateFmt.format(start)}, ${timeFmt.format(start)} – ${timeFmt.format(end)}`;
}

function bookingNotifyEmailHtml(booking, event) {
  const when = escapeHtml(formatSlotRange(booking.slotStart, booking.slotEnd, AVAILABILITY.timezone));
  const meetLink = event.hangoutLink;
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">New booking confirmed</h2>
      <p style="margin: 0 0 16px;"><strong>${escapeHtml(booking.sessionName)}</strong> — Krish Lalwani x ${escapeHtml(booking.userName)}</p>
      <p style="margin: 0 0 8px;"><strong>When:</strong> ${when} (${escapeHtml(AVAILABILITY.timezone)})</p>
      <p style="margin: 0 0 8px;"><strong>Attendee:</strong> ${escapeHtml(booking.userName)} (${escapeHtml(booking.userEmail)})</p>
      ${meetLink ? `<p style="margin: 16px 0;"><a href="${meetLink}" style="background:#1a73e8;color:#fff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Join with Google Meet</a></p>` : ''}
      ${event.htmlLink ? `<p style="margin: 0;"><a href="${event.htmlLink}">View in Google Calendar</a></p>` : ''}
    </div>
  `;
}

// One-click webinar checkout has no pre-existing hold row and no name/email
// collected by us — Razorpay's own checkout gathers the buyer's contact
// info, which we read back here. Email is not guaranteed to be present
// (some Razorpay checkout configs treat it as optional), so this still
// records the booking and notifies Krish even when it's missing, rather
// than silently losing a paid signup.
async function handleWebinarOneClickPayment({ paymentLink, payment }) {
  const existing = await findBookingByPaymentLinkId(paymentLink.id);
  if (existing?.status === 'paid') return; // already processed (Razorpay redelivery)

  const email = payment?.email || paymentLink?.customer?.email || '';
  const name = paymentLink?.customer?.name || payment?.contact || 'Guest';
  const session = getSession('webinar');
  const startISO = session.fixedStart;
  const endISO = new Date(new Date(startISO).getTime() + session.durationMinutes * 60000).toISOString();

  if (!email) {
    console.warn(`webinar payment ${paymentLink.id} completed with no email captured by Razorpay checkout`);
  }

  const event = await createBookingEvent({
    eventId: WEBINAR_EVENT_ID,
    summary: `${session.name} — Krish Lalwani x ${name}`,
    description: `Booked via KORE 360 (one-click checkout).\nAttendee: ${name}${email ? ` (${email})` : ' — no email captured, check Razorpay dashboard for contact number'}`,
    startISO,
    endISO,
    timezone: AVAILABILITY.timezone,
    attendeeEmails: email ? [email, NOTIFY_EMAIL] : [NOTIFY_EMAIL],
  });

  await appendPaidBooking({
    sessionId: 'webinar',
    sessionName: session.name,
    slotStart: startISO,
    slotEnd: endISO,
    userName: name,
    userEmail: email,
    paymentLinkId: paymentLink.id,
  });

  try {
    await sendNotifyEmail({
      subject: `New booking: ${session.name} with ${name}${email ? '' : ' (no email captured!)'}`,
      html: bookingNotifyEmailHtml(
        { sessionName: session.name, userName: name, userEmail: email || 'not captured — check Razorpay dashboard', slotStart: startISO, slotEnd: endISO },
        event
      ),
    });
  } catch (err) {
    console.error('failed to send booking notify email (webinar one-click)', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-razorpay-signature'];

  let valid = false;
  try {
    valid = verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error('webhook signature check failed to run', err);
    return res.status(500).end();
  }
  if (!valid) {
    console.warn('razorpay webhook: invalid signature');
    return res.status(400).end();
  }

  const payload = JSON.parse(rawBody.toString('utf8'));

  // Always 200 quickly once verified, so Razorpay doesn't retry-storm us; do the work inline
  // since Vercel functions have enough time budget for this light workload.
  try {
    if (payload.event === 'payment_link.paid') {
      const paymentLink = payload.payload?.payment_link?.entity;
      const payment = payload.payload?.payment?.entity;
      const notes = paymentLink?.notes || {};

      if (notes.sessionId === 'webinar' && !notes.holdId) {
        await handleWebinarOneClickPayment({ paymentLink, payment });
        return res.status(200).end();
      }

      const holdId = notes.holdId;
      if (!holdId) {
        console.warn('razorpay webhook: payment_link.paid with no holdId in notes');
        return res.status(200).end();
      }

      const booking = await findBookingByHoldId(holdId);
      if (!booking) {
        console.warn(`razorpay webhook: no booking found for holdId ${holdId}`);
        return res.status(200).end();
      }
      if (booking.status === 'paid') {
        // Already processed (Razorpay may send the webhook more than once) — no-op.
        return res.status(200).end();
      }

      if (booking.sessionId === 'ebook') {
        // No slot, no Calendar event — just deliver the PDF and stop.
        await deliverEbookPurchase({ userName: booking.userName, userEmail: booking.userEmail });
        await updateBookingRow(booking._rowNumber, { status: 'paid' });
        return res.status(200).end();
      }

      const event = await createBookingEvent({
        eventId: booking.sessionId === 'webinar' ? WEBINAR_EVENT_ID : undefined,
        summary: `${booking.sessionName} — Krish Lalwani x ${booking.userName}`,
        description: `Booked via KORE 360.\nAttendee: ${booking.userName} (${booking.userEmail})`,
        startISO: booking.slotStart,
        endISO: booking.slotEnd,
        timezone: AVAILABILITY.timezone,
        attendeeEmails: [booking.userEmail, NOTIFY_EMAIL],
      });

      await updateBookingRow(booking._rowNumber, { status: 'paid' });

      // Best-effort: the booking is already confirmed above, so a Gmail hiccup
      // here shouldn't turn into a Razorpay retry (which would re-run
      // createBookingEvent and produce a duplicate calendar event).
      try {
        await sendNotifyEmail({
          subject: `New booking: ${booking.sessionName} with ${booking.userName}`,
          html: bookingNotifyEmailHtml(booking, event),
        });
      } catch (err) {
        console.error('failed to send booking notify email', err);
      }
    }
    res.status(200).end();
  } catch (err) {
    console.error('razorpay webhook processing error', err);
    // Non-200 so Razorpay retries — booking stays in "hold" and will be retried on next delivery.
    res.status(500).end();
  }
}

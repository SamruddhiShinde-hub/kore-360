import { verifyWebhookSignature } from './_lib/razorpay.js';
import { findBookingByHoldId, updateBookingRow } from './_lib/sheet.js';
import { createBookingEvent, ensureWebinarRoom, createAttendeeEvent } from './_lib/calendar.js';
import { sendNotifyEmail } from './_lib/gmail.js';
import { deliverEbookPurchase, deliverWebinarBonusEbook } from './_lib/ebook.js';
import { AVAILABILITY, NOTIFY_EMAIL, WEBINAR_EVENT_ID } from './_lib/config.js';

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

// event may be null if Calendar event creation failed (see the try/catch
// around createBookingEvent/createAttendeeEvent below) — Krish still gets
// notified of the paid booking, just without a Meet link that one time.
// meetLink is passed separately rather than read off event.hangoutLink
// because the webinar's per-buyer event (createAttendeeEvent) carries the
// Meet link in its location field, not its own conferenceData.
function bookingNotifyEmailHtml(booking, event, phone, meetLink) {
  const when = escapeHtml(formatSlotRange(booking.slotStart, booking.slotEnd, AVAILABILITY.timezone));
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">New booking confirmed</h2>
      <p style="margin: 0 0 16px;"><strong>${escapeHtml(booking.sessionName)}</strong> — Krish Lalwani x ${escapeHtml(booking.userName)}</p>
      <p style="margin: 0 0 8px;"><strong>When:</strong> ${when} (${escapeHtml(AVAILABILITY.timezone)})</p>
      <p style="margin: 0 0 8px;"><strong>Attendee:</strong> ${escapeHtml(booking.userName)} (${escapeHtml(booking.userEmail)})</p>
      ${phone ? `<p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${meetLink ? `<p style="margin: 16px 0;"><a href="${meetLink}" style="background:#1a73e8;color:#fff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Join with Google Meet</a></p>` : ''}
      ${!event ? `<p style="margin: 0; color:#b71e60;"><strong>Calendar event creation failed</strong> — check Vercel logs and create/add the attendee manually.</p>` : ''}
      ${event?.htmlLink ? `<p style="margin: 0;"><a href="${event.htmlLink}">View in Google Calendar</a></p>` : ''}
    </div>
  `;
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
    if (payload.event !== 'payment_link.paid') {
      console.log(`razorpay webhook: ignoring event type "${payload.event}"`);
    } else {
      const paymentLink = payload.payload?.payment_link?.entity;
      const payment = payload.payload?.payment?.entity;
      const notes = paymentLink?.notes || {};
      // Razorpay always collects a contact number during checkout regardless
      // of session type — not something our own booking form asks for.
      const phone = payment?.contact || '';

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

      // Payment is the source of truth here, not our downstream Google
      // integrations — mark paid before touching Calendar/Gmail so a hiccup
      // in either (e.g. the Calendar event insert has previously failed in
      // production with a Google auth error) can never leave a paying buyer
      // stuck in "hold" limbo with the webhook retrying forever and no email
      // ever going out. Everything below this point is independently
      // best-effort: one failure must not take another down with it.
      await updateBookingRow(booking._rowNumber, { status: 'paid' });

      const isWebinar = booking.sessionId === 'webinar';
      let event = null;
      let meetLink;
      try {
        if (isWebinar) {
          // The webinar is many buyers sharing one live session/Meet room,
          // but each buyer gets their OWN Calendar event pointing at that
          // shared room (see ensureWebinarRoom/createAttendeeEvent in
          // calendar.js) — a genuine, single-attendee event is the only way
          // Google's native invite email reaches just this buyer and not
          // everyone else already registered.
          const room = await ensureWebinarRoom({
            eventId: WEBINAR_EVENT_ID,
            summary: `${booking.sessionName} — Krish Lalwani`,
            description: 'Live Webinar Meet room. Individual attendees are invited via their own separate events, not this one.',
            startISO: booking.slotStart,
            endISO: booking.slotEnd,
            timezone: AVAILABILITY.timezone,
          });
          meetLink = room.hangoutLink;
          event = await createAttendeeEvent({
            summary: `${booking.sessionName} — Krish Lalwani x ${booking.userName}`,
            description: `Booked via KORE 360.\nAttendee: ${booking.userName}\nPhone: ${phone || 'not captured'}\nEmail: ${booking.userEmail}`,
            startISO: booking.slotStart,
            endISO: booking.slotEnd,
            timezone: AVAILABILITY.timezone,
            attendeeEmails: [booking.userEmail, NOTIFY_EMAIL],
            meetLink,
          });
        } else {
          event = await createBookingEvent({
            summary: `${booking.sessionName} — Krish Lalwani x ${booking.userName}`,
            description: `Booked via KORE 360.\nAttendee: ${booking.userName}\nPhone: ${phone || 'not captured'}\nEmail: ${booking.userEmail}`,
            startISO: booking.slotStart,
            endISO: booking.slotEnd,
            timezone: AVAILABILITY.timezone,
            attendeeEmails: [booking.userEmail, NOTIFY_EMAIL],
          });
          meetLink = event.hangoutLink;
        }
      } catch (err) {
        console.error('failed to create calendar event', err);
      }

      try {
        await sendNotifyEmail({
          subject: `New booking: ${booking.sessionName} with ${booking.userName}`,
          html: bookingNotifyEmailHtml(booking, event, phone, meetLink),
        });
      } catch (err) {
        console.error('failed to send booking notify email', err);
      }

      // Webinar buyers additionally get the bonus e-book — the join link
      // itself now comes from their own dedicated Calendar invite above, no
      // separate app-sent "you're booked in" email needed. Runs even if the
      // calendar event above failed — must go out regardless.
      if (isWebinar) {
        try {
          await deliverWebinarBonusEbook({ userName: booking.userName, userEmail: booking.userEmail });
          console.log(`webinar bonus e-book sent to ${booking.userEmail}`);
        } catch (err) {
          console.error('failed to send webinar bonus e-book', err);
        }
      }
    }
    res.status(200).end();
  } catch (err) {
    console.error('razorpay webhook processing error', err);
    // Non-200 so Razorpay retries — booking stays in "hold" and will be retried on next delivery.
    res.status(500).end();
  }
}

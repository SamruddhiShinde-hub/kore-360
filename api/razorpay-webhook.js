import { verifyWebhookSignature } from './_lib/razorpay.js';
import { findBookingByHoldId, updateBookingRow } from './_lib/sheet.js';
import { createBookingEvent } from './_lib/calendar.js';
import { sendNotifyEmail } from './_lib/gmail.js';
import { AVAILABILITY, NOTIFY_EMAIL } from './_lib/config.js';

export const config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
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
      const holdId = paymentLink?.notes?.holdId;
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

      await createBookingEvent({
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
          body: `${booking.userName} (${booking.userEmail}) just paid for ${booking.sessionName}.\n\nWhen: ${booking.slotStart} – ${booking.slotEnd} (${AVAILABILITY.timezone})\n\nCheck your calendar for the Meet link.`,
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

import { getSession } from './_lib/config.js';
import { findBookingByHoldId, updateBookingRow } from './_lib/sheet.js';
import { getRazorpayClient } from './_lib/razorpay.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { holdId } = req.body || {};
  if (!holdId) return res.status(400).json({ error: 'Missing holdId' });

  try {
    const booking = await findBookingByHoldId(holdId);
    if (!booking) return res.status(404).json({ error: 'Hold not found' });
    if (booking.status !== 'hold') return res.status(409).json({ error: 'This hold is no longer valid. Please pick a slot again.' });

    const session = getSession(booking.sessionId);
    const siteUrl = process.env.SITE_URL || 'https://kore360.com';

    const razorpay = getRazorpayClient();
    const link = await razorpay.paymentLink.create({
      amount: session.amountPaise,
      currency: 'INR',
      accept_partial: false,
      description: `${session.name} — KORE 360`,
      customer: { name: booking.userName, email: booking.userEmail },
      notify: { sms: false, email: true },
      notes: { holdId, sessionId: booking.sessionId },
      callback_url: `${siteUrl}/booking-confirmed?holdId=${holdId}`,
      callback_method: 'get',
    });

    await updateBookingRow(booking._rowNumber, { paymentLinkId: link.id });

    res.status(200).json({ url: link.short_url });
  } catch (err) {
    console.error('create-payment-link error', err);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
}

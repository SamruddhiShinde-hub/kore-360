import { getSession } from './_lib/config.js';
import { getRazorpayClient } from './_lib/razorpay.js';

// One-click checkout for the webinar: no hold, no name/email form — Razorpay's
// own checkout collects the buyer's contact info, which the webhook reads
// back out of the payment payload (see razorpay-webhook.js).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = getSession('webinar');
    const siteUrl = process.env.SITE_URL || 'https://kore360.com';

    const razorpay = getRazorpayClient();
    const link = await razorpay.paymentLink.create({
      amount: session.amountPaise,
      currency: 'INR',
      accept_partial: false,
      description: `${session.name} — KORE 360`,
      notify: { sms: false, email: true },
      notes: { sessionId: 'webinar' },
      callback_url: `${siteUrl}/booking-confirmed`,
      callback_method: 'get',
    });

    res.status(200).json({ url: link.short_url });
  } catch (err) {
    console.error('create-webinar-payment-link error', err);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
}

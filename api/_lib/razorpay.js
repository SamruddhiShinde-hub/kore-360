import Razorpay from 'razorpay';
import crypto from 'crypto';

let cachedClient = null;

export function getRazorpayClient() {
  if (cachedClient) return cachedClient;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) throw new Error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET env vars');
  cachedClient = new Razorpay({ key_id, key_secret });
  return cachedClient;
}

export function verifyWebhookSignature(rawBody, signatureHeader) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error('Missing RAZORPAY_WEBHOOK_SECRET env var');
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return expected === signatureHeader;
}

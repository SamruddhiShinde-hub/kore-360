import crypto from 'crypto';

function sign(payloadB64) {
  const secret = process.env.EBOOK_TOKEN_SECRET;
  if (!secret) throw new Error('EBOOK_TOKEN_SECRET is not configured');
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

// Opaque, tamper-proof link a buyer clicks straight from their purchase
// email into the read-only ebook viewer (see ebook-file.js). The payload
// rides in cleartext base64 — not encrypted — since it's only ever emailed
// to the buyer it names, but the HMAC signature stops anyone from forging a
// token for someone else's name/email or editing an existing one.
export function createEbookToken({ name, email, holdId }) {
  const payloadB64 = Buffer.from(JSON.stringify({ name, email, holdId })).toString('base64url');
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifyEbookToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return null;

  const expected = Buffer.from(sign(payloadB64));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!payload.email || !payload.holdId) return null;
    return payload;
  } catch {
    return null;
  }
}

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { sendEmailWithAttachment, sendNotifyEmail } from './gmail.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EBOOK_PATH = path.join(__dirname, 'assets', 'behind-the-field-ebook.pdf');
const EBOOK_FILENAME = 'Behind The Field - Krish Lalwani.pdf';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buyerEmailHtml(userName) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">Thanks for buying Behind the Field, ${escapeHtml(userName)}!</h2>
      <p style="margin: 0 0 16px;">Your e-book is attached to this email — Krish's complete playbook for breaking into sports management.</p>
      <p style="margin: 0;">Any trouble opening it, just reply to this email.</p>
    </div>
  `;
}

function webinarBonusEmailHtml(userName) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">You're booked in, ${escapeHtml(userName)}!</h2>
      <p style="margin: 0 0 16px;">Along with your calendar invite for the Live Webinar, here's a bonus — Krish's e-book, Behind the Field, attached to this email.</p>
      <p style="margin: 0;">Any trouble opening it, just reply to this email.</p>
    </div>
  `;
}

// Must be awaited before the booking is marked paid — this attachment IS the
// product, there's no fallback delivery path if sending it fails.
export async function deliverEbookPurchase({ userName, userEmail }) {
  const pdf = readFileSync(EBOOK_PATH);
  await sendEmailWithAttachment({
    to: userEmail,
    subject: 'Your e-book: Behind the Field',
    html: buyerEmailHtml(userName),
    attachment: { filename: EBOOK_FILENAME, content: pdf, mimeType: 'application/pdf' },
  });

  // Best-effort — the purchase already succeeded above, so a Gmail hiccup
  // here shouldn't cause a Razorpay retry (which would resend the PDF).
  try {
    await sendNotifyEmail({
      subject: `New e-book sale: ${userName}`,
      html: `<p>${escapeHtml(userName)} (${escapeHtml(userEmail)}) just bought the e-book.</p>`,
    });
  } catch (err) {
    console.error('failed to send ebook sale notify email', err);
  }
}

// Bonus e-book for webinar bookings — sent alongside the Calendar invite, not
// in place of it. Best-effort by design: the caller already has the booking
// confirmed and the invite sent, so a Gmail hiccup here shouldn't block or
// retry the webhook.
export async function deliverWebinarBonusEbook({ userName, userEmail }) {
  const pdf = readFileSync(EBOOK_PATH);
  await sendEmailWithAttachment({
    to: userEmail,
    subject: 'Your bonus e-book: Behind the Field',
    html: webinarBonusEmailHtml(userName),
    attachment: { filename: EBOOK_FILENAME, content: pdf, mimeType: 'application/pdf' },
  });
}

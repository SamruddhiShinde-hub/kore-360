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

function webinarBonusEbookEmailHtml(userName) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">As promised, here's your free e-book, ${escapeHtml(userName)}!</h2>
      <p style="margin: 0 0 16px;">Thanks for registering for the Live Webinar — Krish's e-book, Behind the Field, is attached to this email.</p>
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

// The only app-sent email for a webinar booking — the join link now comes
// from the buyer's own dedicated Calendar invite (see createAttendeeEvent in
// calendar.js), not from here. Best-effort: the caller already has the
// booking confirmed, so a Gmail hiccup here shouldn't block or retry the
// webhook.
export async function deliverWebinarBonusEbook({ userName, userEmail }) {
  const pdf = readFileSync(EBOOK_PATH);
  await sendEmailWithAttachment({
    to: userEmail,
    subject: 'Your free e-book: Behind the Field',
    html: webinarBonusEbookEmailHtml(userName),
    attachment: { filename: EBOOK_FILENAME, content: pdf, mimeType: 'application/pdf' },
  });
}

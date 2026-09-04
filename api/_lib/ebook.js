import { sendNotifyEmail } from './gmail.js';
import { createEbookToken } from './ebookToken.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// The link points at the in-app reader (src/pages/EbookReader.jsx), not a
// downloadable file — the token binds it to this specific buyer so the
// reader can watermark every page with their name/email.
function readerUrl({ name, email, holdId }) {
  const siteUrl = process.env.SITE_URL || 'https://kore360.com';
  const token = createEbookToken({ name, email, holdId });
  return `${siteUrl}/education/ebook/read?token=${encodeURIComponent(token)}`;
}

function readButtonHtml(url) {
  return `<p style="margin: 0 0 20px;"><a href="${url}" style="background:#1a73e8;color:#fff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Read the e-book</a></p>`;
}

function buyerEmailHtml(userName, url) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">Thanks for buying Behind the Field, ${escapeHtml(userName)}!</h2>
      <p style="margin: 0 0 16px;">Krish's complete playbook for breaking into sports management is ready for you.</p>
      ${readButtonHtml(url)}
      <p style="margin: 0;">It opens straight in your browser — no app or download needed. Any trouble opening it, just reply to this email.</p>
    </div>
  `;
}

function webinarBonusEbookEmailHtml(userName, url) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">As promised, here's your free e-book, ${escapeHtml(userName)}!</h2>
      <p style="margin: 0 0 16px;">Thanks for registering for the Live Webinar — Krish's e-book, Behind the Field, is ready for you.</p>
      ${readButtonHtml(url)}
      <p style="margin: 0;">It opens straight in your browser — no app or download needed. Any trouble opening it, just reply to this email.</p>
    </div>
  `;
}

// Must be awaited before the booking is marked paid — this reader link IS
// the product, there's no fallback delivery path if sending it fails.
export async function deliverEbookPurchase({ userName, userEmail, holdId }) {
  const url = readerUrl({ name: userName, email: userEmail, holdId });

  await sendNotifyEmail({
    to: userEmail,
    subject: 'Your e-book: Behind the Field',
    html: buyerEmailHtml(userName, url),
  });

  // Best-effort — the purchase already succeeded above, so a Gmail hiccup
  // here shouldn't cause a Razorpay retry (which would resend the link).
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
export async function deliverWebinarBonusEbook({ userName, userEmail, holdId }) {
  const url = readerUrl({ name: userName, email: userEmail, holdId });

  await sendNotifyEmail({
    to: userEmail,
    subject: 'Your free e-book: Behind the Field',
    html: webinarBonusEbookEmailHtml(userName, url),
  });
}

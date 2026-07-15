import { google } from 'googleapis';
import { getGoogleUserAuth } from './googleAuth.js';
import { NOTIFY_EMAIL } from './config.js';

function gmailClient() {
  return google.gmail({ version: 'v1', auth: getGoogleUserAuth() });
}

// Subject is built from user-supplied fields (name, session) — strip CR/LF so
// it can't inject extra headers into the raw MIME message.
function safeHeader(str) {
  return String(str).replace(/[\r\n]+/g, ' ');
}

// Base64 wrapped at 76 chars/line per RFC 2045 — some mail transfer agents
// are strict about this for attachment bodies.
function wrapBase64(b64) {
  return b64.replace(/.{76}/g, '$&\r\n');
}

// Google never emails an event's own organizer when they create it themselves
// (see calendar.js), so the "new booking" alert to Krish has to be a real,
// separately-sent email rather than relying on the Calendar invite path.
export async function sendNotifyEmail({ to = NOTIFY_EMAIL, subject, html }) {
  const gmail = gmailClient();
  const raw = [`To: ${to}`, `Subject: ${safeHeader(subject)}`, 'Content-Type: text/html; charset="UTF-8"', '', html].join('\r\n');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: Buffer.from(raw).toString('base64url') },
  });
}

// For the e-book purchase flow: delivers the actual file as an attachment,
// not just a link — attachment.content is a Buffer.
export async function sendEmailWithAttachment({ to, subject, html, attachment }) {
  const gmail = gmailClient();
  const boundary = `kore360_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const raw = [
    `To: ${to}`,
    `Subject: ${safeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    '',
    html,
    '',
    `--${boundary}`,
    `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(attachment.content.toString('base64')),
    '',
    `--${boundary}--`,
  ].join('\r\n');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: Buffer.from(raw).toString('base64url') },
  });
}

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

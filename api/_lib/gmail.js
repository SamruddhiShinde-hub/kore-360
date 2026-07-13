import { google } from 'googleapis';
import { getGoogleUserAuth } from './googleAuth.js';
import { NOTIFY_EMAIL } from './config.js';

function gmailClient() {
  return google.gmail({ version: 'v1', auth: getGoogleUserAuth() });
}

// Google never emails an event's own organizer when they create it themselves
// (see calendar.js), so the "new booking" alert to Krish has to be a real,
// separately-sent email rather than relying on the Calendar invite path.
export async function sendNotifyEmail({ subject, body }) {
  const gmail = gmailClient();
  const raw = [`To: ${NOTIFY_EMAIL}`, `Subject: ${subject}`, 'Content-Type: text/plain; charset="UTF-8"', '', body].join(
    '\r\n'
  );

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: Buffer.from(raw).toString('base64url') },
  });
}

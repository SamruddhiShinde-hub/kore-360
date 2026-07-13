import { google } from 'googleapis';

let cachedAuth = null;
let cachedCalendarUserAuth = null;

export function getGoogleAuth() {
  if (cachedAuth) return cachedAuth;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY env vars');
  }
  // Vercel env vars store newlines as literal "\n" — restore real line breaks.
  const privateKey = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;

  cachedAuth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
  return cachedAuth;
}

// Service accounts can't invite attendees (Google blocks it without Workspace
// Domain-Wide Delegation), so event creation needs to run as a real Google
// account instead — authorized once via OAuth, refreshed automatically here.
export function getCalendarUserAuth() {
  if (cachedCalendarUserAuth) return cachedCalendarUserAuth;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET or GOOGLE_OAUTH_REFRESH_TOKEN env vars');
  }

  cachedCalendarUserAuth = new google.auth.OAuth2(clientId, clientSecret);
  cachedCalendarUserAuth.setCredentials({ refresh_token: refreshToken });
  return cachedCalendarUserAuth;
}

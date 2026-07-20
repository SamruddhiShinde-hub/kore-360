import { google } from 'googleapis';
import { getGoogleAuth } from './googleAuth.js';
import { SHEET_ID, SHEET_RANGE, CONNECT_LEADS_SHEET_ID, CONNECT_LEADS_SHEET_RANGE } from './config.js';

// Column order matches the sheet header row:
// holdId | sessionId | sessionName | slotStart | slotEnd | userName | userEmail | status | paymentLinkId | createdAt
const COLUMNS = ['holdId', 'sessionId', 'sessionName', 'slotStart', 'slotEnd', 'userName', 'userEmail', 'status', 'paymentLinkId', 'createdAt'];

function sheetsClient() {
  return google.sheets({ version: 'v4', auth: getGoogleAuth() });
}

function rowToObject(row) {
  const obj = {};
  COLUMNS.forEach((col, i) => { obj[col] = row[i] ?? ''; });
  return obj;
}

// Returns all booking rows with their 1-indexed sheet row number (for updates).
export async function getAllBookings() {
  const sheets = sheetsClient();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: SHEET_RANGE });
  const rows = res.data.values || [];
  // rows[0] is the header; sheet row numbers are 1-indexed, so data starts at row 2.
  return rows.slice(1).map((row, i) => ({ ...rowToObject(row), _rowNumber: i + 2 }));
}

export async function appendHold({ holdId, sessionId, sessionName, slotStart, slotEnd, userName, userEmail }) {
  const sheets = sheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[holdId, sessionId, sessionName, slotStart, slotEnd, userName, userEmail, 'hold', '', new Date().toISOString()]],
    },
  });
}

// For flows with no pre-existing hold row (e.g. the webinar's one-click
// checkout, where Razorpay collects the buyer's details itself) — writes
// straight to 'paid' instead of going through create-hold first.
export async function appendPaidBooking({ sessionId, sessionName, slotStart, slotEnd, userName, userEmail, paymentLinkId }) {
  const sheets = sheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[`pl-${paymentLinkId}`, sessionId, sessionName, slotStart, slotEnd, userName, userEmail, 'paid', paymentLinkId, new Date().toISOString()]],
    },
  });
}

export async function updateBookingRow(rowNumber, updates) {
  const sheets = sheetsClient();
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!A${rowNumber}:J${rowNumber}`,
  });
  const existing = rowToObject(current.data.values?.[0] || []);
  const merged = { ...existing, ...updates };
  const values = COLUMNS.map((col) => merged[col] ?? '');
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!A${rowNumber}:J${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: { values: [values] },
  });
}

export async function findBookingByHoldId(holdId) {
  const bookings = await getAllBookings();
  return bookings.find((b) => b.holdId === holdId) || null;
}

export async function findBookingByPaymentLinkId(paymentLinkId) {
  const bookings = await getAllBookings();
  return bookings.find((b) => b.paymentLinkId === paymentLinkId) || null;
}

// Slots currently held (payment pending, not yet expired) or already paid —
// both block the slot from being offered again.
export async function getActiveHolds() {
  const bookings = await getAllBookings();
  return bookings.filter((b) => b.status === 'hold' || b.status === 'paid');
}

// The "Let's connect" WhatsApp popup — a separate spreadsheet from the
// booking sheet above, since these are leads, not paid bookings.
export async function appendConnectLead({ name, whatsapp, reason }) {
  const sheets = sheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: CONNECT_LEADS_SHEET_ID,
    range: CONNECT_LEADS_SHEET_RANGE,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[new Date().toISOString(), name, whatsapp, reason]],
    },
  });
}

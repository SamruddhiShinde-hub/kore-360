// ============================================================
//  Bookable sessions — single source of truth for price/duration.
//  Keys must match the `sessionId` values used by the frontend
//  booking widget (see src/data.js SESSIONS entries).
// ============================================================
export const SESSIONS = {
  webinar: { name: 'Live Webinar', durationMinutes: 60, amountPaise: 100 }, // TEMP: ₹1 for end-to-end testing, revert to 49900 (₹499) before launch
  qna: { name: '1:1 Q&A Call', durationMinutes: 10, amountPaise: 49900 },
  clarity: { name: 'Clarity Call', durationMinutes: 30, amountPaise: 149900 },
};

// Working hours (Asia/Kolkata) — adjust to match Krish's real availability.
export const AVAILABILITY = {
  timezone: 'Asia/Kolkata',
  workingDays: [1, 2, 3, 4, 5, 6], // 0 = Sunday ... 6 = Saturday. Sunday off.
  startHour: 10, // 10:00
  endHour: 19, // 19:00
  bufferMinutes: 10, // gap kept free between consecutive bookings
  daysAhead: 21, // how far into the future users can book
};

export const HOLD_TTL_MINUTES = 15;

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const SHEET_RANGE = 'Sheet1!A:J';
export const NOTIFY_EMAIL = 'work.krishlalwani@gmail.com';

export function getSession(sessionId) {
  const session = SESSIONS[sessionId];
  if (!session) throw new Error(`Unknown sessionId: ${sessionId}`);
  return session;
}

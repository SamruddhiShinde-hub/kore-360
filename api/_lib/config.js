// ============================================================
//  Bookable sessions — single source of truth for price/duration.
//  Keys must match the `sessionId` values used by the frontend
//  booking widget (see src/data.js SESSIONS entries).
// ============================================================
export const SESSIONS = {
  // fixedStart makes this a single shared group session (see slots.js and
  // calendar.js) instead of an individually-scheduled 1:1 slot: every buyer
  // gets added as an attendee to the same Calendar event/Meet link.
  // TEMP: dropped to ₹1 for a live checkout test — restore amountPaise: 49900 afterwards.
  webinar: { name: 'Live Webinar', durationMinutes: 60, amountPaise: 100, fixedStart: '2026-07-26T17:00:00+05:30' },
  qna: { name: '1:1 Q&A Call', durationMinutes: 10, amountPaise: 49900 },
  clarity: { name: 'Clarity Call', durationMinutes: 30, amountPaise: 149900 },
  // No slot/Calendar component at all — a straight digital-product purchase
  // fulfilled by emailing the PDF (see razorpay-webhook.js + gmail.js).
  ebook: { name: 'Behind the Field (E-book)', amountPaise: 9900 },
};

// Deterministic Calendar event ID for the shared webinar event — lets
// calendar.js detect "this event already exists, add an attendee" vs.
// "first booking, create it" without needing separate lookup storage.
// Google's custom event IDs only allow lowercase a-v and digits.
export const WEBINAR_EVENT_ID = `bkgwebinar${new Date(SESSIONS.webinar.fixedStart).getTime()}`.replace(/[^a-v0-9]/g, '');

// Working hours (Asia/Kolkata) — adjust to match Krish's real availability.
export const AVAILABILITY = {
  timezone: 'Asia/Kolkata',
  workingDays: [0, 1, 2, 3, 4, 5, 6], // every day, including Sunday
  startHour: 10, // 10:00
  endHour: 23, // 23:00
  bufferMinutes: 0, // back-to-back bookings, no gap held between calls
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

// The Q&A call is shorter than the Clarity Call (10 min vs 30), but the two
// should still offer identical start times on their booking pages — so the
// Q&A grid steps in Clarity-sized increments instead of its own duration.
// The call itself still only occupies its real 10 minutes on the calendar
// (see generateDaySlots' use of session.durationMinutes for that half), so
// a slot only disappears from the Q&A grid once it's actually booked.
export function getSlotStepMinutes(sessionId) {
  if (sessionId === 'qna') return SESSIONS.clarity.durationMinutes;
  return getSession(sessionId).durationMinutes;
}

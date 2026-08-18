// ============================================================
//  Bookable sessions — single source of truth for price/duration.
//  Keys must match the `sessionId` values used by the frontend
//  booking widget (see src/data.js SESSIONS entries).
// ============================================================
export const SESSIONS = {
  // fixedStart makes this a single shared group session (see slots.js) —
  // every buyer shares the same time slot and Meet room, though each gets
  // their own individual Calendar event pointing at it (see
  // ensureWebinarRoom/createAttendeeEvent in calendar.js).
  // soldOut: true takes the webinar off sale entirely — computeAvailableSlots
  // and create-hold both refuse it, regardless of what the frontend shows.
  // Flip back to false (or drop the field) to reopen booking.
  webinar: { name: 'Live Webinar', durationMinutes: 60, amountPaise: 49900, fixedStart: '2026-08-08T17:00:00+05:30', soldOut: true },
  qna: { name: '1:1 Q&A Call', durationMinutes: 10, amountPaise: 49900 },
  clarity: { name: 'Clarity Call', durationMinutes: 30, amountPaise: 199900 },
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
  startHour: 9, // 9:00 — widened from 10:00 so the freebusy window covers CLARITY_FIXED_HOURS' 9am start
  endHour: 23, // 23:00
  bufferMinutes: 0, // back-to-back bookings, no gap held between calls
  daysAhead: 21, // how far into the future users can book
};

// The Clarity Call no longer offers a rolling 30-min grid — just these fixed
// IST start times per day (see generateDaySlots in slots.js). Q&A is
// unaffected and keeps the regular stepped grid.
export const CLARITY_FIXED_HOURS = [9, 11, 15, 19, 21]; // 9am, 11am, 3pm, 7pm, 9pm

// IST calendar dates with zero bookable slots for any non-fixed session
// (Q&A, Clarity Call) — e.g. Krish is unavailable, or a date is deliberately
// closed to push bookings toward the flash-price window. The webinar is
// unaffected (it's a single fixedStart slot, not this rolling grid).
export const BLOCKED_DATES = ['2026-08-03'];

// Manually block off specific IST hours on specific dates for the Clarity
// Call / Q&A grid, on top of whatever the live Calendar/holds already block —
// for calls Krish booked through other platforms that never touch this
// Calendar. Keys are IST calendar dates, values are hours-of-day (24h,
// matching CLARITY_FIXED_HOURS) to mark as booked. 2026-08-15 is fully booked
// out; the rest have a partial mix.
export const MANUAL_BOOKED_HOURS = {
  '2026-08-12': [19],
  '2026-08-13': [9, 21],
  '2026-08-14': [11],
  '2026-08-15': [9, 11, 15, 19, 21],
  '2026-08-16': [15, 19],
  '2026-08-17': [9],
  '2026-08-18': [11, 21],
  '2026-08-19': [19],
  '2026-08-20': [9, 15],
  '2026-08-21': [21],
  '2026-08-22': [9, 11, 19],
  '2026-08-23': [15],
  '2026-08-24': [11, 21],
  '2026-08-25': [9, 19],
  '2026-08-26': [15, 21],
};

export const HOLD_TTL_MINUTES = 15;

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const SHEET_RANGE = 'Sheet1!A:J';
export const NOTIFY_EMAIL = 'work.krishlalwani@gmail.com';

// "Let's connect" WhatsApp popup leads — a separate sheet from the booking
// sheet above (not a secret, so no env var needed; it's just the ID from
// the sheet's own URL). Must be shared as Editor with the same service
// account this file's SHEET_ID already uses, or writes to it will fail.
export const CONNECT_LEADS_SHEET_ID = '1T3Y4nlPeiLbMB__KvBYPoKkAhgffHe15oCif1Qhbxqo';
export const CONNECT_LEADS_SHEET_RANGE = 'Sheet1!A:D';

export function getSession(sessionId) {
  const session = SESSIONS[sessionId];
  if (!session) throw new Error(`Unknown sessionId: ${sessionId}`);
  return session;
}

// Clarity Call flash price: ₹999 (99900 paise) instead of the full
// ₹1,999 (199900 paise) for calls actually booked on these IST calendar
// dates. Must match CLARITY_PROMO_DATES/prices in src/data.js — that file
// only controls the display price, this is what Razorpay actually charges.
const CLARITY_PROMO_DATES = ['2026-08-18', '2026-08-19', '2026-08-20'];
const CLARITY_PROMO_AMOUNT_PAISE = 99900;

// Resolves the amount to actually charge for a session, accounting for the
// Clarity Call's date-limited flash price. `slotStart` is the ISO datetime
// of the booked call; irrelevant (and safely ignored) for other sessions.
export function getAmountPaise(sessionId, slotStart) {
  const session = getSession(sessionId);
  if (sessionId === 'clarity' && slotStart) {
    const dateKey = new Date(slotStart).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    if (CLARITY_PROMO_DATES.includes(dateKey)) return CLARITY_PROMO_AMOUNT_PAISE;
  }
  return session.amountPaise;
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

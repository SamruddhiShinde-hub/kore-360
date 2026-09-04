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
  qna: { name: '1:1 Q&A Call', durationMinutes: 10, amountPaise: 29900 },
  // ₹1,499 is the regular price everyone sees and pays by default (down
  // from a ₹1,999 list price) — see getAmountPaise below for the deeper
  // ₹999 coupon rate on top of this.
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

// Tiny deterministic PRNG seeded from a string — same seed always produces
// the same sequence, so "randomly booked" hours stay stable across repeat
// requests/reloads for a given date instead of reshuffling every time.
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(1103515245, h) + 12345) | 0;
    return ((h >>> 0) % 100000) / 100000;
  };
}

// Fake "already booked" hours shown on the Clarity Call grid for social
// proof/urgency — not real bookings (those come from the live Calendar/holds
// check in slots.js). Deterministically randomized per date instead of a
// hand-curated list, so it keeps working on future dates without upkeep.
// 1-3 of CLARITY_FIXED_HOURS come back marked booked for any given date.
export function getFakeBookedHours(dateStr) {
  const rand = seededRandom(dateStr);
  const pool = [...CLARITY_FIXED_HOURS];
  const count = 1 + Math.floor(rand() * 3);
  const picked = [];
  for (let i = 0; i < count && pool.length; i++) {
    picked.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
  }
  return picked;
}

export const HOLD_TTL_MINUTES = 15;

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Private Vercel Blob URL holding the e-book PDF — access-controlled, only
// ever fetched server-side with BLOB_READ_WRITE_TOKEN as bearer auth (see
// ebookSource.js). Purchase/webinar-bonus emails link buyers to the in-app
// reader instead (see ebook.js), which streams pages from this source
// rather than handing out a downloadable file. Set in Vercel's env vars, not
// hardcoded, so the file can be swapped without a code deploy.
export const EBOOK_BLOB_URL = process.env.EBOOK_BLOB_URL || '';

// Column K holds userPhone, appended after the original A:J layout —
// appended, not inserted, so historical rows written before phone capture
// existed stay correctly aligned (see sheet.js COLUMNS).
export const SHEET_RANGE = 'Sheet1!A:K';
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

// Clarity Call coupon price: ₹999 (99900 paise) instead of the regular
// ₹1,499 (SESSIONS.clarity.amountPaise above) — only when checkout includes
// this exact coupon code. Must match CLARITY_COUPON_CODE/prices in
// src/data.js — that file only controls the display price, this is what
// Razorpay actually charges.
const CLARITY_COUPON_CODE = 'KRISH500';
const CLARITY_COUPON_AMOUNT_PAISE = 99900;

// Resolves the amount to actually charge for a session, accounting for the
// Clarity Call's coupon-gated flash price. `couponCode` is whatever the
// buyer typed into the coupon field; irrelevant (and safely ignored) for
// other sessions, and for the Clarity Call itself unless it's an exact match.
export function getAmountPaise(sessionId, couponCode) {
  const session = getSession(sessionId);
  if (sessionId === 'clarity' && typeof couponCode === 'string' && couponCode.trim().toUpperCase() === CLARITY_COUPON_CODE) {
    return CLARITY_COUPON_AMOUNT_PAISE;
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

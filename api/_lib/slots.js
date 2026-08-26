import { AVAILABILITY, BLOCKED_DATES, CLARITY_FIXED_HOURS, HOLD_TTL_MINUTES, getFakeBookedHours, getSession, getSlotStepMinutes } from './config.js';
import { getBusyIntervals } from './calendar.js';
import { getActiveHolds } from './sheet.js';

const IST_OFFSET = '+05:30';
const MIN_NOTICE_MINUTES = 120; // don't offer slots starting within the next 2 hours

function istDate(dateStr, hour, minute) {
  const hh = String(hour).padStart(2, '0');
  const mm = String(minute).padStart(2, '0');
  return new Date(`${dateStr}T${hh}:${mm}:00${IST_OFFSET}`);
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function isHoldExpired(hold) {
  if (hold.status !== 'hold') return false;
  const created = new Date(hold.createdAt).getTime();
  return Date.now() - created > HOLD_TTL_MINUTES * 60 * 1000;
}

// dateStr is an IST calendar date. Anchoring at UTC noon (rather than IST
// midnight, which is still the *previous* UTC calendar day since IST is
// UTC+5:30) is what makes getUTCDay() actually match dateStr's real weekday.
function dayOfWeek(dateStr) {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

function istHour(ms) {
  const hourStr = new Date(ms).toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' });
  return parseInt(hourStr, 10) % 24;
}

// Shared by both the single-day and range computations below, once busy/hold
// data has already been fetched for whatever window covers dateStr. Returns
// every candidate slot with a `booked` flag rather than silently dropping
// taken ones, so the frontend can show them (greyed out) instead of hiding
// them — slots within the minimum-notice window are still omitted entirely
// since those were never offered to begin with.
function generateDaySlotsDetailed({ dateStr, sessionId, session, busy, activeHolds, earliestStart }) {
  if (BLOCKED_DATES.includes(dateStr)) return [];
  if (!AVAILABILITY.workingDays.includes(dayOfWeek(dateStr))) return [];

  const durationMs = session.durationMinutes * 60 * 1000;

  let candidateStarts;
  if (sessionId === 'clarity') {
    candidateStarts = CLARITY_FIXED_HOURS.map((h) => istDate(dateStr, h, 0).getTime());
  } else {
    const windowStart = istDate(dateStr, AVAILABILITY.startHour, 0).getTime();
    const windowEnd = istDate(dateStr, AVAILABILITY.endHour, 0).getTime();
    const stepMs = (getSlotStepMinutes(sessionId) + AVAILABILITY.bufferMinutes) * 60 * 1000;
    candidateStarts = [];
    for (let start = windowStart; start + durationMs <= windowEnd; start += stepMs) candidateStarts.push(start);
  }

  // Fake "already booked" hours for social proof — Clarity Call only.
  const fakeBookedHours = sessionId === 'clarity' ? getFakeBookedHours(dateStr) : [];

  const slots = [];
  for (const start of candidateStarts) {
    const end = start + durationMs;
    if (start < earliestStart) continue;

    const blockedByCalendar = busy.some((b) => overlaps(start, end, new Date(b.start).getTime(), new Date(b.end).getTime()));
    const blockedByHold = !blockedByCalendar && activeHolds.some((h) => overlaps(start, end, new Date(h.slotStart).getTime(), new Date(h.slotEnd).getTime()));
    const blockedByFakeBooking = fakeBookedHours.includes(istHour(start));

    slots.push({ time: new Date(start).toISOString(), booked: blockedByCalendar || blockedByHold || blockedByFakeBooking });
  }
  return slots;
}

// Available-only view, for callers that just need bookable start times (slot
// validation on hold creation, the day-strip "does this day have openings"
// check).
function generateDaySlots(args) {
  return generateDaySlotsDetailed(args).filter((s) => !s.booked).map((s) => s.time);
}

// Returns an array of ISO start-time strings available for the given session on the given date.
export async function computeAvailableSlots(sessionId, dateStr) {
  const session = getSession(sessionId);
  if (session.soldOut) return [];

  if (session.fixedStart) {
    // Shared group session (e.g. the webinar) — always the same single slot,
    // not the rolling per-booking grid below. Every buyer joins the same
    // Calendar event, so this deliberately skips the busy/hold checks that
    // exist to stop Krish's personal time being double-booked.
    const start = new Date(session.fixedStart);
    const startDateStr = start.toLocaleDateString('en-CA', { timeZone: AVAILABILITY.timezone });
    if (dateStr !== startDateStr) return [];
    if (start.getTime() < Date.now() + MIN_NOTICE_MINUTES * 60 * 1000) return [];
    return [start.toISOString()];
  }

  const windowStart = istDate(dateStr, AVAILABILITY.startHour, 0);
  const windowEnd = istDate(dateStr, AVAILABILITY.endHour, 0);

  const [busy, holds] = await Promise.all([
    getBusyIntervals(windowStart.toISOString(), windowEnd.toISOString()),
    getActiveHolds(),
  ]);
  const activeHolds = holds.filter((h) => h.status === 'paid' || !isHoldExpired(h));
  const earliestStart = Date.now() + MIN_NOTICE_MINUTES * 60 * 1000;

  return generateDaySlots({ dateStr, sessionId, session, busy, activeHolds, earliestStart });
}

// Detailed variants of the two functions above, for the frontend pickers —
// these show already-booked slots (greyed out, unselectable) instead of
// silently omitting them. `fixedStart` sessions never have a taken slot to
// show (a fresh Calendar event is created per buyer), so those just wrap the
// available-only result with booked: false.
export async function computeSlotsDetailed(sessionId, dateStr) {
  const session = getSession(sessionId);

  if (session.fixedStart) {
    const slots = await computeAvailableSlots(sessionId, dateStr);
    return slots.map((time) => ({ time, booked: false }));
  }

  const windowStart = istDate(dateStr, AVAILABILITY.startHour, 0);
  const windowEnd = istDate(dateStr, AVAILABILITY.endHour, 0);

  const [busy, holds] = await Promise.all([
    getBusyIntervals(windowStart.toISOString(), windowEnd.toISOString()),
    getActiveHolds(),
  ]);
  const activeHolds = holds.filter((h) => h.status === 'paid' || !isHoldExpired(h));
  const earliestStart = Date.now() + MIN_NOTICE_MINUTES * 60 * 1000;

  return generateDaySlotsDetailed({ dateStr, sessionId, session, busy, activeHolds, earliestStart });
}

export async function computeSlotsRangeDetailed(sessionId, dateStrs) {
  const session = getSession(sessionId);
  if (dateStrs.length === 0) return [];

  if (session.fixedStart) {
    const perDay = await Promise.all(dateStrs.map((d) => computeAvailableSlots(sessionId, d)));
    return dateStrs.map((date, i) => ({ date, slots: perDay[i].map((time) => ({ time, booked: false })) }));
  }

  const overallStart = istDate(dateStrs[0], AVAILABILITY.startHour, 0);
  const overallEnd = istDate(dateStrs[dateStrs.length - 1], AVAILABILITY.endHour, 0);

  const [busy, holds] = await Promise.all([
    getBusyIntervals(overallStart.toISOString(), overallEnd.toISOString()),
    getActiveHolds(),
  ]);
  const activeHolds = holds.filter((h) => h.status === 'paid' || !isHoldExpired(h));
  const earliestStart = Date.now() + MIN_NOTICE_MINUTES * 60 * 1000;

  return dateStrs.map((dateStr) => ({
    date: dateStr,
    slots: generateDaySlotsDetailed({ dateStr, sessionId, session, busy, activeHolds, earliestStart }),
  }));
}

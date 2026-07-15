import { AVAILABILITY, HOLD_TTL_MINUTES, getSession, getSlotStepMinutes } from './config.js';
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

// Shared by both the single-day and range computations below, once busy/hold
// data has already been fetched for whatever window covers dateStr.
function generateDaySlots({ dateStr, sessionId, session, busy, activeHolds, earliestStart }) {
  if (!AVAILABILITY.workingDays.includes(dayOfWeek(dateStr))) return [];

  const windowStart = istDate(dateStr, AVAILABILITY.startHour, 0);
  const windowEnd = istDate(dateStr, AVAILABILITY.endHour, 0);
  const stepMs = (getSlotStepMinutes(sessionId) + AVAILABILITY.bufferMinutes) * 60 * 1000;
  const durationMs = session.durationMinutes * 60 * 1000;

  const slots = [];
  for (let start = windowStart.getTime(); start + durationMs <= windowEnd.getTime(); start += stepMs) {
    const end = start + durationMs;
    if (start < earliestStart) continue;

    const blockedByCalendar = busy.some((b) => overlaps(start, end, new Date(b.start).getTime(), new Date(b.end).getTime()));
    if (blockedByCalendar) continue;

    const blockedByHold = activeHolds.some((h) => overlaps(start, end, new Date(h.slotStart).getTime(), new Date(h.slotEnd).getTime()));
    if (blockedByHold) continue;

    slots.push(new Date(start).toISOString());
  }
  return slots;
}

// Returns an array of ISO start-time strings available for the given session on the given date.
export async function computeAvailableSlots(sessionId, dateStr) {
  const session = getSession(sessionId);

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

// Same as computeAvailableSlots but for many days at once, using a single
// Calendar freebusy query and a single Sheet read spanning the whole range —
// a day-strip UI calling computeAvailableSlots once per visible day would
// otherwise multiply Google API calls by the number of days shown.
export async function computeAvailableSlotsRange(sessionId, dateStrs) {
  const session = getSession(sessionId);
  if (dateStrs.length === 0) return [];

  if (session.fixedStart) {
    const perDay = await Promise.all(dateStrs.map((d) => computeAvailableSlots(sessionId, d)));
    return dateStrs.map((date, i) => ({ date, slots: perDay[i] }));
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
    slots: generateDaySlots({ dateStr, sessionId, session, busy, activeHolds, earliestStart }),
  }));
}

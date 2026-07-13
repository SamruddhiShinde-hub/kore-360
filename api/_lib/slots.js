import { AVAILABILITY, HOLD_TTL_MINUTES, getSession } from './config.js';
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

// Returns an array of ISO start-time strings available for the given session on the given date.
export async function computeAvailableSlots(sessionId, dateStr) {
  const session = getSession(sessionId);
  const dayStart = istDate(dateStr, 0, 0);
  const dow = dayStart.getUTCDay(); // fine for day-of-week since we only need the calendar date's weekday, computed from an IST midnight instant is safe (no DST shifts)
  if (!AVAILABILITY.workingDays.includes(dow)) return [];

  const windowStart = istDate(dateStr, AVAILABILITY.startHour, 0);
  const windowEnd = istDate(dateStr, AVAILABILITY.endHour, 0);
  const stepMs = (session.durationMinutes + AVAILABILITY.bufferMinutes) * 60 * 1000;
  const durationMs = session.durationMinutes * 60 * 1000;

  const [busy, holds] = await Promise.all([
    getBusyIntervals(windowStart.toISOString(), windowEnd.toISOString()),
    getActiveHolds(),
  ]);
  const activeHolds = holds.filter((h) => h.status === 'paid' || !isHoldExpired(h));

  const now = Date.now();
  const earliestStart = now + MIN_NOTICE_MINUTES * 60 * 1000;

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

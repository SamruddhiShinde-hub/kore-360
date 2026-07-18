import { google } from 'googleapis';
import { getGoogleAuth, getGoogleUserAuth } from './googleAuth.js';
import { CALENDAR_ID } from './config.js';

function calendarClient() {
  return google.calendar({ version: 'v3', auth: getGoogleAuth() });
}

// Attendee invites must come from a real Google account (see getCalendarUserAuth) —
// service accounts are blocked from inviting attendees without Workspace Domain-Wide Delegation.
function calendarUserClient() {
  return google.calendar({ version: 'v3', auth: getGoogleUserAuth() });
}

// Returns an array of { start, end } busy intervals (ISO strings) between the given range.
export async function getBusyIntervals(timeMinISO, timeMaxISO) {
  const calendar = calendarClient();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      items: [{ id: CALENDAR_ID }],
    },
  });
  const calendarBusy = res.data.calendars?.[CALENDAR_ID]?.busy || [];
  return calendarBusy.map((b) => ({ start: b.start, end: b.end }));
}

// Adds attendeeEmails to an already-existing event without duplicating anyone
// already on it — used when createBookingEvent hits a shared/group event
// (e.g. the webinar) that a previous booking already created. Also re-applies
// summary/description/guestsCanSeeOtherGuests on every call (not just at
// event creation) so a stale event — e.g. one first created by since-removed
// code — self-heals to the current values on the very next booking, instead
// of being stuck with whatever the first-ever insert happened to set.
async function addAttendeesToEvent({ eventId, attendeeEmails, summary, description }) {
  const calendar = calendarUserClient();
  const existing = await calendar.events.get({ calendarId: CALENDAR_ID, eventId });
  const merged = [...(existing.data.attendees || [])];
  const existingEmails = new Set(merged.map((a) => a.email.toLowerCase()));
  for (const email of attendeeEmails) {
    const key = email.toLowerCase();
    if (!existingEmails.has(key)) {
      merged.push({ email });
      existingEmails.add(key);
    } else {
      // Already on the shared event (e.g. NOTIFY_EMAIL after the first
      // booking, or the same buyer's email booking again). Leaving their
      // entry untouched means this patch's `attendees` array is byte-
      // identical to what Google already has, which it appears to treat as
      // a no-op and silently skips sending a fresh invite email for —
      // resetting responseStatus forces a real change so sendUpdates:'all'
      // actually dispatches a notification to them this time too.
      const entry = merged.find((a) => a.email.toLowerCase() === key);
      entry.responseStatus = 'needsAction';
    }
  }
  const res = await calendar.events.patch({
    calendarId: CALENDAR_ID,
    eventId,
    sendUpdates: 'all',
    requestBody: { attendees: merged, summary, description, guestsCanSeeOtherGuests: false },
  });
  return res.data;
}

// Creates the confirmed booking event with an auto-generated Google Meet link
// and invites both the customer and the notify address. Google sends the
// invite email itself (sendUpdates: 'all') — no separate email step needed.
//
// Pass `eventId` for a shared/group session (e.g. the webinar): the first
// caller creates the event at that deterministic ID, and every later caller
// gets a 409 from Google (event already exists) and is routed to just add
// their attendee to the existing event instead of creating a duplicate.
//
// Note on "Invitation from an unknown sender": that Gmail banner is a
// spam-prevention heuristic based on whether the recipient has prior
// interaction with/has contacted the organizer's email — see
// https://workspaceupdates.googleblog.com/2022/07/invitations-from-known-senders-only-google-calendar.html.
// It is NOT related to the organizer's display name (which is already
// "Krish Lalwani" on the account itself) and there's no request field here
// that overrides it — `organizer` is documented as read-only on insert
// (https://developers.google.com/workspace/calendar/api/v3/reference/events),
// so setting it has no effect. The only real fix is recipient-side: add the
// sender to Google Contacts (surfaced on the booking-confirmed page).
export async function createBookingEvent({ eventId, summary, description, startISO, endISO, timezone, attendeeEmails }) {
  const calendar = calendarUserClient();
  const requestBody = {
    summary,
    description,
    // Hides the full guest list from each attendee (they still see "Krish
    // Lalwani - organizer", just not everyone else registered) — otherwise
    // every buyer sees every other buyer's email on the shared webinar event.
    guestsCanSeeOtherGuests: false,
    start: { dateTime: startISO, timeZone: timezone },
    end: { dateTime: endISO, timeZone: timezone },
    attendees: attendeeEmails.map((email) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    // Fires on the organizer's (work.krishlalwani@gmail.com) own calendar —
    // does not depend on the attendee-invite email path above.
    reminders: {
      useDefault: false,
      overrides: [{ method: 'email', minutes: 30 }],
    },
  };
  if (eventId) requestBody.id = eventId;

  try {
    const res = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody,
    });
    return res.data;
  } catch (err) {
    const status = err.response?.status || err.code;
    if (eventId && status === 409) {
      return addAttendeesToEvent({ eventId, attendeeEmails, summary, description });
    }
    throw err;
  }
}

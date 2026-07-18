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

// Creates a single-attendee booking event with an auto-generated Google Meet
// link, and invites the customer + notify address via Google's own invite
// email. Used for qna/clarity: each booking gets its own dedicated event, so
// there's never anyone else on it to accidentally notify — sendUpdates:'all'
// here only ever reaches the one buyer (+ Krish).
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
export async function createBookingEvent({ summary, description, startISO, endISO, timezone, attendeeEmails }) {
  const calendar = calendarUserClient();
  const requestBody = {
    summary,
    description,
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

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody,
  });
  return res.data;
}

// Idempotently ensures the webinar's shared Meet "room" event exists at the
// deterministic eventId and returns it (with its hangoutLink). This event is
// infrastructure only — it exists purely to hold one stable Meet link for
// the whole session and is never used to invite buyers directly, because
// Google's sendUpdates is per-request, not per-attendee: adding a new
// attendee to a shared event with sendUpdates:'all' notifies every attendee
// already on it, not just the new one, and there's no API way to target
// just the new one (see createAttendeeEvent below for how buyers actually
// get invited). sendUpdates:'none' throughout — nobody should ever be
// notified about changes to the room event itself.
export async function ensureWebinarRoom({ eventId, summary, description, startISO, endISO, timezone }) {
  const calendar = calendarUserClient();
  const requestBody = {
    id: eventId,
    summary,
    description,
    start: { dateTime: startISO, timeZone: timezone },
    end: { dateTime: endISO, timeZone: timezone },
    attendees: [],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: 'none',
      requestBody,
    });
    return res.data;
  } catch (err) {
    const status = err.response?.status || err.code;
    if (status !== 409) throw err;

    // Room already exists — most commonly because this is a later booking
    // for the same webinar slot, but could also be a room created before
    // this room/per-attendee-event split existed, which may have
    // accumulated buyer attendees the old (shared-event) way. Strip any
    // attendees back off: going forward this event is Meet-link
    // infrastructure only, so nobody but the organizer belongs on it.
    const existing = await calendar.events.get({ calendarId: CALENDAR_ID, eventId });
    if ((existing.data.attendees || []).length > 0) {
      const res = await calendar.events.patch({
        calendarId: CALENDAR_ID,
        eventId,
        sendUpdates: 'none',
        requestBody: { attendees: [] },
      });
      return res.data;
    }
    return existing.data;
  }
}

// Creates one buyer's own dedicated Calendar event for the webinar, pointing
// at the shared Meet room's link (meetLink, from ensureWebinarRoom) via the
// event's location field rather than its own conferenceData — reusing an
// existing Meet room's conferenceData across separate events isn't reliably
// supported by the API, whereas a plain link in the description/location
// always works. Because this event's only attendees are this one buyer and
// Krish, sendUpdates:'all' — Google's real, native invite email — reaches
// only them, never anyone else registered for the session.
export async function createAttendeeEvent({ summary, description, startISO, endISO, timezone, attendeeEmails, meetLink }) {
  const calendar = calendarUserClient();
  const requestBody = {
    summary,
    description,
    location: meetLink,
    start: { dateTime: startISO, timeZone: timezone },
    end: { dateTime: endISO, timeZone: timezone },
    attendees: attendeeEmails.map((email) => ({ email })),
    reminders: {
      useDefault: false,
      overrides: [{ method: 'email', minutes: 30 }],
    },
  };

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    sendUpdates: 'all',
    requestBody,
  });
  return res.data;
}

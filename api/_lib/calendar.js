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
// (e.g. the webinar) that a previous booking already created.
async function addAttendeesToEvent({ eventId, attendeeEmails }) {
  const calendar = calendarUserClient();
  const existing = await calendar.events.get({ calendarId: CALENDAR_ID, eventId });
  const merged = [...(existing.data.attendees || [])];
  const existingEmails = new Set(merged.map((a) => a.email.toLowerCase()));
  for (const email of attendeeEmails) {
    if (!existingEmails.has(email.toLowerCase())) {
      merged.push({ email });
      existingEmails.add(email.toLowerCase());
    }
  }
  const res = await calendar.events.patch({
    calendarId: CALENDAR_ID,
    eventId,
    sendUpdates: 'all',
    requestBody: { attendees: merged },
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
export async function createBookingEvent({ eventId, summary, description, startISO, endISO, timezone, attendeeEmails }) {
  const calendar = calendarUserClient();
  const requestBody = {
    summary,
    description,
    // Without this, invite emails can render as coming from an "unknown
    // sender" instead of a named organizer — this is a display hint only
    // (the organizer is always whoever CALENDAR_ID's credentials belong to),
    // but Google still needs the actual Google Account's profile name set
    // to "Krish Lalwani" (myaccount.google.com) for every client to honor it.
    organizer: { email: CALENDAR_ID, displayName: 'Krish Lalwani' },
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
      return addAttendeesToEvent({ eventId, attendeeEmails });
    }
    throw err;
  }
}

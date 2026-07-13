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

// Creates the confirmed booking event with an auto-generated Google Meet link
// and invites both the customer and the notify address. Google sends the
// invite email itself (sendUpdates: 'all') — no separate email step needed.
export async function createBookingEvent({ summary, description, startISO, endISO, timezone, attendeeEmails }) {
  const calendar = calendarUserClient();
  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
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
    },
  });
  return res.data;
}

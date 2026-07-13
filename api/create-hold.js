import crypto from 'crypto';
import { getSession, AVAILABILITY } from './_lib/config.js';
import { computeAvailableSlots } from './_lib/slots.js';
import { appendHold } from './_lib/sheet.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId, slotStart, userName, userEmail } = req.body || {};
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });
  if (!slotStart) return res.status(400).json({ error: 'Missing slotStart' });
  if (!userName || !userName.trim()) return res.status(400).json({ error: 'Missing userName' });
  if (!userEmail || !isValidEmail(userEmail)) return res.status(400).json({ error: 'Missing or invalid userEmail' });

  let session;
  try {
    session = getSession(sessionId);
  } catch {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  try {
    // Re-check the slot is still free right before locking it (closes the race window).
    const dateStr = new Date(slotStart).toLocaleDateString('en-CA', { timeZone: AVAILABILITY.timezone });
    const freeSlots = await computeAvailableSlots(sessionId, dateStr);
    if (!freeSlots.includes(new Date(slotStart).toISOString())) {
      return res.status(409).json({ error: 'That slot is no longer available. Please pick another.' });
    }

    const holdId = crypto.randomUUID();
    const slotEnd = new Date(new Date(slotStart).getTime() + session.durationMinutes * 60 * 1000).toISOString();

    await appendHold({
      holdId,
      sessionId,
      sessionName: session.name,
      slotStart: new Date(slotStart).toISOString(),
      slotEnd,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
    });

    res.status(200).json({ holdId, slotStart: new Date(slotStart).toISOString(), slotEnd });
  } catch (err) {
    console.error('create-hold error', err);
    res.status(500).json({ error: 'Failed to hold slot' });
  }
}

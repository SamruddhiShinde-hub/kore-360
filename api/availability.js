import { computeAvailableSlots } from './_lib/slots.js';
import { SESSIONS } from './_lib/config.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId, date } = req.query;
  if (!sessionId || !SESSIONS[sessionId]) return res.status(400).json({ error: 'Invalid or missing sessionId' });
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'Invalid or missing date (expected YYYY-MM-DD)' });

  try {
    const slots = await computeAvailableSlots(sessionId, date);
    res.status(200).json({ slots });
  } catch (err) {
    console.error('availability error', err);
    res.status(500).json({ error: 'Failed to compute availability' });
  }
}

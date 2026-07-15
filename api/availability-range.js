import { computeAvailableSlotsRange } from './_lib/slots.js';
import { SESSIONS } from './_lib/config.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId, start, days } = req.query;
  if (!sessionId || !SESSIONS[sessionId]) return res.status(400).json({ error: 'Invalid or missing sessionId' });
  if (!start || !/^\d{4}-\d{2}-\d{2}$/.test(start)) return res.status(400).json({ error: 'Invalid or missing start (expected YYYY-MM-DD)' });

  const numDays = Math.min(Math.max(parseInt(days, 10) || 21, 1), 31);
  const startDate = new Date(`${start}T00:00:00+05:30`);
  const dateStrs = [];
  for (let i = 0; i < numDays; i++) {
    const d = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dateStrs.push(d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }));
  }

  try {
    const results = await computeAvailableSlotsRange(sessionId, dateStrs);
    res.status(200).json({ days: results });
  } catch (err) {
    console.error('availability-range error', err);
    res.status(500).json({ error: 'Failed to compute availability' });
  }
}

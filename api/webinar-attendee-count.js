import { getAllBookings } from './_lib/sheet.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const bookings = await getAllBookings();
    const count = bookings.filter((b) => b.sessionId === 'webinar' && b.status === 'paid').length;
    res.status(200).json({ count });
  } catch (err) {
    console.error('webinar-attendee-count error', err);
    res.status(500).json({ error: 'Failed to fetch attendee count' });
  }
}

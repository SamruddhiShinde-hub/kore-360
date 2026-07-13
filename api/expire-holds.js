import { getAllBookings, updateBookingRow } from './_lib/sheet.js';
import { HOLD_TTL_MINUTES } from './_lib/config.js';

export default async function handler(req, res) {
  // Vercel Cron calls this on schedule; also callable manually for testing.
  try {
    const bookings = await getAllBookings();
    const cutoff = Date.now() - HOLD_TTL_MINUTES * 60 * 1000;
    const expired = bookings.filter((b) => b.status === 'hold' && new Date(b.createdAt).getTime() < cutoff);

    for (const b of expired) {
      await updateBookingRow(b._rowNumber, { status: 'expired' });
    }

    res.status(200).json({ expiredCount: expired.length });
  } catch (err) {
    console.error('expire-holds error', err);
    res.status(500).json({ error: 'Failed to expire holds' });
  }
}

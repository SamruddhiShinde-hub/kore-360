import crypto from 'crypto';
import { getSession } from './_lib/config.js';
import { appendHold } from './_lib/sheet.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// No slot to hold here (see config.js SESSIONS.ebook) — this just records
// who's buying before handing off to create-payment-link, same pattern as
// create-hold.js minus the availability check.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userName, userEmail } = req.body || {};
  if (!userName || !userName.trim()) return res.status(400).json({ error: 'Missing userName' });
  if (!userEmail || !isValidEmail(userEmail)) return res.status(400).json({ error: 'Missing or invalid userEmail' });

  try {
    const session = getSession('ebook');
    const holdId = crypto.randomUUID();
    const now = new Date().toISOString();

    await appendHold({
      holdId,
      sessionId: 'ebook',
      sessionName: session.name,
      slotStart: now,
      slotEnd: now,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
    });

    res.status(200).json({ holdId });
  } catch (err) {
    console.error('create-ebook-order error', err);
    res.status(500).json({ error: 'Failed to start order' });
  }
}

import { appendConnectLead } from './_lib/sheet.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, whatsapp, reason } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: 'Missing name' });
  if (!whatsapp || !whatsapp.trim()) return res.status(400).json({ error: 'Missing whatsapp' });

  try {
    await appendConnectLead({ name: name.trim(), whatsapp: whatsapp.trim(), reason: (reason || '').trim() });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('submit-connect-lead error', err);
    res.status(500).json({ error: 'Failed to save lead' });
  }
}

import { verifyEbookToken } from './_lib/ebookToken.js';
import { fetchEbookPdfBuffer } from './_lib/ebookSource.js';

// Serves the e-book PDF bytes to the in-app reader (src/pages/EbookReader.jsx)
// — never as a navigable/downloadable URL, only as a fetch() the reader
// consumes and renders page-by-page onto canvases. Gated entirely by the
// signed per-purchase token; the underlying Blob URL and its auth token stay
// server-side (see ebookSource.js).
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const payload = verifyEbookToken(req.query.token);
  if (!payload) return res.status(403).json({ error: 'This link is invalid.' });

  try {
    const buffer = await fetchEbookPdfBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'private, no-store');
    // Read by the reader page to render the on-page watermark — never trusted
    // for access control, only for what name/email to print on the page.
    res.setHeader('X-Ebook-Watermark', Buffer.from(`${payload.name || ''} · ${payload.email}`).toString('base64'));
    res.status(200).send(buffer);
  } catch (err) {
    console.error('ebook-file error', err);
    res.status(500).json({ error: 'Failed to load e-book' });
  }
}

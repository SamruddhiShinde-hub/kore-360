// Pulls the actual e-book PDF bytes from private Vercel Blob storage — the
// blob is access-controlled (a plain fetch to its URL 403s), so the only way
// to read it at all is server-side, with BLOB_READ_WRITE_TOKEN as bearer
// auth. The browser never sees this URL or token, only the rendered pages
// the viewer streams back through ebook-file.js.
let cached = null; // { buffer, fetchedAt }
const CACHE_TTL_MS = 60 * 60 * 1000; // warm lambda instances reuse this instead of re-pulling ~70MB per page turn

export async function fetchEbookPdfBuffer() {
  const url = process.env.EBOOK_BLOB_URL;
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!url) throw new Error('EBOOK_BLOB_URL is not configured');
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is not configured');

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.buffer;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Failed to fetch e-book source (${res.status})`);

  const buffer = Buffer.from(await res.arrayBuffer());
  cached = { buffer, fetchedAt: Date.now() };
  return buffer;
}

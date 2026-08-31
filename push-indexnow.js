// Runs as a `postbuild` step: reads the freshly generated public/sitemap.xml
// and submits every URL to IndexNow, which fans the notification out to Bing
// and Yandex (Google does not participate in IndexNow). Never fails the
// build — a network hiccup here shouldn't block a deploy.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Hardcoded rather than read from the SITE_URL env var — that var is set
// separately (and to a different domain) for the Razorpay callback URL.
const SITE_URL = 'https://kore360.in';
const HOST = new URL(SITE_URL).host;

function findKeyFile() {
  const files = fs.readdirSync(path.join(__dirname, 'public'));
  return files.find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
}

function getSitemapUrls() {
  const xml = fs.readFileSync(path.join(__dirname, 'public/sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const keyFile = findKeyFile();
  if (!keyFile) {
    console.warn('push-indexnow: no IndexNow key file in public/ — skipping.');
    return;
  }

  const key = keyFile.replace(/\.txt$/, '');
  const urlList = getSitemapUrls();

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `${SITE_URL}/${keyFile}`,
        urlList,
      }),
    });
    console.log(`push-indexnow: submitted ${urlList.length} URLs — status ${res.status}`);
  } catch (err) {
    console.warn('push-indexnow: submission failed (non-fatal):', err.message);
  }
}

main();

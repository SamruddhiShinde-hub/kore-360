// Regenerates public/sitemap.xml from the static route list below plus the
// live blog post index in src/blogData.js. Runs as a `prebuild` step so the
// sitemap Vite copies into dist/ is always current — no manual edits needed
// when a page or blog post is added.
//
// blogData.js is parsed as text (not imported) because it also imports image
// assets that a plain Node process can't resolve.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Hardcoded rather than read from the SITE_URL env var — that var is set
// separately (and to a different domain) for the Razorpay callback URL.
const SITE_URL = 'https://kore360.in';

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/education', priority: '0.8' },
  { path: '/management', priority: '0.8' },
  { path: '/talent', priority: '0.8' },
  { path: '/about', priority: '0.6' },
  { path: '/blogs', priority: '0.7' },
];

export function readBlogPosts() {
  const src = fs.readFileSync(path.join(__dirname, 'src/blogData.js'), 'utf8');
  const arrayMatch = src.match(/BLOG_POSTS\s*=\s*\[([\s\S]*)\];/);
  if (!arrayMatch) throw new Error('generate-sitemap: could not find BLOG_POSTS array in src/blogData.js');

  const entries = arrayMatch[1].match(/\{[^{}]*\}/g) || [];
  return entries.map((entry) => {
    const slug = entry.match(/slug:\s*'([^']*)'/)?.[1];
    const date = entry.match(/date:\s*'([^']*)'/)?.[1];
    if (!slug) throw new Error(`generate-sitemap: blog entry missing slug: ${entry}`);
    return { slug, date };
  });
}

function urlEntry({ loc, lastmod, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod && `    <lastmod>${lastmod}</lastmod>`,
    priority && `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n');
}

export function generateSitemap() {
  const posts = readBlogPosts();
  const latestPostDate = posts.reduce((latest, p) => (p.date > latest ? p.date : latest), '');

  const urls = [
    ...STATIC_PAGES.map((page) =>
      urlEntry({
        loc: `${SITE_URL}${page.path}`,
        priority: page.priority,
        lastmod: page.path === '/blogs' ? latestPostDate : undefined,
      })
    ),
    ...posts.map((post) =>
      urlEntry({
        loc: `${SITE_URL}/blogs/${post.slug}`,
        lastmod: post.date,
        priority: '0.7',
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), xml);
  console.log(`generate-sitemap: wrote public/sitemap.xml with ${STATIC_PAGES.length + posts.length} URLs.`);
}

generateSitemap();

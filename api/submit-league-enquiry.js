import { appendLeagueLead } from './_lib/sheet.js';
import { sendNotifyEmail } from './_lib/gmail.js';
import { LEAGUE_NOTIFY_EMAIL } from './_lib/config.js';

// Must match LEAGUE_ENQUIRY_OPTIONS in src/data.js (that file imports
// images, so it can't be loaded here) — anything outside these is rejected.
const OPTIONS = {
  eventType: ['Sports league', 'Tournament / championship', 'One-off sporting event', 'Corporate or brand event', 'Fan / hospitality experience', 'Other'],
  stage: ['Planning a new league', 'Preparing to launch', 'Running an existing league', 'Looking to expand or scale'],
  timeline: ['Within 3 months', '3–6 months', '6–12 months', 'Not finalized'],
  support: ['Planning and strategy', 'Event execution and operations', 'End-to-end league management', 'Long-term commercial partnership', 'Not sure yet'],
};

const LEAD_SOURCE = 'KORE 360 Website';
const LEAD_TYPE = 'Sports & League Management Enquiry';
const LEAD_CATEGORY = 'B2B Events';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9][0-9\s\-()]{6,19}$/;

// Best-effort per-instance throttle — serverless instances don't share
// memory, so this only slows down a burst from one client hitting one warm
// instance. Platform-level limits (Vercel Firewall) are the real backstop.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().replace(/\s+\n/g, '\n').slice(0, max) : '';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function validate(body) {
  const lead = {
    fullName: clean(body.fullName, 120),
    organization: clean(body.organization, 160),
    email: clean(body.email, 160),
    phone: clean(body.phone, 24),
    eventType: clean(body.eventType, 40),
    stage: clean(body.stage, 60),
    location: clean(body.location, 120),
    timeline: clean(body.timeline, 40),
    support: clean(body.support, 60),
    project: clean(body.project, 3000),
    pageUrl: clean(body.pageUrl, 300),
  };
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => { lead[k] = clean(utm[k], 200); });

  const errors = {};
  if (!lead.fullName) errors.fullName = 'Required';
  if (!EMAIL_REGEX.test(lead.email)) errors.email = 'Invalid email';
  const digits = lead.phone.replace(/\D/g, '');
  if (!PHONE_REGEX.test(lead.phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Invalid phone';
  if (!OPTIONS.eventType.includes(lead.eventType)) errors.eventType = 'Required';
  if (!OPTIONS.stage.includes(lead.stage)) errors.stage = 'Required';
  if (!OPTIONS.support.includes(lead.support)) errors.support = 'Required';
  if (lead.timeline && !OPTIONS.timeline.includes(lead.timeline)) errors.timeline = 'Invalid';
  return { lead, errors };
}

function notificationHtml(lead) {
  const rows = [
    ['Full name', lead.fullName],
    ['Organization / league', lead.organization],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Type of event', lead.eventType],
    ['Current stage', lead.stage],
    ['Event location', lead.location],
    ['Expected timeline', lead.timeline],
    ['Support looking for', lead.support],
    ['Project', lead.project],
    ['Submitted at', lead.submittedAt],
    ['Page', lead.pageUrl],
    ['UTM', ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].map((k) => lead[k] && `${k}=${lead[k]}`).filter(Boolean).join(' · ')],
    ['Lead source', lead.leadSource],
    ['Lead type', lead.leadType],
    ['Lead category', lead.leadCategory],
  ];
  const body = rows
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value || '—')}</td></tr>`)
    .join('');
  return `<div style="font-family:Arial,sans-serif;font-size:14px"><h2 style="margin:0 0 12px">New league enquiry</h2><table>${body}</table></div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};

  // Honeypot: hidden from people, filled in by naive bots. Answer like a
  // success so the bot moves on, but store/send nothing.
  if (body.website) return res.status(200).json({ success: true });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many submissions. Please try again in a few minutes.' });

  const { lead, errors } = validate(body);
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Please check the highlighted fields.', fields: errors });

  Object.assign(lead, {
    submittedAt: new Date().toISOString(),
    leadSource: LEAD_SOURCE,
    leadType: LEAD_TYPE,
    leadCategory: LEAD_CATEGORY,
  });

  // The lead has reached the team if either the sheet row or the inbox alert
  // lands — only report failure to the visitor when both do.
  const [stored, notified] = await Promise.allSettled([
    appendLeagueLead(lead),
    sendNotifyEmail({
      to: LEAGUE_NOTIFY_EMAIL,
      subject: `New league enquiry: ${lead.organization || lead.fullName} (${lead.eventType})`,
      html: notificationHtml(lead),
    }),
  ]);

  // Log only the failure reason, never the visitor's details.
  if (stored.status === 'rejected') console.error('submit-league-enquiry: sheet append failed', stored.reason?.message);
  if (notified.status === 'rejected') console.error('submit-league-enquiry: notify email failed', notified.reason?.message);

  if (stored.status === 'rejected' && notified.status === 'rejected') {
    return res.status(502).json({ error: "We couldn't send your enquiry just now. Please try again." });
  }
  res.status(200).json({ success: true });
}

// ============================================================
//  KORE 360 — events content (Home + /events)
//  Capabilities, services, credibility figures, logos and the
//  founder profile. Portfolio projects live in workContent.js.
//
//  Publishing rule: anything with `approved: false` (or a missing
//  value/asset) is left off the live site. In `npm run dev` those
//  entries still render, marked as drafts, so the layout can be
//  reviewed before the content is signed off.
// ============================================================

import { BRANDS } from './data.js';
import { SHOW_DRAFTS } from './lib/drafts.js';

export { SHOW_DRAFTS };

// ---- Home: event capability entry points ----
// `category` → portfolio filter (/work?category=…) once it has published
// work; until then the tile points at `anchor` on /events and the enquiry
// form, pre-filled with `service` (must be in EVENT_ENQUIRY_OPTIONS.services).
export const EVENT_CAPABILITIES = [
  { id: 'decor', name: 'Décor & Venue Styling', desc: 'Venue concepts, stage and entrance builds, seating layouts, florals, lighting and on-site styling.', category: 'decor', anchor: '/events#service-branding', service: 'Décor & Venue Styling' },
  { id: 'sports', name: 'Sports & League Management', desc: 'League planning, team operations, auctions and match-day delivery for leagues and tournaments.', category: 'sports', anchor: '/events#league-management', service: 'Sports & League Management' },
  { id: 'corporate', name: 'Corporate Events', desc: 'Conferences, annual meets, awards nights, offsites and corporate sports days.', category: 'corporate', anchor: '/events#services', service: 'Corporate Events' },
  { id: 'activations', name: 'Brand Activations', desc: 'Launches, fan zones, sampling and experiential set-ups built around a brand brief.', category: 'activations', anchor: '/events#services', service: 'Brand Activations & Experiences' },
  { id: 'production', name: 'Production & Broadcast', desc: 'Staging, AV and LED, livestream production and event content capture.', category: 'production', anchor: '/events#service-production', service: 'Event Production' },
  { id: 'hospitality', name: 'Hospitality & Logistics', desc: 'Travel, accommodation, transport, accreditation and guest servicing for teams, talent and VIPs.', category: null, anchor: '/events#service-hospitality', service: 'Hospitality & Logistics' },
  { id: 'sponsorship', name: 'Sponsorships & Partnerships', desc: 'Sponsorship inventory, partner sourcing and on-ground brand integration.', category: null, anchor: null, service: 'Sponsorships & Partnerships' },
  { id: 'entertainment', name: 'Entertainment & Talent', desc: 'Performers, hosts, athletes and artists, booked and managed through the show.', category: null, anchor: '/events#service-teams', service: 'Entertainment & Talent Coordination' },
];

// ---- Credibility figures (Home) ----
// Keep company, project and founder figures apart, and say which is which:
//   scope: 'company' — KORE 360 as a company, all projects
//          'project' — one event or tournament (name it in `scopeNote`)
//          'founder' — Krish's personal experience, incl. before KORE 360
// `value` is the final number (null until verified); `suffix` is e.g. '+'.
// `source` records where the figure was verified (internal, not shown).
export const EVENT_METRICS = [
  { id: 'events', label: 'Events delivered', value: null, suffix: '+', scope: 'company', scopeNote: '', source: '', approved: false },
  { id: 'cities', label: 'Cities worked in', value: null, suffix: '', scope: 'company', scopeNote: '', source: '', approved: false },
  { id: 'people', label: 'Teams & participants supported', value: null, suffix: '+', scope: 'company', scopeNote: '', source: '', approved: false },
];

export const METRIC_SCOPE_LABELS = {
  company: '',
  project: 'Single event',
  founder: 'Founder experience',
};

// ---- Logos ----
// The marks already in the site (BRANDS in data.js), each with the
// relationship it represents. Only `approved` marks are published, and
// each relationship is shown under its own label:
//   'client' | 'league-partner' | 'sponsor' — KORE 360 relationships
//   'founder'     — the founder's own professional experience before
//                   KORE 360 (matches FOUNDER_ROLES in workContent.js)
//   'unconfirmed' — was on the site before; relationship not confirmed,
//                   so it stays off the live site until it is
// Every current mark maps to a role on Krish's CV (see FOUNDER_ROLES in
// workContent.js): BCCI (IPL, Women's T20 Challenge), Rise Worldwide and
// T20 Mumbai, Chennai Singams, Actors Cricket Bash, etc.
const LOGO_RELATIONSHIPS = {
  'BCCI': 'founder',
  'Tata IPL': 'founder',
  'T20 Mumbai': 'founder',
  'Khelo India': 'founder',
  'Rise Worldwide': 'founder',
  'Legends League Cricket': 'founder',
  'ISPL': 'founder',
  'Entertainers Cricket League': 'founder',
  'Chennai Singams': 'founder',
  'Actors Cricket Bash': 'founder',
};

export const PARTNER_LOGOS = BRANDS.map((b) => {
  const relationship = LOGO_RELATIONSHIPS[b.name] || 'unconfirmed';
  return { name: b.name, logo: b.logo, relationship, approved: relationship !== 'unconfirmed' };
});

export const RELATIONSHIP_LABELS = {
  founder: 'Founder experience',
  client: 'Client',
  'league-partner': 'League partner',
  sponsor: 'Sponsor',
  unconfirmed: 'Relationship unconfirmed',
};

export const KORE_RELATIONSHIPS = ['client', 'league-partner', 'sponsor'];
export const visibleLogos = (relationships) => PARTNER_LOGOS.filter((l) => relationships.includes(l.relationship) && (l.approved || SHOW_DRAFTS));

// ---- Leagues, Events & Teams (/events portfolio grid) ----
// Competitions and teams worked across, one card per competition, in this reading order.
// Logos live in public/events/logos/ — sourced from each competition's own
// site or brand book, trimmed, never redrawn. `size` is the [max width,
// max height] in px the mark may take in its 88px stage — tuned by eye so
// wide wordmarks, detailed lockups and tall crests read at a similar weight.
// A card without `logo` renders as a text-only tile.
export const EVENTS_PORTFOLIO = [
  { id: 'ipl', name: 'Indian Premier League', logo: '/events/logos/ipl.png', w: 600, h: 411, size: [132, 62] },
  { id: 'llc', name: 'Legends League Cricket', logo: '/events/logos/llc.png', w: 106, h: 80, size: [110, 66] },
  { id: 'ispl', name: 'Indian Street Premier League', logo: '/events/logos/ispl.png', w: 98, h: 130, size: [96, 78] },
  { id: 't20-mumbai', name: 'T20 Mumbai', logo: '/events/logos/t20-mumbai.png', w: 600, h: 473, size: [124, 80] },
  { id: 'rajasthan-royals', name: 'Rajasthan Royals', logo: '/events/logos/rajasthan-royals.png', w: 151, h: 238, size: [96, 80] },
  { id: 'kiyg', name: 'Khelo India Youth Games', logo: null, edition: 'Madhya Pradesh 2022' },
  { id: 'wt20c', name: "Women's T20 Challenge", logo: '/events/logos/wt20c-2022.webp', w: 346, h: 217, size: [150, 76] },
  { id: 'ecl', name: 'Entertainers Cricket League', logo: '/events/logos/ecl.png', w: 199, h: 120, size: [130, 60] },
  { id: 'acb', name: 'Actors Cricket Bash', logo: '/events/logos/actors-cricket-bash.png', w: 600, h: 358, size: [132, 64] },
];

// ---- Event Services (/events) ----
// The scope a client can engage KORE 360 for. Earlier, finer-grained
// services are folded into the nearest group (décor → branding,
// entertainment → production, athlete & artist bookings → teams, logistics
// → hospitality); their old anchors stay as `aliases` so existing links
// (/events#service-decor etc.) still land on the right row.
export const EVENT_SERVICES = [
  { id: 'planning', name: 'League planning & budgeting', desc: 'Tournament format, timelines, budgets and the operating plan.', aliases: [] },
  { id: 'operations', name: 'Venue & matchday operations', desc: 'Venue readiness, match schedules, officials and on-ground coordination.', aliases: [] },
  { id: 'teams', name: 'Auctions & team management', desc: 'Auction planning, team coordination and player logistics, plus athlete and artist bookings for appearances.', aliases: ['athlete-artist'] },
  { id: 'production', name: 'Production & broadcast', desc: 'Staging, audio-visual setup, live production and broadcast coordination, with entertainment programming and show flow for ceremonies.', aliases: ['production-broadcast', 'entertainment'] },
  { id: 'branding', name: 'Branding & sponsor delivery', desc: 'Venue branding, sponsor placements and on-ground activations, plus décor and venue styling from stage and entrance builds to seating and lighting.', aliases: ['decor', 'design-branding'] },
  { id: 'hospitality', name: 'Hospitality, workforce & logistics', desc: 'Accommodation, transport, accreditation, staffing and vendor coordination, through to guest servicing and equipment load-in and load-out.', aliases: ['logistics'] },
];

// ---- Founder ----
// Portrait is the one approved for the About page; `focal` is the CSS
// object-position for its 4:5 crop.
export const FOUNDER = {
  name: 'Krish Lalwani',
  role: 'Founder, KORE 360 · Sports Presenter',
  portrait: '/about/founder.webp',
  portraitW: 1000,
  portraitH: 1333,
  portraitAlt: 'Portrait of Krish Lalwani, founder of KORE 360',
  focal: 'center 20%',
  short: 'Krish Lalwani founded KORE 360 after working in league logistics, event operations and sports presenting. He works directly with organisers on budgets, venues, vendors, staffing and match-day delivery.',
};

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
  { id: 'decor', name: 'Décor & Venue Styling', desc: 'Venue concepts, stage and entrance builds, seating layouts, florals, lighting and on-site styling.', category: 'decor', anchor: '/events#service-decor', service: 'Décor & Venue Styling' },
  { id: 'sports', name: 'Sports & League Management', desc: 'League planning, team operations, auctions and match-day delivery for leagues and tournaments.', category: 'sports', anchor: '/events#league-management', service: 'Sports & League Management' },
  { id: 'corporate', name: 'Corporate Events', desc: 'Conferences, annual meets, awards nights, offsites and corporate sports days.', category: 'corporate', anchor: '/events#services', service: 'Corporate Events' },
  { id: 'activations', name: 'Brand Activations', desc: 'Launches, fan zones, sampling and experiential set-ups built around a brand brief.', category: 'activations', anchor: '/events#services', service: 'Brand Activations & Experiences' },
  { id: 'production', name: 'Production & Broadcast', desc: 'Staging, AV and LED, livestream production and event content capture.', category: 'production', anchor: '/events#service-production-broadcast', service: 'Event Production' },
  { id: 'hospitality', name: 'Hospitality & Logistics', desc: 'Travel, accommodation, transport, accreditation and guest servicing for teams, talent and VIPs.', category: null, anchor: '/events#service-hospitality', service: 'Hospitality & Logistics' },
  { id: 'sponsorship', name: 'Sponsorships & Partnerships', desc: 'Sponsorship inventory, partner sourcing and on-ground brand integration.', category: null, anchor: null, service: 'Sponsorships & Partnerships' },
  { id: 'entertainment', name: 'Entertainment & Talent', desc: 'Performers, hosts, athletes and artists, booked and managed through the show.', category: null, anchor: '/events#service-athlete-artist', service: 'Entertainment & Talent Coordination' },
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
//                   KORE 360 (matches INDUSTRY_EXPERIENCE in data.js)
//   'unconfirmed' — was on the site before; relationship not confirmed,
//                   so it stays off the live site until it is
const LOGO_RELATIONSHIPS = {
  'BCCI': 'unconfirmed',
  'Tata IPL': 'founder',
  'T20 Mumbai': 'unconfirmed',
  'Khelo India': 'founder',
  'Rise Worldwide': 'unconfirmed',
  'Legends League Cricket': 'founder',
  'ISPL': 'founder',
  'Entertainers Cricket League': 'founder',
  'Chennai Singams': 'unconfirmed',
  'Actors Cricket Bash': 'unconfirmed',
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

// ---- Event Services (/events accordion) ----
// `category` links a row to its portfolio filter when that has published
// work; `service` pre-fills the enquiry form otherwise.
export const EVENT_SERVICES = [
  { id: 'decor', name: 'Décor & Venue Styling', desc: 'Venue concept and layout, stage and entrance builds, backdrops, seating and table styling, florals, lighting and on-site installation and teardown.', category: 'decor', service: 'Décor & Venue Styling' },
  { id: 'design-branding', name: 'Design & Branding', desc: 'Event identity, venue branding, signage, sponsor placements and on-ground creative.', category: 'activations', service: 'Brand Activations & Experiences' },
  { id: 'production-broadcast', name: 'Production & Broadcast', desc: 'Stage and AV coordination, LED screens, livestream production and event content capture.', category: 'production', service: 'Event Production' },
  { id: 'operations', name: 'Event & League Operations', desc: 'Venue planning, vendor and manpower coordination, accreditation, auctions and match-day delivery.', category: 'sports', service: 'Sports & League Management' },
  { id: 'entertainment', name: 'Entertainment', desc: 'Programming, performance coordination and show flow for ceremonies and live events.', category: null, service: 'Entertainment & Talent Coordination' },
  { id: 'hospitality', name: 'Hospitality', desc: 'Accommodation, guest servicing and on-site hospitality for teams, talent and VIPs.', category: null, service: 'Hospitality & Logistics' },
  { id: 'athlete-artist', name: 'Athlete & Artist Management', desc: 'Talent sourcing, bookings, schedules and on-ground coordination for appearances and performances.', category: null, service: 'Entertainment & Talent Coordination' },
  { id: 'logistics', name: 'Logistics', desc: 'Travel, ground transport, equipment movement and venue load-in and load-out.', category: null, service: 'Hospitality & Logistics' },
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

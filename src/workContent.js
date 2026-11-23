// ============================================================
//  KORE 360 — portfolio (/work) content
//  One entry per project. A project goes live only when `publish: true`
//  AND it has a cover. Everything else is a draft: visible in
//  `npm run dev` (marked DRAFT), never in a production build.
// ============================================================

import { SHOW_DRAFTS } from './lib/drafts.js';

// Portfolio filters, in display order. `service` is the enquiry-form
// service it maps to (must be in EVENT_ENQUIRY_OPTIONS.services).
export const WORK_CATEGORIES = [
  { id: 'decor', label: 'Décor & Venue Styling', service: 'Décor & Venue Styling' },
  { id: 'sports', label: 'Sports & Leagues', service: 'Sports & League Management' },
  { id: 'corporate', label: 'Corporate Events', service: 'Corporate Events' },
  { id: 'activations', label: 'Brand Activations', service: 'Brand Activations & Experiences' },
  { id: 'production', label: 'Production', service: 'Event Production' },
  // Krish's own roles at other organisations — shown apart from KORE 360's
  // projects and never mixed into the service filters above.
  { id: 'experience', label: "Krish's Experience", service: 'Sports & League Management' },
];

// ---- Krish Lalwani's professional experience (from his CV) ----
// Most recent first. `slug` links a role to its experience page (only
// properties with approved photos have one).
export const FOUNDER_ROLES = [
  { org: 'C11CL', role: 'Strategic Director', dates: 'Oct 2026', location: '', slug: 'c11cl' },
  { org: 'Rise Worldwide Limited · T20 Mumbai', role: 'Assistant Production Coordinator', dates: 'Jun 2026 – Jul 2026', location: 'Mumbai, Maharashtra' },
  { org: 'Legends League Cricket', role: 'Central Logistics Head', dates: 'Feb 2026 – Mar 2026', location: 'Delhi', slug: 'legends-league-cricket' },
  { org: 'Indian Street Premier League', role: 'Central Cricket & Venue Operations Manager', dates: 'Nov 2025 – Feb 2026', location: 'Surat, Gujarat' },
  { org: 'Entertainers Cricket League', role: 'Cricket Operations Manager', dates: 'Feb 2025 – Mar 2025', location: 'Delhi', slug: 'entertainers-cricket-league' },
  { org: 'Chennai Singams', role: 'Senior Operations Manager', dates: 'Dec 2024 – Mar 2025', location: 'Mumbai, Maharashtra' },
  { org: 'Actors Cricket Bash', role: 'Cricket Operations Manager', dates: 'Nov 2024 – Dec 2024', location: 'Mumbai, Maharashtra' },
  { org: 'Entertainers Cricket League', role: 'Cricket Operations Manager', dates: 'Aug 2024 – Sep 2024', location: 'Delhi', slug: 'entertainers-cricket-league' },
  { org: 'Indian Street Premier League', role: 'Venue & Cricket Operations Manager', dates: 'Feb 2024 – Apr 2024', location: 'Thane, Maharashtra' },
  { org: 'Legends League Cricket', role: 'Logistics & Catering Manager', dates: 'Sep 2023 – Dec 2023', location: 'Delhi', slug: 'legends-league-cricket' },
  { org: 'Rajasthan Royals | SSPARK', role: 'Entertainment Manager', dates: 'Mar 2023 – Jun 2023', location: 'Guwahati, Assam · Jaipur, Rajasthan' },
  { org: 'Legends League Cricket', role: 'Assistant Venue & Cricket Operations Manager', dates: 'Feb 2023 – Mar 2023', location: 'Doha, Qatar', slug: 'legends-league-cricket' },
  { org: 'Khelo India Youth Games', role: 'Assistant Venue Manager · Deepali Designs & Exhibits Pvt. Ltd.', dates: 'Jan 2023 – Feb 2023', location: 'Ujjain, Madhya Pradesh' },
  { org: 'Legends League Cricket', role: 'Hospitality Manager', dates: 'Sep 2022 – Oct 2022', location: 'Lucknow, Uttar Pradesh', slug: 'legends-league-cricket' },
  { org: "Women's T20 Challenge | BCCI", role: 'Venue Team Assistant · Cricket Operations', dates: 'May 2022 – Jun 2022', location: 'Pune District, Maharashtra' },
  { org: 'IPL | BCCI', role: 'Venue Team Assistant · Cricket Operations', dates: 'Mar 2022 – Jun 2022', location: 'Pune District, Maharashtra' },
];

export const FOUNDER_EDUCATION = "Bachelor's in Sports Management (BSM), International Institute of Sports & Management, Mumbai";

const rolesFor = (slug) => FOUNDER_ROLES.filter((r) => r.slug === slug).map(({ role, dates, location }) => ({ role, dates, location }));

// Décor galleries run like a client walkthrough. Gallery images with a
// `stage` are sorted into this order on the project page.
export const DECOR_STAGES = ['reveal', 'focal', 'entrance', 'seating', 'detail', 'in-use', 'build'];
export const STAGE_LABELS = {
  reveal: 'Full-room reveal',
  focal: 'Stage / focal point',
  entrance: 'Entrance & signage',
  seating: 'Seating & tables',
  detail: 'Lighting & detail',
  'in-use': 'The room in use',
  build: 'Behind the build',
};

// Fields (see the handoff notes for image sizes):
//   slug, title, categories (WORK_CATEGORIES ids), location, date
//   ('2026-03' or '2026-03-14'), status ('completed' | 'in-progress'),
//   role (one sentence on what KORE 360 delivered), client (display name,
//   only with permission), scope (short line for cards), scale (verified
//   figures only), cover { src, w, h, alt, focal }, gallery [{ src, w, h,
//   alt, caption, stage, srcSmall }], video { src, poster, captions },
//   credits [{ role, name }], publish.
// Images live in public/work/<slug>/ so URLs stay stable.
//
// The three drafts below exist only to preview the layouts in dev. They
// carry no client names or claims; images marked `placeholder: true` are
// existing site photos standing in for real project shots.
export const PROJECTS = [
  {
    slug: 'draft-decor-walkthrough',
    title: 'Décor project (draft)',
    categories: ['decor', 'corporate'],
    location: '', date: '', status: 'completed',
    role: 'One sentence on what KORE 360 designed, sourced and installed goes here.',
    client: '', scope: 'Venue styling · stage · entrance · seating', scale: '',
    cover: null,
    gallery: DECOR_STAGES.map((stage) => ({ src: '', w: 1600, h: 1067, alt: '', caption: STAGE_LABELS[stage], stage })),
    video: null, credits: [], publish: false,
  },
  {
    slug: 'draft-sports-matchday',
    title: 'Sports league project (draft)',
    categories: ['sports', 'production'],
    location: '', date: '', status: 'completed',
    role: 'One sentence on KORE 360’s match-day scope goes here.',
    client: '', scope: 'League operations · match-day delivery', scale: '',
    cover: { src: '/about/bts-crew.webp', w: 800, h: 350, alt: 'Accredited operations crew standing together on the pitch inside an indoor cricket arena', focal: 'center 40%', placeholder: true },
    gallery: [
      { src: '/about/hero-desktop.webp', w: 1600, h: 1065, alt: 'Match-day crew measuring and marking the pitch before a live cricket league game', caption: 'Pitch preparation before the first ball', placeholder: true },
      { src: '/about/league-ops.webp', w: 1074, h: 945, alt: 'Event staff alongside players on the field at a professional cricket league match', caption: 'Pitch-side operations', placeholder: true },
      { src: '/about/bts-production.webp', w: 710, h: 533, alt: 'Event crew coordinating on the field while a camera operator films during live match production', caption: 'Live production on the field', placeholder: true },
      { src: '/about/teamwork.webp', w: 1200, h: 799, alt: 'The event crew gathered together on the outfield of a stadium after a cricket league match', caption: 'The crew after the final match', placeholder: true },
    ],
    video: null, credits: [], publish: false,
  },
  {
    slug: 'draft-brand-activation',
    title: 'Brand activation (draft)',
    categories: ['activations'],
    location: '', date: '', status: 'in-progress',
    role: '', client: '', scope: 'Activation design · on-ground delivery', scale: '',
    cover: null, gallery: [], video: null, credits: [], publish: false,
  },

  // ---- Krish's experience (kind: 'founder') ----
  // His own roles at these properties, not KORE 360 projects. Captions only
  // describe what each photo shows; identification is from visible
  // branding (ECL kit and boards, LLC / Lotus365 kits, C11CL backdrop).
  {
    slug: 'legends-league-cricket', kind: 'founder',
    title: 'Legends League Cricket',
    categories: ['experience'],
    location: 'Doha · Delhi · Lucknow', date: '', status: 'completed',
    role: 'Four Legends League Cricket editions, from hospitality in Lucknow and venue operations in Doha to running central logistics.',
    client: '', scope: 'Central logistics · venue & cricket operations · hospitality', scale: '',
    roles: rolesFor('legends-league-cricket'),
    cover: { src: '/about/intl-doha-dusk.webp', srcSmall: '/about/intl-doha-dusk-800.webp', w: 1600, h: 1200, alt: 'A Legends League Cricket Masters match under floodlights at dusk in Doha', focal: 'center 60%' },
    gallery: [
      { src: '/about/intl-doha-dusk.webp', srcSmall: '/about/intl-doha-dusk-800.webp', w: 1600, h: 1200, alt: 'A Legends League Cricket Masters match under floodlights at dusk in Doha, with Qatar Airways boards around the ground', caption: 'LLC Masters under lights, Doha' },
      { src: '/about/intl-llc-pitchside.webp', srcSmall: '/about/intl-llc-pitchside-800.webp', w: 1200, h: 1600, focal: 'center 30%', alt: 'Krish Lalwani pitchside in a Legends League Cricket jacket and accreditation, with an India Maharajas player after a match in Doha', caption: 'Pitchside on tournament accreditation, Doha' },
      { src: '/about/league-ops.webp', w: 1074, h: 945, alt: 'Event staff on the field with India Maharajas and opposition players at a Legends League Cricket match', caption: 'On the field with the teams' },
      { src: '/about/team-logistics.webp', w: 1100, h: 733, alt: 'Players arriving with their luggage from the team bus at a Legends League Cricket venue in Qatar', caption: 'Team arrivals, Qatar' },
      { src: '/about/intl-raina-doha.webp', srcSmall: '/about/intl-raina-doha-800.webp', w: 1200, h: 1600, focal: 'center 35%', alt: 'Krish Lalwani with former India cricketer Suresh Raina in Doha', caption: 'With Suresh Raina in Doha' },
    ],
    video: null, credits: [], publish: true,
  },
  {
    slug: 'entertainers-cricket-league', kind: 'founder',
    title: 'Entertainers Cricket League',
    categories: ['experience'],
    location: 'Delhi', date: '', status: 'completed',
    role: 'Cricket operations for two Entertainers Cricket League seasons in Delhi, from pitch preparation to match-day coordination with officials and broadcast.',
    client: '', scope: 'Cricket operations · match-day delivery', scale: '',
    roles: rolesFor('entertainers-cricket-league'),
    cover: { src: '/about/teamwork.webp', w: 1200, h: 799, alt: 'The Entertainers Cricket League operations crew celebrating together on the outfield of an indoor arena', focal: 'center 45%' },
    gallery: [
      { src: '/about/teamwork.webp', w: 1200, h: 799, alt: 'The Entertainers Cricket League operations crew celebrating together on the outfield of an indoor arena', caption: 'The ECL operations crew' },
      { src: '/about/hero-desktop.webp', w: 1600, h: 1065, alt: 'The operations lead measuring and marking the pitch with ground staff before an Entertainers Cricket League match', caption: 'Measuring and marking the pitch before play' },
      { src: '/events/hero-desktop.webp', w: 1600, h: 1065, alt: 'The operations lead in conversation pitch-side in front of the Mumbai Disruptors backdrop at the Entertainers Cricket League', caption: 'Pitch-side coordination' },
      { src: '/about/bts-production.webp', w: 710, h: 533, alt: 'The operations lead on a call on the field while an official checks the pitch and a camera operator films', caption: 'Live coordination with broadcast on the field' },
      { src: '/about/bts-crew.webp', w: 800, h: 350, alt: 'Match officials and operations team standing together on the pitch at the Entertainers Cricket League', caption: 'With the match officials' },
      { src: '/about/bts-planning.webp', w: 560, h: 799, alt: 'The operations lead talking through plans on the field in front of the sponsor wall', caption: 'Talking through the plan on match day' },
    ],
    video: null, credits: [], publish: true,
  },
  {
    slug: 'c11cl', kind: 'founder',
    title: 'C11CL',
    categories: ['experience'],
    location: '', date: '2026-10', status: 'completed',
    role: 'Krish served as Strategic Director of the Champions 11 Cricket League (C11CL).',
    client: '', scope: '', scale: '',
    roles: rolesFor('c11cl'),
    cover: { src: '/work/c11cl/award.webp', w: 900, h: 1600, alt: 'Krish Lalwani receiving a presentation from a C11CL official in front of the Champions 11 Cricket League backdrop', focal: 'center 52%' },
    gallery: [
      { src: '/work/c11cl/award.webp', w: 900, h: 1600, focal: 'center 55%', alt: 'Krish Lalwani receiving a presentation from a C11CL official in front of the Champions 11 Cricket League backdrop', caption: 'At C11CL, in front of the league backdrop' },
    ],
    video: null, credits: [], publish: true,
  },
];

const isLive = (p) => p.publish && p.cover?.src;
export const isDraft = (p) => !isLive(p);

// Projects the current build may show: live ones always, drafts in dev.
export const VISIBLE_PROJECTS = PROJECTS.filter((p) => isLive(p) || SHOW_DRAFTS);

export const projectsIn = (categoryId) => VISIBLE_PROJECTS.filter((p) => !categoryId || p.categories.includes(categoryId));
export const isFounderWork = (p) => p.kind === 'founder';
// KORE 360's own projects only — what Selected Work and service links show.
export const KORE_PROJECTS = VISIBLE_PROJECTS.filter((p) => !isFounderWork(p));
export const FOUNDER_WORK = VISIBLE_PROJECTS.filter(isFounderWork);
export const findProject = (slug) => VISIBLE_PROJECTS.find((p) => p.slug === slug);
export const categoryById = (id) => WORK_CATEGORIES.find((c) => c.id === id);
// Filters with at least one visible project.
export const ACTIVE_CATEGORIES = WORK_CATEGORIES.filter((c) => projectsIn(c.id).length > 0);

export function formatProjectDate(date) {
  if (!date) return '';
  const [y, m] = date.split('-');
  if (!m) return y;
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

// Gallery in presentation order: walkthrough stages first (décor), then
// anything without a stage in the order it was listed.
export function orderedGallery(project) {
  const rank = (g) => (g.stage ? DECOR_STAGES.indexOf(g.stage) : DECOR_STAGES.length);
  return project.gallery.map((g, i) => ({ g, i })).sort((a, b) => rank(a.g) - rank(b.g) || a.i - b.i).map(({ g }) => g);
}

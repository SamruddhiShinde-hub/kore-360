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
];

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
];

const isLive = (p) => p.publish && p.cover?.src;
export const isDraft = (p) => !isLive(p);

// Projects the current build may show: live ones always, drafts in dev.
export const VISIBLE_PROJECTS = PROJECTS.filter((p) => isLive(p) || SHOW_DRAFTS);

export const projectsIn = (categoryId) => VISIBLE_PROJECTS.filter((p) => !categoryId || p.categories.includes(categoryId));
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

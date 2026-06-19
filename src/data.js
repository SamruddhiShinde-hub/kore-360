// ============================================================
//  KORE 360 — site content
//  Edit everything about your site's text, prices and links here.
// ============================================================

// Accent colour used across the whole site. Try '#2f80ed' or '#f5b13d'.
export const ACCENT = '#35d07d';

// Which hero layout to show: 'split' | 'centered' | 'editorial'
export const HERO_VARIANT = 'centered';

// ---- Key links (used in several places) ----
export const LINKS = {
  bookCall: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0',
  ebook: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697',
  instagram: 'https://www.instagram.com/krishlalwaniofficial/',
  resume: '#',
  event: '#',
};

// ---- Hero copy ----
export const HERO = {
  eyebrow: 'KORE 360 · SPORTS MANAGEMENT',
  headlineLines: ['Get inside', 'the game.'],
  blurb:
    "Five years in the industry. 60+ calls. 100+ people placed. I'm Krish Lalwani — and this is how you actually build a career in sport.",
  primaryCta: 'Book a 1:1 clarity call · ₹1,499',
  secondaryCta: 'Get the e-book · ₹99',
  stats: [
    { value: '5+', label: 'years' },
    { value: '60+', label: 'calls' },
    { value: '100+', label: 'placed' },
  ],
};

// ---- Marquee strip words ----
export const MARQUEE = [
  'Sports marketing', 'Team operations', 'Athlete management', 'Event ops',
  'Sponsorship', 'Sports media', 'Agency life',
];

// ---- Sessions ("Work with Krish") ----
export const SESSIONS = [
  { tag: 'E-BOOK', name: 'Behind the Field', price: '₹99', meta: 'PDF · instant download', desc: 'My complete playbook for breaking into sports management — the roles, the routes, the real talk.', cta: 'Buy the e-book', href: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697' },
  { tag: 'WEBINAR', name: 'Live Webinar', price: '₹499', meta: '60 min · live · listen-only', desc: 'A one-hour live session on how the industry actually hires. Watch and learn — no live Q&A.', cta: 'Book your seat', href: '#' },
  { tag: 'Q&A', name: '1:1 Q&A Call', price: '₹499', meta: '15 min · audio call', desc: 'Fifteen minutes, audio only, just you and me. Bring your questions, leave with answers.', cta: 'Book a Q&A', href: '#' },
  { tag: '1:1 CALL', name: 'Clarity Call', price: '₹1,499', meta: '30 min · video call', desc: 'A thirty-minute video call to map your personal route into the industry.', cta: 'Book a 1:1 clarity call', href: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0', featured: true },
];

// ---- Courses ----
export const COURSES = [
  { level: 'Beginner', name: 'The Sports Management Starter', price: '₹2,999', desc: 'From zero to job-ready: the foundations of the sports business and where you fit.', href: '#', img: 'https://loremflickr.com/800/450/cricket,coaching?lock=41' },
  { level: 'Intermediate', name: 'Marketing & Sponsorship in Sport', price: '₹4,999', desc: 'How brands, rights and money actually move through the game.', href: '#', img: 'https://loremflickr.com/800/450/cricket,stadium,crowd?lock=42' },
  { level: 'All levels', name: 'Land the Role: Sports Networking', price: '₹1,999', desc: 'Build the network and the pitch that gets you hired.', href: '#', img: 'https://loremflickr.com/800/450/cricket,team?lock=51' },
];

// ---- Careers ----
export const CAREERS = [
  { tag: 'GET YOUR FOOT IN', role: 'Internships', desc: 'Hands-on internship roles across teams, agencies, leagues and events. Pick your track and apply through the form.', cta: 'Apply for an internship', href: '#' },
  { tag: 'FULL-TIME ROLES', role: 'Jobs', desc: "Vetted full-time openings with partners across the sports industry. Tell us what you're after.", cta: 'Browse job openings', href: '#' },
];

// ---- Events ----
export const EVENT_TYPES = ['Keynotes & talks', 'Panels & moderation', 'Campus & community workshops', 'Brand appearances'];

// ---- Images (replace these placeholder URLs with your own photos) ----
export const IMAGES = {
  heroSplit: 'https://picsum.photos/seed/kore-krish-split/900/1100',
  heroCentered: 'https://loremflickr.com/1920/1200/cricket,stadium,match?lock=5',
  heroEditorial: 'https://picsum.photos/seed/kore-krish-edit/900/1200',
  events: 'https://loremflickr.com/1000/1000/cricket,match,outdoor?lock=61',
  about: 'https://loremflickr.com/900/1100/cricket,stadium,spectators?lock=53',
};

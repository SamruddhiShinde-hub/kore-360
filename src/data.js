// ============================================================
//  KORE 360 — site content
//  Edit everything about your site's text, prices and links here.
// ============================================================

import sportsMarketingImg from './assets/sports-marketing.jpg';
import teamOperationsImg from './assets/team-ops.jpg.jpeg';
import athleteManagementImg from './assets/athlete-management.jpg';
import eventOpsImg from './assets/event-ops.jpg.jpeg';
import starterCourseImg from './assets/the_sports_management_starter.jpg';
import marketingCourseImg from './assets/marketing_and_sponsorship.jpg';
import networkingCourseImg from './assets/land_the_job_role.jpg';
import testimonial1Video from './assets/testimonial-1.mp4';
import testimonial1Poster from './assets/testimonial-1-poster.jpg';
import testimonial2Video from './assets/testimonial-2.mp4';
import testimonial2Poster from './assets/testimonial-2-poster.jpg';
import testimonial3Video from './assets/testimonial-3.mp4';
import testimonial3Poster from './assets/testimonial-3-poster.jpg';
import testimonial4Video from './assets/testimonial-4.mp4';
import testimonial4Poster from './assets/testimonial-4-poster.jpg';
import testimonial5Video from './assets/testimonial-5.mp4';
import testimonial5Poster from './assets/testimonial-5-poster.jpg';
import bcciLogo from './assets/brand8-tiny.webp';
import tataIplLogo from './assets/brand10.jpg';
import t20MumbaiLogo from './assets/brand9-tiny.webp';
import kheloIndiaLogo from './assets/brand11-tiny.webp';
import riseWorldwideLogo from './assets/brand1.jpg';
import legendsLeagueLogo from './assets/brand2.jpg';
import isplLogo from './assets/brand3.jpg';
import eclLogo from './assets/brand4.jpg';
import chennaiSingamsLogo from './assets/brand5.webp';
import actorsCricketBashLogo from './assets/brand6.jpg';

// Accent colour used across the whole site. Brand shades: '#DB117C' (pink), '#9F3D97' (purple), '#B71E60' (magenta).
export const ACCENT = '#F05123';

// ---- Clarity Call pricing ----
// ₹1,999 is the list price, shown struck through. Regular visitors see
// ₹1,499 by default, no coupon needed. Entering this coupon code in the
// booking flow drops it further, to ₹999. Must match CLARITY_COUPON_CODE
// and the amounts in api/_lib/config.js, which is what Razorpay actually
// charges; the values here are display-only.
export const CLARITY_COUPON_CODE = 'KRISH500';
const CLARITY_DEFAULT_PRICE = '₹1,499';
const CLARITY_COUPON_PRICE = '₹999';
const CLARITY_ORIGINAL_PRICE = '₹1,999';

function isClarityCoupon(code) {
  return typeof code === 'string' && code.trim().toUpperCase() === CLARITY_COUPON_CODE;
}

// Effective price for a Clarity Call. `promoActive` is always true (₹1,499
// is on for everyone) — `couponValid` separately reports whether the code
// just typed into the coupon field is an exact match, which unlocks the
// deeper ₹999 rate. Pass whatever's currently in that field so far.
export function getClarityPricing(couponCode) {
  const couponValid = isClarityCoupon(couponCode);
  return {
    price: couponValid ? CLARITY_COUPON_PRICE : CLARITY_DEFAULT_PRICE,
    originalPrice: CLARITY_ORIGINAL_PRICE,
    promoActive: true,
    couponValid,
  };
}

// Discount badge percentage for a promo price, derived from price/originalPrice
// display strings (e.g. '₹299' / '₹499') so the badge never drifts out of sync
// with the actual numbers shown next to it.
export function discountPercent(price, originalPrice) {
  const cur = Number(String(price).replace(/[^\d.]/g, ''));
  const orig = Number(String(originalPrice).replace(/[^\d.]/g, ''));
  if (!orig) return 0;
  return Math.round((1 - cur / orig) * 100);
}

// Which hero layout to show: 'split' | 'centered' | 'editorial'
export const HERO_VARIANT = 'centered';

// ---- Key links (used in several places) ----
export const LINKS = {
  bookCall: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0',
  ebook: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697',
  instagram: 'https://www.instagram.com/kore360.in/',
  krishInstagram: 'https://www.instagram.com/krishlalwaniofficial/',
  event: '#',
  phone: '+91 95452 29974',
  phoneTel: 'tel:+919545229974',
  whatsapp: 'https://wa.me/919545229974',
  decathlonForm: 'https://forms.gle/U4p4S2Fpon1RGcPb6',
  email: 'work.krishlalwani@gmail.com',
};

// Web3Forms access key (free, no backend needed) — get yours at https://web3forms.com
// by submitting that site's own form with work.krishlalwani@gmail.com; they email you a
// key instantly. Paste it below to make the "connect with us" popup actually deliver mail.
export const WEB3FORMS_ACCESS_KEY = 'd8d78189-8a59-4e5d-82e8-4ec732db3f5d';

// ---- Hero copy ----
export const HERO = {
  eyebrow: 'KORE 360 · SPORTS MANAGEMENT',
  headlineLines: ['Get inside', 'the game'],
  blurb:
    "Five years in the industry. 60+ calls. 100+ people placed.\nI'm Krish Lalwani, and this is how you actually build a career in sports.",
  primaryCta: 'See All Courses',
  stats: [
    { value: '5+', label: 'years' },
    { value: '60+', label: 'calls' },
    { value: '100+', label: 'placed' },
  ],
};

// ---- Explore by interest (tabs: image + blurb per interest) ----
export const MARQUEE = [
  { label: 'Sports marketing', desc: "Build the campaigns, partnerships and fan engagement strategies that get a team or league noticed. From digital content calendars to in-stadium activations, this is where brands, sports, and audience meet, and where teams are investing more every season as fan attention gets harder to win.", img: sportsMarketingImg },
  { label: 'Team operations', desc: "Keep a franchise running: logistics, scheduling, compliance and the day-to-day that gets a team onto the field. Travel, kit, accreditation, venue coordination and dozens of small decisions made well before anyone notices them; this is the backbone role every team relies on.", img: teamOperationsImg },
  { label: 'Athlete management', desc: "Manage contracts, brand deals and the off-field career of the athletes you represent. You're the buffer between the athlete and everything else: negotiations, sponsors, media requests, so they can focus on performing while you build their long-term value.", img: athleteManagementImg },
  { label: 'Event ops', desc: "Plan and run the live experience: venues, vendors, broadcast and everything that has to work on match day. Ticketing, security, hospitality and contingency plans all come together under one roof, and when it's done right, nobody in the stands even notices the work behind it.", img: eventOpsImg },
];

// ---- Sessions ("Work with Krish") ----
// `details` powers the expanded breakdown on the Education page; the homepage cards only use the fields above it.
export const SESSIONS = [
  {
    tag: 'E-BOOK', name: 'Behind the Field', price: '₹99', originalPrice: '₹199', promoActive: true, meta: 'PDF · Instant download', desc: 'My complete playbook for breaking into sports management: the roles, the routes, the real talk.', cta: 'Buy the e-book', sessionId: 'ebook',
    details: {
      format: 'Instant PDF download',
      whoFor: "Anyone starting from zero who wants the full map before spending on a call",
      includes: ['Every entry route into sports management, mapped out', 'Real job titles and what they actually pay', 'A breakdown of which skills matter for which roles', "Krish's personal do's and don'ts from five years in the industry"],
      outcome: "Walk away knowing exactly which corner of the industry fits you before you spend a rupee on anything else.",
    },
  },
  {
    tag: 'WEBINAR', name: 'Live Webinar', price: '₹499', originalPrice: '₹799', meta: '60 min · Live · Sat, 8 Aug, 5:00 PM IST', desc: 'A one-hour live session on how the industry actually hires.', cta: 'Book your seat', sessionId: 'webinar',
    // Must match SESSIONS.webinar.fixedStart in api/_lib/config.js — kept as
    // plain values here since the API config isn't safe to import client-side.
    // fixedStart also lets the booking modal skip its own day/time picker
    // (there's only ever one slot) instead of showing a confusing "no slots
    // on this day" flash while it works that out itself.
    eventDate: 'Saturday, 8 August 2026', eventTime: '5:00 – 6:00 PM IST', fixedStart: '2026-08-08T17:00:00+05:30',
    // Takes the webinar off sale on the frontend — must be kept in sync with
    // SESSIONS.webinar.soldOut in api/_lib/config.js, which is what actually
    // blocks the booking API. Flip both back to reopen booking.
    soldOut: true,
    details: {
      format: '60-minute live session, listen-only',
      whoFor: 'People who want the bigger picture of how hiring actually works in sport, beyond the entry-level playbook',
      includes: ['How teams, leagues and agencies actually hire', 'What recruiters screen for first', 'Common mistakes that get applications rejected', 'Live audience polls and real examples'],
      outcome: 'Leave the session with a clear, realistic picture of what hiring managers in sport are actually looking for.',
    },
  },
  {
    tag: '1:1 CALL', name: 'Clarity Call', ...getClarityPricing(), meta: '30 min · Video call', desc: 'A thirty-minute video call to map your personal route into the industry.', cta: 'Book a 1:1', sessionId: 'clarity', featured: true,
    details: {
      format: '30-minute 1:1 video call',
      whoFor: "Anyone ready to map out their personal route into the industry, with someone who's done the hiring",
      includes: ['A personalised route into the industry based on your background', 'Honest feedback on your CV/profile if you share it beforehand', 'A short action plan for your next 90 days'],
      outcome: 'Leave with a concrete plan, not just inspiration, for the next quarter of your job search.',
    },
  },
];

// ---- Events page: CORE / LAUNCH / SCALE league engagement models ----
// Engagement models, not priced packages — no price, tier or "most popular"
// field belongs on these. `preview` is how many `deliverables` show before
// "Explore scope"; the rest, the framework and the outcome sit behind it.
export const LEAGUE_ENGAGEMENTS = [
  {
    id: 'core',
    name: 'CORE',
    descriptor: 'Plan & Prepare',
    role: 'Strategic Partner',
    headline: 'Get your league ready to execute.',
    desc: 'We work with your team to understand the league, identify what it needs and build a clear roadmap forward.',
    framework: [
      { letter: 'C', word: 'Clarity', question: 'What are we working with?', detail: 'Review the league, objectives, existing structure and priorities.' },
      { letter: 'O', word: 'Opportunity', question: 'Where can we create more value?', detail: 'Explore audience, revenue, sponsorship and partnership opportunities.' },
      { letter: 'R', word: 'Roadmap', question: 'What will it take?', detail: 'Plan budgets, timelines, resources, vendors and manpower.' },
      { letter: 'E', word: 'Equip', question: 'What does your team need to take it forward?', detail: 'Prepare action plans, SOPs, checklists, templates and next steps.' },
    ],
    deliverablesLabel: 'What KORE 360 delivers',
    deliverables: [
      'League review and gap assessment',
      'Operating blueprint',
      'Budget framework',
      'Commercial roadmap',
      'Manpower and vendor requirements',
      'SOPs and execution toolkit',
      'Management workshop and handover',
    ],
    preview: 5,
    note: 'Your team stays responsible for on-ground execution unless separately agreed.',
    outcome: 'Your team knows what to do, who needs to do it and what it will take.',
    footer: 'Strategy & Consulting',
  },
  {
    id: 'launch',
    name: 'LAUNCH',
    descriptor: 'Implement & Deliver',
    role: 'Execution Partner',
    headline: 'From ready to running.',
    desc: 'Everything built in CORE now moves into implementation, with KORE 360 actively involved in coordination, deployment and execution.',
    framework: [
      { letter: 'L', word: 'Lay the groundwork', detail: 'Convert the blueprint into a working event plan.' },
      { letter: 'A', word: 'Align', detail: 'Coordinate teams, partners, vendors and timelines.' },
      { letter: 'U', word: 'Unify', detail: 'Bring the agreed moving parts under one management structure.' },
      { letter: 'N', word: 'Navigate', detail: 'Manage approvals, dependencies and changes.' },
      { letter: 'C', word: 'Command', detail: 'Take responsibility for agreed on-ground execution activities.' },
      { letter: 'H', word: 'Handover', detail: 'Report, review, learn and improve.' },
    ],
    deliverablesLabel: 'Everything in CORE, plus',
    deliverables: [
      'Implementation planning',
      'Vendor coordination',
      'Stakeholder management',
      'Defined KORE 360 project-team deployment',
      'Manpower coordination',
      'Agreed on-ground execution responsibilities',
      'Live operational coordination',
      'Post-event review and reporting',
    ],
    preview: 5,
    note: 'Deployment, event dates, deliverables, responsibilities and team size follow the agreed project scope.',
    outcome: 'KORE 360 moves from the plan into delivery.',
    footer: 'Strategy & Execution',
  },
  {
    id: 'scale',
    name: 'SCALE',
    descriptor: 'Operate & Grow',
    role: 'Operating Partner',
    headline: 'When KORE 360 becomes part of the business.',
    desc: 'SCALE begins when the engagement moves beyond a defined event execution mandate into deeper league operations, commercial development and long-term growth.',
    framework: [
      { letter: 'S', word: 'Strategy', detail: 'Season planning, business priorities and a growth roadmap.' },
      { letter: 'C', word: 'Commercial', detail: 'Revenue strategy, sponsorship and commercial partnerships.' },
      { letter: 'A', word: 'Activate', detail: 'Turn strategy and commercial plans into delivery.' },
      { letter: 'L', word: 'Lead', detail: 'Coordinate operations, teams, vendors, partners and locations.' },
      { letter: 'E', word: 'Evolve', detail: 'Review performance, optimise operations and plan future growth.' },
    ],
    deliverablesLabel: 'SCALE can expand across',
    deliverables: [
      'Multiple cities and venues',
      'Longer engagement periods',
      'Larger KORE 360 team deployment',
      'Season operations',
      'Sponsorship and revenue',
      'Commercial partnerships',
      'Fan and hospitality experiences',
      'Central management',
    ],
    preview: 5,
    note: 'A custom engagement, shaped by the business requirements of the league. The league and its IP remain yours.',
    outcome: "We're no longer just delivering a scope. We're working with you on the league.",
    footer: 'Operating & Commercial Partnership',
    tag: 'Custom Engagement',
  },
];

// No pricing row, by design — see LEAGUE_ENGAGEMENTS above.
export const LEAGUE_COMPARISON = [
  { area: 'Role', core: 'Strategic Partner', launch: 'Execution Partner', scale: 'Operating Partner' },
  { area: 'Strategy', core: 'Included', launch: 'Included', scale: 'Included' },
  { area: 'Operating Blueprint', core: 'Included', launch: 'Included', scale: 'Included' },
  { area: 'Implementation', core: 'Client Team', launch: 'KORE 360 + Client', scale: 'Integrated' },
  { area: 'Team Deployment', core: 'Strategy Team', launch: 'Project Team', scale: 'Central + Ground Teams' },
  { area: 'On-Ground Delivery', core: 'Not Included', launch: 'Defined Scope', scale: 'Wider / Season' },
  { area: 'Commercial Strategy', core: 'Included', launch: 'Defined Support', scale: 'Integrated' },
  { area: 'Sponsorship & Revenue', core: 'Roadmap', launch: 'Scope Based', scale: 'Deeper Involvement' },
  { area: 'Locations', core: 'Planned', launch: 'Defined', scale: 'Scalable' },
  { area: 'Duration', core: 'Planning Period', launch: 'Event Window', scale: 'Extended / Season' },
];

// League enquiry form options — must match the allow-lists in
// api/submit-league-enquiry.js, which rejects anything else.
export const LEAGUE_ENQUIRY_OPTIONS = {
  eventType: ['Sports league', 'Tournament / championship', 'One-off sporting event', 'Corporate or brand event', 'Fan / hospitality experience', 'Other'],
  stage: ['Planning a new league', 'Preparing to launch', 'Running an existing league', 'Looking to expand or scale'],
  timeline: ['Within 3 months', '3–6 months', '6–12 months', 'Not finalized'],
  support: ['Planning and strategy', 'Event execution and operations', 'End-to-end league management', 'Long-term commercial partnership', 'Not sure yet'],
};

// ---- Talent page: placement & internship partners ----
export const TALENT_PARTNERS = ['Decathlon', 'MuscleBlaze'];

// ---- Brands & leagues worked with (auto-scrolling logo strip) ----
// Order matters for the first four; the rest can be in any order.
export const BRANDS = [
  { name: 'BCCI', logo: bcciLogo },
  { name: 'Tata IPL', logo: tataIplLogo },
  { name: 'T20 Mumbai', logo: t20MumbaiLogo },
  { name: 'Khelo India', logo: kheloIndiaLogo },
  { name: 'Rise Worldwide', logo: riseWorldwideLogo },
  { name: 'Legends League Cricket', logo: legendsLeagueLogo },
  { name: 'ISPL', logo: isplLogo },
  { name: 'Entertainers Cricket League', logo: eclLogo },
  { name: 'Chennai Singams', logo: chennaiSingamsLogo },
  { name: 'Actors Cricket Bash', logo: actorsCricketBashLogo },
];

// ---- Courses ----
export const COURSES = [
  { level: 'Beginner', name: 'The Sports Management Starter', price: '₹2,999', desc: 'From zero to job-ready: the foundations of the sports business and where you fit.', href: '#', img: starterCourseImg },
  { level: 'Intermediate', name: 'Marketing & Sponsorship in Sport', price: '₹4,999', desc: 'How brands, rights and money actually move through the game.', href: '#', img: marketingCourseImg },
  { level: 'All levels', name: 'Land the Role: Sports Networking', price: '₹1,999', desc: 'Build the network and the pitch that gets you hired.', href: '#', img: networkingCourseImg },
];

// ---- Careers ----
export const CAREERS = [
  { tag: 'GET YOUR FOOT IN', role: 'Internships', desc: 'Hands-on internship roles across teams, agencies, leagues and events. Pick your track and apply through the form.', cta: 'Apply for an internship', href: 'https://forms.gle/KDkKkW1QRkoK2TWM6' },
  { tag: 'FULL-TIME ROLES', role: 'Jobs', desc: "Vetted full-time openings with partners across the sports industry. Tell us what you're after.", cta: 'Browse job openings', href: 'https://forms.gle/KDkKkW1QRkoK2TWM6' },
];

// ---- Events ----
export const EVENT_TYPES = ['Keynotes & talks', 'Panels & moderation', 'Campus & community workshops', 'Brand appearances'];

// ---- Testimonials (video) ----
// Real client-call recordings — shared by the homepage testimonials carousel
// and the Clarity Call page's video grid. Captions are generic marketing
// copy, deliberately not attributed to a specific name.
export const TESTIMONIALS = [
  { caption: 'Real clarity, real next steps.', poster: testimonial1Poster, video: testimonial1Video },
  { caption: 'Direct advice, not generic tips.', poster: testimonial2Poster, video: testimonial2Video },
  { caption: 'Clarity on roles I never knew existed.', poster: testimonial3Poster, video: testimonial3Video },
  { caption: 'A concrete plan, not just inspiration.', poster: testimonial4Poster, video: testimonial4Video },
  { caption: 'The confidence to start taking action.', poster: testimonial5Poster, video: testimonial5Video },
];

// Written reviews of the Clarity Call — shown on the homepage testimonials
// section and on the Clarity Call page's Reviews & Ratings block.
export const WRITTEN_TESTIMONIALS = [
  { quote: "I came in unsure where to even begin, and Krish gave me exactly the clarity I needed from someone who's actually in the industry. We ran live mock segments and his feedback was spot on. It was a real eye-opener — now I know where to start.", name: 'Yash Asthana', role: 'Aspiring cricket presenter & ex-Railways U19 player' },
  { quote: "The session was genuinely amazing. What we think the sports industry is, and what actually happens behind the scenes, are two completely different things. Krish broke it all down and gave me real guidance as a student who's passionate about the sport.", name: 'Vidisha Patel', role: 'Student-athlete (table tennis) exploring sports management' },
  { quote: "I got such a clear understanding of how everything works behind the scenes. We enjoy cricket on our screens, but this call showed me the entire world of work happening behind it. Really valuable.", name: 'Charan Teja Vallabhaneni', role: 'Data analytics graduate moving into sports' },
  { quote: "Krish completely changed my mindset. Before this, my classmates and I felt our course was a waste of time. After talking to him, I understood the real game is converting every opportunity you get. Genuinely helpful.", name: 'Shreyas Janorkar', role: 'Sports management student' },
  { quote: "I loved it. Honestly, I feel free now. I came in with zero clarity between data and presenting, and left knowing exactly how to start building both.", name: 'Soni Kasar', role: 'Aspiring sports presenter & analyst' },
  { quote: "I had a dream but no references and no idea where to begin — I was honestly a little afraid. After talking to Krish, I gained everything: what to do, which path to choose, and where to start. It was so helpful.", name: 'Jahanvi Rathod', role: 'Pharmacist turned aspiring cricket presenter' },
  { quote: "Absolutely helpful. The guidance meant a lot and gave me a clear path forward. I'm grateful I can stay in touch and keep reaching out.", name: 'Krish Rohra', role: 'Finance graduate & former club cricketer' },
  { quote: "It was amazing. So much information, so many doubts cleared, and a clear sense of which departments I can move into. I walked away knowing exactly where to start.", name: 'Anushka Gaikwad', role: 'Marketing professional transitioning into sports' },
  { quote: "It was really great. You gave me some genuine insights, and exactly like your form promised — no average suggestions, straight to the point. I'm really grateful.", name: 'Harivamsi Samudrala', role: 'Cricketer & B.Com graduate switching careers into sports' },
  { quote: "It was great. I understood so much more about sports management and all the different departments — exactly what I was looking for.", name: 'Abhishek Surve', role: 'Aspiring sports manager (found KORE 360 through Instagram)' },
];

// ---- FAQ ----
export const FAQS = [
  { q: 'How do I know which session is right for me?', a: "Want a beginner-friendly starting point? Try the e-book, designed by Krish Lalwani. If you'd rather have something built around your specific background and situation, the 1:1 clarity call gives you a real plan and references, and you can always leave your resume with us." },
  { q: 'Do you guarantee a job or placement?', a: "Unfortunately, not. Anyone who promises a guaranteed job in this industry isn't being straight with you. What we do guarantee is real introductions, real references, and effort that actually makes a difference. We keep you in mind for the future too, but any call you get after that is earned on your own caliber and interview." },
  { q: "I'm from a different industry. Are the doors to sports management still open for me?", a: 'Yes. Most of the people KORE 360 has placed didn\'t come from a sports background, they came from marketing, operations, finance and other fields and translated those skills into the industry. The e-book and clarity call both start from wherever you\'re coming from.' },
  { q: 'Are the courses available yet?', a: "The courses are coming soon — we're building them out to be structured and self-paced. In the meantime, the e-book, the webinar, and the 1:1 clarity call are all live and ready to go." },
  { q: 'How do internships and placements with brand partners actually work?', a: "Through the Talent track, KORE 360 matches you to real internship and placement openings with partner brands and represents you through the process, from intro to offer, rather than just forwarding a job link." },
];

// ---- Images ----
export const IMAGES = {
  events: eventOpsImg,
};

// ============================================================
//  Homepage (events-first) — see src/pages/Home.jsx
// ============================================================

// Six event services. `to` is a route/section that exists today; services
// without their own page set `enquire: true` instead, which opens the
// general event enquiry form pre-filled with that service, so no CTA points
// at an empty placeholder page.
export const HOME_SERVICES = [
  { id: 'league', name: 'Sports & League Management', desc: 'Planning, management and execution support for sports leagues, tournaments, sporting IPs and match-day operations.', cta: 'Explore Sports Management', to: '/events' },
  { id: 'corporate', name: 'Corporate Events', desc: 'Conferences, annual meets, awards, employee engagement and custom corporate sporting experiences.', cta: 'Enquire about Corporate Events', enquire: true },
  { id: 'activations', name: 'Brand Activations & Experiences', desc: 'Experiential marketing, product launches, fan engagement and immersive brand experiences.', cta: 'Enquire about Brand Activations', enquire: true },
  { id: 'production', name: 'Event Production', desc: 'Technical production, staging, audio-visual coordination, infrastructure and event production management.', cta: 'Enquire about Production', enquire: true },
  { id: 'hospitality', name: 'Hospitality & Logistics', desc: 'Guest services, team logistics, accommodation, travel coordination, accreditation and venue operations.', cta: 'Enquire about Hospitality', enquire: true },
  { id: 'partnerships', name: 'Sponsorships & Partnerships', desc: 'Commercial strategy, sponsorship opportunities, partnerships and brand integration.', cta: 'Enquire about Partnerships', enquire: true },
];

// Selected work. Two kinds, never mixed up on the page:
//   KORE_PROJECTS     — work contracted and delivered by KORE 360 itself.
//   INDUSTRY_EXPERIENCE — properties the founder/team worked on in their own
//                         professional capacity, not as KORE 360 clients.
// Only add an entry once its details are verified. Optional fields:
// location, year, involvement, img (+ imgAlt), href (case study).
// KORE_PROJECTS is empty until verified project details are supplied; the
// homepage hides that group while it's empty.
export const KORE_PROJECTS = [];

export const INDUSTRY_EXPERIENCE = [
  { name: 'Indian Premier League (IPL)', category: 'Cricket league' },
  { name: 'Legends League Cricket', category: 'Cricket league', location: 'India & Doha' },
  { name: 'Indian Street Premier League (ISPL)', category: 'Cricket league' },
  { name: 'Entertainers Cricket League (ECL)', category: 'Cricket league' },
  { name: 'Khelo India', category: 'Multi-sport games' },
];

export const HOME_PROCESS = [
  { step: '01', name: 'Discover', desc: "Understand the client's event requirements, objectives, audience and expectations." },
  { step: '02', name: 'Design', desc: 'Develop the operational strategy, scope, timelines, team structure and execution plan.' },
  { step: '03', name: 'Deliver', desc: 'Coordinate agreed stakeholders, production, vendors, manpower and on-ground activities.' },
  { step: '04', name: 'Review', desc: 'Evaluate outcomes, document learnings and identify opportunities for improvement.' },
];

export const HOME_WHY = [
  { name: 'Integrated Approach', desc: 'Planning, production, operations and partnerships aligned under one coordinated brief.' },
  { name: 'On-Ground Understanding', desc: 'An execution-led perspective built on practical industry experience.' },
  { name: 'Flexible Engagement', desc: 'Support ranging from strategic planning to defined event execution and longer-term partnerships.' },
  { name: 'Accountability', desc: 'Clear project responsibilities, communication and delivery processes based on the agreed scope.' },
];

// General (non-league) event enquiry — must match the allow-lists in
// api/submit-league-enquiry.js (form: 'event'), which rejects anything else.
export const EVENT_ENQUIRY_OPTIONS = {
  eventType: ['Sports event or league', 'Corporate event', 'Brand activation', 'Entertainment / live experience', 'Hospitality experience', 'Other'],
  timeline: ['Within 3 months', '3–6 months', '6–12 months', 'Not finalized'],
  budget: ['Under ₹10 lakh', '₹10–25 lakh', '₹25 lakh – ₹1 crore', 'Above ₹1 crore', 'Prefer not to say'],
  services: HOME_SERVICES.map((s) => s.name),
};

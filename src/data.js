// ============================================================
//  KORE 360 — site content
//  Edit everything about your site's text, prices and links here.
// ============================================================

import heroCenteredImg from './assets/hero-centered.jpg';
import heroMobileImg from './assets/hero-mobile.jpg';
import sportsMarketingImg from './assets/sports_marketing.jpg';
import teamOperationsImg from './assets/team_operations.jpg';
import athleteManagementImg from './assets/athlete_management.jpg';
import eventOpsImg from './assets/event_ops.jpg';
import starterCourseImg from './assets/the_sports_management_starter.jpg';
import marketingCourseImg from './assets/marketing_and_sponsorship.jpg';
import networkingCourseImg from './assets/land_the_job_role.jpg';

// Accent colour used across the whole site. Brand shades: '#DB117C' (pink), '#9F3D97' (purple), '#B71E60' (magenta).
export const ACCENT = '#F05123';

// Which hero layout to show: 'split' | 'centered' | 'editorial'
export const HERO_VARIANT = 'centered';

// ---- Key links (used in several places) ----
export const LINKS = {
  bookCall: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0',
  ebook: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697',
  instagram: 'https://www.instagram.com/krishlalwaniofficial/',
  event: '#',
};

// ---- Hero copy ----
export const HERO = {
  eyebrow: 'KORE 360 · SPORTS MANAGEMENT',
  headlineLines: ['Get inside', 'the game'],
  blurb:
    "Five years in the industry. 60+ calls. 100+ people placed.\nI'm Krish Lalwani — and this is how you actually build a career in sport.",
  primaryCta: 'See All Courses',
  secondaryCta: 'Get the e-book · ₹99',
  stats: [
    { value: '5+', label: 'years' },
    { value: '60+', label: 'calls' },
    { value: '100+', label: 'placed' },
  ],
};

// ---- Explore by interest (tabs: image + blurb per interest) ----
export const MARQUEE = [
  { label: 'Sports marketing', desc: "Build the campaigns, partnerships and fan engagement strategies that get a team or league noticed. From digital content calendars to in-stadium activations, this is where brand, sport and audience meet — and where teams are investing more every season as fan attention gets harder to win.", img: sportsMarketingImg },
  { label: 'Team operations', desc: "Keep a franchise running — logistics, scheduling, compliance and the day-to-day that gets a team onto the field. Travel, kit, accreditation, venue coordination and dozens of small decisions made well before anyone notices them: this is the backbone role every team relies on.", img: teamOperationsImg },
  { label: 'Athlete management', desc: "Manage contracts, brand deals and the off-field career of the athletes you represent. You're the buffer between the athlete and everything else — negotiations, sponsors, media requests — so they can focus on performing while you build their long-term value.", img: athleteManagementImg },
  { label: 'Event ops', desc: "Plan and run the live experience — venues, vendors, broadcast and everything that has to work on match day. Ticketing, security, hospitality and contingency plans all come together under one roof, and when it's done right, nobody in the stands even notices the work behind it.", img: eventOpsImg },
];

// ---- Sessions ("Work with Krish") ----
// `details` powers the expanded breakdown on the Education page; the homepage cards only use the fields above it.
export const SESSIONS = [
  {
    tag: 'E-BOOK', name: 'Behind the Field', price: '₹99', meta: 'PDF · instant download', desc: 'My complete playbook for breaking into sports management — the roles, the routes, the real talk.', cta: 'Buy the e-book', href: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697',
    details: {
      format: 'Instant PDF download, ~60 pages',
      whoFor: "Anyone starting from zero who wants the full map before spending on a call",
      includes: ['Every entry route into sports management, mapped out', 'Real job titles and what they actually pay', 'A breakdown of which skills matter for which roles', "Krish's personal do's and don'ts from five years in the industry"],
      outcome: "Walk away knowing exactly which corner of the industry fits you — before you spend a rupee on anything else.",
    },
  },
  {
    tag: 'WEBINAR', name: 'Live Webinar', price: '₹499', meta: '60 min · live · listen-only', desc: 'A one-hour live session on how the industry actually hires. Watch and learn — no live Q&A.', cta: 'Book your seat', href: '#',
    details: {
      format: '60-minute live session, listen-only (no live Q&A)',
      whoFor: 'People who want the bigger picture of how hiring actually works in sport, beyond the entry-level playbook',
      includes: ['How teams, leagues and agencies actually hire', 'What recruiters screen for first', 'Common mistakes that get applications rejected', 'Live audience polls and real examples'],
      outcome: 'Leave the session with a clear, realistic picture of what hiring managers in sport are actually looking for.',
    },
  },
  {
    tag: 'Q&A', name: '1:1 Q&A Call', price: '₹499', meta: '15 min · audio call', desc: 'Fifteen minutes, audio only, just you and me. Bring your questions, leave with answers.', cta: 'Book a Q&A', href: '#',
    details: {
      format: '15-minute 1:1 audio call',
      whoFor: "Anyone with specific, pointed questions who doesn't need a full strategy session",
      includes: ['Direct answers to your specific questions', 'No script — just a conversation', 'A quick gut-check on a decision you’re weighing'],
      outcome: 'Get unstuck on the one or two questions that have been sitting in your head.',
    },
  },
  {
    tag: '1:1 CALL', name: 'Clarity Call', price: '₹1,499', meta: '30 min · video call', desc: 'A thirty-minute video call to map your personal route into the industry.', cta: 'Book a 1:1 clarity call', href: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0', featured: true,
    details: {
      format: '30-minute 1:1 video call',
      whoFor: "Anyone ready to map out their personal route into the industry, with someone who's done the hiring",
      includes: ['A personalised route into the industry based on your background', 'Honest feedback on your CV/profile if you share it beforehand', 'A short action plan for your next 90 days'],
      outcome: 'Leave with a concrete plan — not just inspiration — for the next quarter of your job search.',
    },
  },
];

// ---- Management page: sponsorships & hospitality ----
export const MANAGEMENT_SERVICES = [
  {
    tag: 'SPONSORSHIPS',
    title: 'Sponsorship sourcing & negotiation',
    desc: 'Connect teams, athletes and events with the right brand partners — and structure deals that actually deliver for both sides.',
    points: [
      'Identify and approach brands that fit your audience',
      'Structure sponsorship packages and deliverables',
      'Negotiate terms, activation rights and renewals',
      'Manage the relationship once the deal is signed',
    ],
  },
  {
    tag: 'HOSPITALITY',
    title: 'Match-day hospitality & guest experience',
    desc: 'Plan and run the hospitality side of live sport — corporate boxes, VIP guests and partner entertainment.',
    points: [
      'Guest lists, invites and accreditation',
      'Corporate box and lounge experience design',
      'On-ground coordination on match day',
      'Post-event reporting back to sponsors and partners',
    ],
  },
];

// ---- Talent page: placement & internship partners ----
export const TALENT_PARTNERS = ['Decathlon', 'MuscleBlaze'];

// ---- Courses ----
export const COURSES = [
  { level: 'Beginner', name: 'The Sports Management Starter', price: '₹2,999', desc: 'From zero to job-ready: the foundations of the sports business and where you fit.', href: '#', img: starterCourseImg },
  { level: 'Intermediate', name: 'Marketing & Sponsorship in Sport', price: '₹4,999', desc: 'How brands, rights and money actually move through the game.', href: '#', img: marketingCourseImg },
  { level: 'All levels', name: 'Land the Role: Sports Networking', price: '₹1,999', desc: 'Build the network and the pitch that gets you hired.', href: '#', img: networkingCourseImg },
];

// ---- Careers ----
export const CAREERS = [
  { tag: 'GET YOUR FOOT IN', role: 'Internships', desc: 'Hands-on internship roles across teams, agencies, leagues and events. Pick your track and apply through the form.', cta: 'Apply for an internship', href: '#' },
  { tag: 'FULL-TIME ROLES', role: 'Jobs', desc: "Vetted full-time openings with partners across the sports industry. Tell us what you're after.", cta: 'Browse job openings', href: '#' },
];

// ---- Events ----
export const EVENT_TYPES = ['Keynotes & talks', 'Panels & moderation', 'Campus & community workshops', 'Brand appearances'];

// ---- Testimonials (video) ----
// `video` is a placeholder sample clip — swap in your own video file/URL per testimonial when ready.
const DUMMY_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
export const TESTIMONIALS = [
  { name: 'Ananya R.', result: 'Landed a marketing internship with an IPL franchise', quote: 'The 1:1 call gave me a real plan instead of generic advice — I knew exactly what to do next.', poster: sportsMarketingImg, video: DUMMY_VIDEO },
  { name: 'Rohit K.', result: 'Now working in team operations for a national league', quote: "I went from cold-emailing teams to getting interviews within weeks of the clarity call.", poster: teamOperationsImg, video: DUMMY_VIDEO },
  { name: 'Megha S.', result: 'Placed as an athlete management associate', quote: 'Krish broke down exactly what recruiters look for — it changed how I applied for everything after.', poster: athleteManagementImg, video: DUMMY_VIDEO },
  { name: 'Aditya V.', result: 'Booked his first event-ops gig within a month', quote: 'The e-book alone gave me more clarity than weeks of random Googling.', poster: eventOpsImg, video: DUMMY_VIDEO },
  { name: 'Priya N.', result: 'Now networking her way into a sports agency role', quote: 'The networking course taught me how to actually pitch myself, not just send another CV.', poster: networkingCourseImg, video: DUMMY_VIDEO },
];

// ---- FAQ ----
export const FAQS = [
  { q: 'How do I know which session is right for me?', a: "Most people end up booking the 1:1 clarity call — it's the only session built around your specific background, not a generic script. In thirty minutes you'll walk away with a personalised route into the industry and an honest read on where you stand, rather than information you still have to figure out how to apply. If you want the cheapest possible starting point first, the e-book covers the basics, and the 15-minute Q&A works if you've already got one or two pointed questions — but the clarity call is the one that actually moves people forward." },
  { q: 'Do you guarantee a job or placement?', a: "No — and anyone who promises a guaranteed job in this industry isn't being straight with you. What we do guarantee is a clear, honest plan, real introductions where they make sense, and an honest read on where you actually stand." },
  { q: "I have zero sports background — can I still break in?", a: 'Yes. Most of the people KORE 360 has placed didn\'t come from a sports background — they came from marketing, operations, finance and other fields and translated those skills into sport. The e-book and clarity call both start from "zero, but motivated."' },
  { q: 'Are the courses live or self-paced?', a: 'The courses are self-paced — you get access and work through them on your own schedule. The webinar is the one live, fixed-time session; everything else (e-book, courses) you can start the moment you pay.' },
  { q: 'How do internships and placements with brand partners actually work?', a: "Through the Talent track, KORE 360 matches you to real internship and placement openings with partner brands and represents you through the process — from intro to offer — rather than just forwarding a job link." },
];

// ---- Images ----
export const IMAGES = {
  heroSplit: heroMobileImg,
  heroCentered: heroCenteredImg,
  heroMobile: heroMobileImg,
  heroEditorial: heroMobileImg,
  events: eventOpsImg,
};

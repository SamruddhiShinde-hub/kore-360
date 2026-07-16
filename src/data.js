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

// Which hero layout to show: 'split' | 'centered' | 'editorial'
export const HERO_VARIANT = 'centered';

// ---- Key links (used in several places) ----
export const LINKS = {
  bookCall: 'https://superprofile.bio/bookings/krishlalwaniofficial?sessionId=699dc00d94cdda00134ba9a0',
  ebook: 'https://superprofile.bio/vp/behind-the-field---krish-lalwani-697',
  instagram: 'https://www.instagram.com/krishlalwaniofficial/',
  event: '#',
  phone: '+91 96892 88000',
  phoneTel: 'tel:+919689288000',
  whatsapp: 'https://wa.me/919689288000',
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
    tag: 'E-BOOK', name: 'Behind the Field', price: '₹99', meta: 'PDF · Instant download', desc: 'My complete playbook for breaking into sports management: the roles, the routes, the real talk.', cta: 'Buy the e-book', sessionId: 'ebook',
    details: {
      format: 'Instant PDF download',
      whoFor: "Anyone starting from zero who wants the full map before spending on a call",
      includes: ['Every entry route into sports management, mapped out', 'Real job titles and what they actually pay', 'A breakdown of which skills matter for which roles', "Krish's personal do's and don'ts from five years in the industry"],
      outcome: "Walk away knowing exactly which corner of the industry fits you before you spend a rupee on anything else.",
    },
  },
  {
    tag: 'WEBINAR', name: 'Live Webinar', price: '₹499', meta: '60 min · Live · Wed, 22 Jul, 7:00 PM IST', desc: 'A one-hour live session on how the industry actually hires.', cta: 'Book your seat', sessionId: 'webinar',
    // Must match SESSIONS.webinar.fixedStart in api/_lib/config.js — kept as
    // display strings here since the API config isn't safe to import client-side.
    eventDate: 'Wednesday, 22 July 2026', eventTime: '7:00 – 8:00 PM IST',
    details: {
      format: '60-minute live session, listen-only',
      whoFor: 'People who want the bigger picture of how hiring actually works in sport, beyond the entry-level playbook',
      includes: ['How teams, leagues and agencies actually hire', 'What recruiters screen for first', 'Common mistakes that get applications rejected', 'Live audience polls and real examples'],
      outcome: 'Leave the session with a clear, realistic picture of what hiring managers in sport are actually looking for.',
    },
  },
  {
    tag: 'Q&A', name: '1:1 Q&A Call', price: '₹499', meta: '10 min · Audio call', desc: 'Ten minutes, audio only, just you and me. Bring your questions, leave with answers.', cta: 'Book a Q&A', sessionId: 'qna',
    details: {
      format: '10-minute 1:1 audio call',
      whoFor: "Anyone with specific, pointed questions who doesn't need a full strategy session",
      includes: ['Direct answers to your specific questions', 'No script, just a conversation', 'A quick gut-check on a decision you’re weighing'],
      outcome: 'Get unstuck on the one or two questions that have been sitting in your head.',
    },
  },
  {
    tag: '1:1 CALL', name: 'Clarity Call', price: '₹1,499', originalPrice: '₹1,999', meta: '30 min · Video call', desc: 'A thirty-minute video call to map your personal route into the industry.', cta: 'Book a 1:1', sessionId: 'clarity', featured: true,
    details: {
      format: '30-minute 1:1 video call',
      whoFor: "Anyone ready to map out their personal route into the industry, with someone who's done the hiring",
      includes: ['A personalised route into the industry based on your background', 'Honest feedback on your CV/profile if you share it beforehand', 'A short action plan for your next 90 days'],
      outcome: 'Leave with a concrete plan, not just inspiration, for the next quarter of your job search.',
    },
  },
];

// ---- Management page: sponsorships & hospitality ----
export const MANAGEMENT_SERVICES = [
  {
    tag: 'SPONSORSHIPS',
    title: 'Sponsorship sourcing & negotiation',
    desc: 'Connect teams, athletes and events with the right brand partners, and structure deals that actually deliver for both sides.',
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
    desc: 'Plan and run the hospitality side of live sport: corporate boxes, VIP guests and partner entertainment.',
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
  { tag: 'GET YOUR FOOT IN', role: 'Internships', desc: 'Hands-on internship roles across teams, agencies, leagues and events. Pick your track and apply through the form.', cta: 'Apply for an internship', href: '#' },
  { tag: 'FULL-TIME ROLES', role: 'Jobs', desc: "Vetted full-time openings with partners across the sports industry. Tell us what you're after.", cta: 'Browse job openings', href: '#' },
];

// ---- Events ----
export const EVENT_TYPES = ['Keynotes & talks', 'Panels & moderation', 'Campus & community workshops', 'Brand appearances'];

// ---- Testimonials (video) ----
// `video` is a placeholder sample clip — swap in your own video file/URL per testimonial when ready.
const DUMMY_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
export const TESTIMONIALS = [
  { name: 'Ananya R.', result: 'Landed a marketing internship with an IPL franchise', quote: 'The 1:1 call gave me a real plan instead of generic advice, and I knew exactly what to do next.', poster: sportsMarketingImg, video: DUMMY_VIDEO },
  { name: 'Rohit K.', result: 'Now working in team operations for a national league', quote: "I went from cold-emailing teams to getting interviews within weeks of the clarity call.", poster: teamOperationsImg, video: DUMMY_VIDEO },
  { name: 'Megha S.', result: 'Placed as an athlete management associate', quote: 'Krish broke down exactly what recruiters look for, and it changed how I applied for everything after.', poster: athleteManagementImg, video: DUMMY_VIDEO },
  { name: 'Aditya V.', result: 'Booked his first event-ops gig within a month', quote: 'The e-book alone gave me more clarity than weeks of random Googling.', poster: eventOpsImg, video: DUMMY_VIDEO },
  { name: 'Priya N.', result: 'Now networking her way into a sports agency role', quote: 'The networking course taught me how to actually pitch myself, not just send another CV.', poster: networkingCourseImg, video: DUMMY_VIDEO },
];

// ---- FAQ ----
export const FAQS = [
  { q: 'How do I know which session is right for me?', a: "Want a beginner-friendly starting point? Try the e-book, designed by Krish Lalwani. If you'd rather have something built around your specific background and situation, the 1:1 clarity call gives you a real plan and references, and you can always leave your resume with us." },
  { q: 'Do you guarantee a job or placement?', a: "Unfortunately, not. Anyone who promises a guaranteed job in this industry isn't being straight with you. What we do guarantee is real introductions, real references, and effort that actually makes a difference. We keep you in mind for the future too, but any call you get after that is earned on your own caliber and interview." },
  { q: "I'm from a different industry. Are the doors to sports management still open for me?", a: 'Yes. Most of the people KORE 360 has placed didn\'t come from a sports background, they came from marketing, operations, finance and other fields and translated those skills into the industry. The e-book and clarity call both start from wherever you\'re coming from.' },
  { q: 'Are the courses live or self-paced?', a: 'The courses are self-paced, you get access and work through them on your own schedule. The webinar is the one live, fixed-time session; everything else you can start right away.' },
  { q: 'How do internships and placements with brand partners actually work?', a: "Through the Talent track, KORE 360 matches you to real internship and placement openings with partner brands and represents you through the process, from intro to offer, rather than just forwarding a job link." },
];

// ---- Images ----
export const IMAGES = {
  heroSplit: heroMobileImg,
  heroCentered: heroCenteredImg,
  heroMobile: heroMobileImg,
  heroEditorial: heroMobileImg,
  events: eventOpsImg,
};

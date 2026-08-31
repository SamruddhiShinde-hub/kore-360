// ============================================================
//  KORE 360 — blog post index
//  Each entry here is a card on /blog. Add the actual article as its own
//  page under src/pages/blog/, then register its route in App.jsx (same
//  pattern as the dedicated Education session pages).
// ============================================================

import matchDayCoverImg from './assets/what-actually-happens-on-match-day-cover.jpg';
import budgetCoverImg from './assets/budget-cover-image.png';
import fiveThingsCoverImg from './assets/5-things-I-wish-someone-taugh-me-cover-image.jpg';
import internshipsCoverImg from './assets/sports-internships-cover.jpg';

export const BLOG_POSTS = [
  {
    slug: 'sports-management-internships-india',
    title: 'Sports Management Internships in India: Every Real Way to Get One',
    subtitle: 'IPL, BCCI, ISL and beyond — how the internships that actually matter get filled.',
    excerpt: 'Every real way to land a sports management internship in India — match day operations, franchises, BCCI and state associations, broadcast houses and sponsorship agencies — from someone who has worked 500+ matches across 20+ leagues.',
    date: '2026-08-31',
    author: 'Krish Lalwani',
    cover: internshipsCoverImg,
  },
  {
    slug: '5-things-i-wish-i-knew-before-sports-industry',
    title: '5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry',
    subtitle: 'The lessons that shaped how I work. Learned in the one place they actually stick, on the ground.',
    excerpt: 'The lessons that shaped a career in live sports and events — what the ground teaches you about being useful, staying ready and earning the next call.',
    date: '2026-08-26',
    author: 'Krish Lalwani',
    cover: fiveThingsCoverImg,
  },
  {
    slug: 'event-budget-planning-where-the-money-goes',
    title: 'Where Event Budgets Actually Go',
    subtitle: 'The line items nobody shows you, and the five places money quietly leaks.',
    excerpt: 'A ground-level event budget breakdown: the real line items, the hidden costs, and the five places money quietly leaks on live sports and events.',
    date: '2026-08-24',
    author: 'Krish Lalwani',
    cover: budgetCoverImg,
  },
  {
    slug: 'what-happens-on-match-day',
    title: 'What Actually Happens on Match Day',
    subtitle: 'The fifteen-hour day nobody sees behind three hours of cricket.',
    excerpt: 'A ground-level walk through everything that happens on match day, from before sunrise to teardown, written by someone who has actually run it across the IPL, LLC and ISPL.',
    date: '2026-08-18',
    author: 'Krish Lalwani',
    cover: matchDayCoverImg,
  },
];

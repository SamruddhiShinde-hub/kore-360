// ============================================================
//  KORE 360 — blog post index
//  Each entry here is a card on /blog. Add the actual article as its own
//  page under src/pages/blog/, then register its route in App.jsx (same
//  pattern as the dedicated Education session pages).
// ============================================================

import matchDayCoverImg from './assets/what-actually-happens-on-match-day-cover.jpg';

export const BLOG_POSTS = [
  {
    slug: 'event-budget-planning-where-the-money-goes',
    title: 'Where Event Budgets Actually Go',
    subtitle: 'The line items nobody shows you, and the five places money quietly leaks.',
    excerpt: 'A ground-level event budget breakdown: the real line items, the hidden costs, and the five places money quietly leaks on live sports and events.',
    date: '2026-08-24',
    author: 'Krish Lalwani',
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

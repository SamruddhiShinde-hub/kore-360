import { hasConsent } from './consent.js';

// Thin wrapper around the GTM dataLayer — every custom event on the site
// goes through this so the shape stays consistent. See the analytics
// runbook for which GTM triggers/tags each event name maps to.
// Events are dropped without analytics consent — otherwise they'd queue in
// dataLayer and be sent retroactively the moment GTM loads after consent.
export function track(event, params = {}) {
  if (!hasConsent('analytics')) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// SESSIONS prices are display strings like '₹1,499' — GA4 wants a plain number.
export function priceToNumber(price) {
  return Number(String(price).replace(/[^\d.]/g, ''));
}

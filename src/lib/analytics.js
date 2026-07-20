// Thin wrapper around the GTM dataLayer — every custom event on the site
// goes through this so the shape stays consistent. See the analytics
// runbook for which GTM triggers/tags each event name maps to.
export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// SESSIONS prices are display strings like '₹1,499' — GA4 wants a plain number.
export function priceToNumber(price) {
  return Number(String(price).replace(/[^\d.]/g, ''));
}

// Cookie-consent state. The record lives in localStorage under STORAGE_KEY;
// index.html reads the same key synchronously on page load, before any
// tracking can start, so the two must stay in sync (key + version).
//
// Enforcement, not just a notice:
//  - Google Tag Manager (which carries GA4 and Microsoft Clarity) is only
//    injected once analytics consent exists — see window.__koreLoadGtm in
//    index.html. Before that, nothing is sent to Google or Microsoft.
//  - Google Consent Mode signals mirror the choice for any tag GTM runs.
//  - track() drops events while analytics consent is missing (analytics.js).
//  - Revoking a category clears our first-party cookies for it and reloads,
//    because a GTM container that has already loaded can't be unloaded.
export const STORAGE_KEY = 'kore-consent';
// Bump when categories or what they cover change materially — visitors with
// an older record are asked again.
export const CONSENT_VERSION = 1;
export const OPTIONAL_CATEGORIES = ['analytics', 'marketing', 'functional'];

const CHANGE_EVENT = 'kore-consent-change';
const OPEN_EVENT = 'kore-open-cookie-settings';

// First-party cookies the optional tags set on our own domain. Third-party
// cookies (e.g. Clarity's on clarity.ms) can't be cleared from here — the
// Cookie Policy says so.
const CATEGORY_COOKIES = {
  analytics: [/^_ga($|_)/, /^_gid$/, /^_gat/, /^_clck$/, /^_clsk$/],
  marketing: [/^_gcl_/, /^_fbp$/],
  functional: [],
};
const CATEGORY_STORAGE = {
  marketing: { session: ['kore-utm'], local: [] },
  functional: { session: ['kore-connect-popup-seen'], local: [] },
  analytics: { session: [], local: [] },
};

let cached;

export function getConsent() {
  if (cached !== undefined) return cached;
  try {
    const rec = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    cached = rec && rec.v === CONSENT_VERSION ? rec : null;
  } catch {
    cached = null;
  }
  return cached;
}

export function hasConsent(category) {
  return Boolean(getConsent()?.[category]);
}

function gtagConsentUpdate(rec) {
  window.dataLayer = window.dataLayer || [];
  // Consent commands must be pushed as an Arguments object, like gtag() does.
  // eslint-disable-next-line prefer-rest-params
  const gtag = function () { window.dataLayer.push(arguments); };
  gtag('consent', 'update', {
    analytics_storage: rec.analytics ? 'granted' : 'denied',
    ad_storage: rec.marketing ? 'granted' : 'denied',
    ad_user_data: rec.marketing ? 'granted' : 'denied',
    ad_personalization: rec.marketing ? 'granted' : 'denied',
    functionality_storage: rec.functional ? 'granted' : 'denied',
    personalization_storage: rec.functional ? 'granted' : 'denied',
  });
}

function clearCategory(category) {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean).forEach((name) => {
    if (!CATEGORY_COOKIES[category].some((re) => re.test(name))) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
  try {
    CATEGORY_STORAGE[category].session.forEach((k) => sessionStorage.removeItem(k));
    CATEGORY_STORAGE[category].local.forEach((k) => localStorage.removeItem(k));
  } catch { /* storage unavailable */ }
}

export function saveConsent(choice) {
  const prev = getConsent();
  const rec = {
    v: CONSENT_VERSION,
    analytics: Boolean(choice.analytics),
    marketing: Boolean(choice.marketing),
    functional: Boolean(choice.functional),
    ts: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
  } catch { /* storage unavailable — the choice still applies for this page view */ }
  cached = rec;

  gtagConsentUpdate(rec);
  const revoked = OPTIONAL_CATEGORIES.filter((c) => prev?.[c] && !rec[c]);
  revoked.forEach(clearCategory);

  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: rec }));

  // A GTM container that already ran can't be switched off — reload so the
  // page comes back up without it (index.html won't load it again).
  if (revoked.includes('analytics') && window.__koreGtmLoaded) {
    window.location.reload();
    return rec;
  }
  if (rec.analytics) window.__koreLoadGtm?.();
  return rec;
}

export function onConsentChange(fn) {
  const handler = (e) => fn(e.detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenCookieSettings(fn) {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
}

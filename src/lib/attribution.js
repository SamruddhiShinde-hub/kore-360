import { hasConsent, onConsentChange } from './consent.js';

// First-touch UTM capture. Visitors usually land on one page (from an ad or
// a shared link) and navigate client-side from there, which drops the query
// string — so the UTMs are kept for the session on first load and read back
// when a lead form submits.
//
// Campaign attribution counts as marketing under the cookie policy: without
// marketing consent the UTMs are held in memory only (never written to
// storage) and aren't attached to lead submissions.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'kore-utm';

let pending = null;

function persist(utm) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm)); } catch { /* storage unavailable */ }
}

export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 200);
    });
    // Only overwrite when this URL actually carries a campaign — an internal
    // click to a page without UTMs shouldn't wipe the original attribution.
    if (!Object.keys(utm).length) return;
    pending = utm;
    if (hasConsent('marketing')) persist(utm);
  } catch { /* URL parsing unavailable */ }
}

// Consent granted later in the same visit — keep what the landing URL carried.
onConsentChange((rec) => {
  if (rec.marketing && pending) persist(pending);
  if (!rec.marketing) pending = null;
});

export function getUtm() {
  if (!hasConsent('marketing')) return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null') || pending || {};
  } catch {
    return pending || {};
  }
}

// First-touch UTM capture. Visitors usually land on one page (from an ad or
// a shared link) and navigate client-side from there, which drops the query
// string — so the UTMs are stashed for the session on first load and read
// back when a lead form submits.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'kore-utm';

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
    if (Object.keys(utm).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch { /* storage unavailable */ }
}

export function getUtm() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

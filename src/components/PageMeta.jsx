import { useEffect } from 'react';

const SITE_URL = 'https://kore360.in';
const SITE_NAME = 'KORE 360';

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

// `jsonLd` is one object or an array of them — each gets its own
// <script type="application/ld+json">, added on mount and removed on
// unmount/change so navigating away from an article doesn't leave stale
// structured data sitting in <head> for the next page.
export default function PageMeta({ title, description, path = '/', type = 'website', jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Sports Management Careers with Krish Lalwani`;
    document.title = fullTitle;

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    setMeta('property', 'og:title', fullTitle);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('property', 'og:type', type);

    const url = `${SITE_URL}${path}`;
    setMeta('property', 'og:url', url);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const scripts = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
        scripts.push(script);
      });
    }

    // Every routed page renders PageMeta with its own title/path, which
    // makes this the one place that reliably fires after the new page's
    // title is set — a virtual pageview hooked into the router directly
    // (e.g. ScrollToTop) would fire before this effect and report the
    // previous page's title for a moment on every navigation.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_location: url,
      page_path: path,
      page_title: fullTitle,
    });

    return () => {
      scripts.forEach((s) => s.remove());
      setMeta('property', 'og:type', 'website');
    };
  }, [title, description, path, type, jsonLd]);

  return null;
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router doesn't reset scroll position on navigation by default.
// Links with a hash (e.g. the footer's /#services) scroll to that section
// instead — retried briefly, since lazy routes render after this runs.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
      else if (tries++ < 20) timer = setTimeout(seek, 50);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

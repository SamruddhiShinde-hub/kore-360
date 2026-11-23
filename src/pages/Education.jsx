import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SESSIONS, discountPercent } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { usePrefersReducedMotion } from '../lib/motion.js';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)', 'var(--kore-orange-text)', 'var(--kore-magenta-text)'];
const DEDICATED_PAGES = { webinar: '/education/live-webinar', clarity: '/education/clarity-call', ebook: '/education/ebook' };
// Card-sized crops (public/education/) of the e-book cover and the Clarity
// Call photo. The webinar has no photo, so it gets a typographic cover.
const COVERS = {
  ebook: { src: '/education/ebook-card.webp', small: '/education/ebook-card-480.webp', alt: 'Cover of the Behind the Field e-book by Krish Lalwani' },
  clarity: { src: '/education/clarity-card.webp', small: '/education/clarity-card-480.webp', alt: 'Krish Lalwani on a 1:1 video call from his laptop' },
};

// One card = one link: image, title, price and CTA all open the offer's
// page, so each card is a single tab stop. The CTA is a styled span.
function OfferCard({ s, accent }) {
  const cover = COVERS[s.sessionId];
  const shortMeta = s.meta.split('·').slice(0, 2).join(' · ');
  const cta = s.soldOut ? 'View webinar details' : s.cta;
  return (
    <Link to={DEDICATED_PAGES[s.sessionId]} className={`ed-card${s.featured ? ' is-featured' : ''}`}>
      <div className="ed-card-media">
        {cover ? (
          <img src={cover.src} srcSet={`${cover.small} 480w, ${cover.src} 800w`} sizes="(max-width: 640px) 84vw, (max-width: 1023px) 46vw, 380px" alt={cover.alt} width="800" height="600" loading="lazy" decoding="async" />
        ) : (
          <div className="ed-card-type" aria-hidden="true"><span>Live</span><span>Webinar</span></div>
        )}
        {s.featured && <span className="ed-card-badge">Most booked</span>}
      </div>
      <div className="ed-card-body">
        <span className="ed-card-tag" style={{ color: accent }}>{s.tag}</span>
        <h3 className="ed-card-name">{s.name}</h3>
        <span className="ed-card-meta">{shortMeta}</span>
        <p className="ed-card-desc">{s.desc}</p>
        <div className="ed-card-foot">
          <div className="ed-card-price">
            {s.promoActive && <span className="ed-card-was">{s.originalPrice}</span>}
            <span className="ed-card-now">{s.price}</span>
            {s.promoActive && <span className="ed-card-off">{discountPercent(s.price, s.originalPrice)}% OFF</span>}
            {s.soldOut && <span className="ed-card-status">Sold Out</span>}
          </div>
          <span className={`ed-card-cta${s.soldOut ? ' is-muted' : ''}`}>{cta} <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </Link>
  );
}

// Three columns on desktop; below that a native, scroll-snapped carousel.
// Prev/next only appear when the cards overflow, and each disables at its end.
function OfferCarousel({ sessions }) {
  const trackRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [nav, setNav] = useState({ overflow: false, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setNav({ overflow: max > 2, atStart: el.scrollLeft <= 2, atEnd: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', measure); ro.disconnect(); };
  }, [measure]);

  const page = (dir) => {
    const el = trackRef.current;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="ed-offers-wrap">
      {nav.overflow && (
        <div className="ed-offers-nav">
          <button type="button" className="ed-offers-btn" onClick={() => page(-1)} disabled={nav.atStart} aria-controls="ed-offers" aria-label="Previous offer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="ed-offers-btn" onClick={() => page(1)} disabled={nav.atEnd} aria-controls="ed-offers" aria-label="Next offer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
      <ul id="ed-offers" ref={trackRef} className="ed-offers" aria-label="Education offers">
        {sessions.map((s, i) => (
          <li key={s.sessionId}><OfferCard s={s} accent={CARD_COLORS[i % CARD_COLORS.length]} /></li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  return (
    <>
      <PageMeta
        title="Education: E-Book, Webinar and Clarity Calls"
        description="Learn how sports management hiring actually works, from a ₹99 e-book to a 1:1 clarity call with Krish Lalwani. Pick the format that fits how you learn."
        path="/education"
      />
      <PageHero
        id="education-hero-title"
        eyebrow="EDUCATION"
        title={<>
          <span className="hx-hero-line">Learn how the industry</span>
          <span className="hx-hero-line hx-hero-title-accent">actually works</span>
        </>}
        intro="From a ₹99 read to a 1:1 game plan with Krish: three ways to get the real picture of how sports management hiring actually works, in as much or as little time as you've got."
        image="/education/hero-desktop.webp" imageMobile="/education/hero-mobile.webp" width="1600" height="900"
        alt="Krish Lalwani on a 1:1 career guidance video call from his laptop"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 96px' }}>
        <div className="ed-head">
          <div className="hx-eyebrow">CHOOSE HOW YOU LEARN</div>
          <h2 className="league-h2" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>Three ways in, at three price points</h2>
          <p className="league-lede">Start with the e-book, join a live webinar, or book a 1:1 Clarity Call with Krish for a plan built around your background.</p>
        </div>
        <OfferCarousel sessions={SESSIONS} />

        <Reveal style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid rgba(var(--border-rgb),0.08)', paddingTop: '32px' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: '0 0 18px' }}>Not sure which one to start with? The clarity call is the most personal option, and the e-book is the cheapest way to find out if this industry is for you.</p>
          <Link to="/education/clarity-call" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>Talk to Krish 1:1 →</Link>
        </Reveal>
      </div>
    </>
  );
}

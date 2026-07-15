import { useRef, useState } from 'react';
import { MARQUEE } from '../data.js';

const SWIPE_THRESHOLD = 50;

function ChevronIcon({ flip }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
}

const arrowStyle = {
  position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(var(--border-rgb),0.18)',
  background: 'var(--surface)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

export default function Marquee() {
  const [active, setActive] = useState(0);
  const [fadedOut, setFadedOut] = useState(false);
  const current = MARQUEE[active];
  const touchStartX = useRef(null);
  const pendingIndex = useRef(null);

  const goTo = (i) => {
    if (i === active || fadedOut) return;
    pendingIndex.current = i;
    setFadedOut(true);
  };
  const handleFadeTransitionEnd = () => {
    if (!fadedOut || pendingIndex.current === null) return;
    setActive(pendingIndex.current);
    pendingIndex.current = null;
    setFadedOut(false);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD) goTo((active - 1 + MARQUEE.length) % MARQUEE.length);
    else if (delta < -SWIPE_THRESHOLD) goTo((active + 1) % MARQUEE.length);
  };

  return (
    <div style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)', padding: '28px clamp(16px, 5vw, 32px) 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-faint)', marginBottom: '14px', textAlign: 'center' }}>EXPLORE BY INTEREST</div>
        <div className="interest-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
          {MARQUEE.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(i)}
                className={`role-pill${isActive ? ' is-active' : ''}`}
                style={{
                  fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  background: isActive ? 'var(--kore-gradient)' : 'transparent',
                  border: isActive ? '1px solid transparent' : '1px solid rgba(var(--border-rgb),0.16)',
                  borderRadius: '999px', padding: '8px 16px', display: 'inline-block', cursor: 'pointer', flex: '0 0 auto',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
          <button
            type="button"
            onClick={() => goTo((active - 1 + MARQUEE.length) % MARQUEE.length)}
            aria-label="Previous interest"
            className="testimonial-arrow testimonial-arrow-prev"
            style={{ ...arrowStyle, left: '-20px' }}
          >
            <ChevronIcon />
          </button>

          <div
            className="grid-2col"
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
            onTransitionEnd={handleFadeTransitionEnd}
            style={{
              display: 'grid', gridTemplateColumns: '420px 1fr', gap: '48px', alignItems: 'center', touchAction: 'pan-y',
              opacity: fadedOut ? 0 : 1, transform: fadedOut ? 'translateY(6px)' : 'none',
              transition: 'opacity .22s ease, transform .22s ease',
            }}
          >
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', maxWidth: '420px' }}>
              <img src={current.img} alt={current.label} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '0 16px' }}>
              <div style={{ fontWeight: 800, fontSize: '26px', letterSpacing: '-0.01em', textTransform: 'capitalize', marginBottom: '14px' }}>{current.label}</div>
              <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>{current.desc}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo((active + 1) % MARQUEE.length)}
            aria-label="Next interest"
            className="testimonial-arrow testimonial-arrow-next"
            style={{ ...arrowStyle, right: '-20px' }}
          >
            <ChevronIcon flip />
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          {MARQUEE.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i === active ? 'var(--kore-gradient)' : 'var(--text-muted)',
                opacity: i === active ? 1 : 0.3,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                transform: i === active ? 'scale(1.2)' : 'scale(1)'
              }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from 'react';
import { TESTIMONIALS } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
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

export default function Testimonials() {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-orange-text)">WHAT PEOPLE SAY</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Hear it from them
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px', textAlign: 'justify' }}>
          Real people, real placements — in their own words.
        </p>

        <div style={{ position: 'relative' }}>
          <button type="button" onClick={() => scrollByPage(-1)} aria-label="Previous testimonials" className="testimonial-arrow testimonial-arrow-prev" style={{ ...arrowStyle, left: '-20px' }}>
            <ChevronIcon />
          </button>

          <div ref={trackRef} className="testimonial-track" style={{ display: 'flex', gap: '20px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i % 4} className="testimonial-card card-hover" style={{ flex: '0 0 calc(25% - 15px)', scrollSnapAlign: 'start', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '16px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Play testimonial from ${t.name}`}
                  style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '4/3', border: 'none', padding: 0, margin: 0, cursor: 'pointer', background: 'none' }}
                >
                  <img src={t.poster} alt={t.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--kore-gradient)', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PlayIcon />
                    </span>
                  </div>
                </button>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 12px', textAlign: 'justify' }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ fontWeight: 800, fontSize: '14.5px' }}>{t.name}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>{t.result}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <button type="button" onClick={() => scrollByPage(1)} aria-label="Next testimonials" className="testimonial-arrow testimonial-arrow-next" style={{ ...arrowStyle, right: '-20px' }}>
            <ChevronIcon flip />
          </button>
        </div>
      </div>

      {active !== null && (
        <div
          role="dialog" aria-modal="true"
          onClick={() => setActive(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '860px' }}>
            <video key={TESTIMONIALS[active].video} src={TESTIMONIALS[active].video} controls autoPlay style={{ width: '100%', maxHeight: '80vh', borderRadius: '12px', display: 'block', background: '#000000' }} />
            <button
              onClick={() => setActive(null)}
              aria-label="Close video"
              style={{ position: 'absolute', top: '-44px', right: 0, background: 'none', border: 'none', color: '#FFFFFF', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

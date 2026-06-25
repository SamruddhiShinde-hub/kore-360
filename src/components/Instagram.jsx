import { LINKS, IMAGES, MARQUEE, COURSES } from '../data.js';
import Reveal from './Reveal.jsx';

// Live-embedding an Instagram grid requires their API/login — not something a static
// scrape can do reliably. Reusing the site's own real photos keeps this section honest
// while linking straight through to the real profile for the actual feed.
const POSTS = [
  IMAGES.heroCentered,
  MARQUEE[0].img, MARQUEE[1].img, MARQUEE[2].img,
  MARQUEE[3].img, COURSES[0].img, COURSES[1].img, COURSES[2].img,
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function Instagram() {
  return (
    <section id="instagram" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '92px 32px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontWeight: 900, fontSize: 'clamp(30px,5vw,52px)', letterSpacing: '-0.02em', marginBottom: '16px' }}>@krishlalwaniofficial</div>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="foot-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--kore-orange-text)', marginBottom: '44px' }}>
            <InstagramIcon /> Follow on Instagram
          </a>
        </Reveal>

        <div className="ig-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '44px' }}>
          {POSTS.map((src, i) => (
            <Reveal key={i} delay={i % 4} className={i >= 4 ? 'ig-extra' : ''} style={{ aspectRatio: '1/1', borderRadius: '10px', overflow: 'hidden' }}>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                <img src={src} alt="" loading="lazy" decoding="async" className="ig-photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </a>
            </Reveal>
          ))}
        </div>

        <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '14px 32px', borderRadius: '999px' }}>
          Follow on IG
        </a>
      </div>
    </section>
  );
}

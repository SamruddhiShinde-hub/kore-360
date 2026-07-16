import Reveal from './Reveal.jsx';

// Same background plate as the homepage hero (see Hero.jsx) — served from public/
// so the path is a stable string, not a hashed src/assets import.
const mainHeroBg = '/hero-bg-desktop.webp';
const mainHeroBgMobile = '/hero-bg-mobile.webp';

const eyebrowStyle = { fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' };

// Always-dark banner (independent of the light/dark theme toggle) so it reads consistently
// with the hero, and so the nav's forced-white link styling stays legible underneath it.
export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <picture>
        <source media="(max-width: 768px)" srcSet={mainHeroBgMobile} />
        <img src={mainHeroBg} alt="" aria-hidden="true" style={{ position: 'absolute', inset: '-40px', width: 'calc(100% + 80px)', height: 'calc(100% + 80px)', objectFit: 'cover', display: 'block', zIndex: 0 }} />
      </picture>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.75) 100%)', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
        <Reveal>
          <div style={{ ...eyebrowStyle, marginBottom: '20px' }}>{eyebrow}</div>
          <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(38px,6vw,76px)', color: '#FFFFFF', margin: '0 0 18px' }}>{title}</h1>
          <p style={{ fontSize: '17.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0, textAlign: 'justify' }}>{intro}</p>
        </Reveal>
      </div>
    </div>
  );
}

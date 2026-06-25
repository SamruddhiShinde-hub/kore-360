import Reveal from './Reveal.jsx';

const eyebrowStyle = { fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' };

// Always-dark banner (independent of the light/dark theme toggle) so it reads consistently
// with the hero, and so the nav's forced-white link styling stays legible underneath it.
export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1a0410 0%, #120303 55%, #000000 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
        <Reveal>
          <div style={{ ...eyebrowStyle, marginBottom: '20px' }}>{eyebrow}</div>
          <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(38px,6vw,76px)', color: '#FFFFFF', margin: '0 0 18px' }}>{title}</h1>
          <p style={{ fontSize: '17.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0 }}>{intro}</p>
        </Reveal>
      </div>
    </div>
  );
}

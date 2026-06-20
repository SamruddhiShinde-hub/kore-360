import { useRef, useEffect } from 'react';
import { HERO, HERO_VARIANT, LINKS, IMAGES } from '../data.js';
import Reveal from './Reveal.jsx';

const eyebrow = { fontSize: '13px', letterSpacing: '0.18em', backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' };
const btnAccent = { display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' };

function HeadingBreaks({ lines }) {
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function HeroSplit() {
  return (
    <div
      className="grid-2col"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 32px 96px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: '56px', alignItems: 'center' }}
    >
      <Reveal>
        <div style={{ ...eyebrow, marginBottom: '22px' }}>{HERO.eyebrow}</div>
        <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.9, fontSize: 'clamp(48px,7.2vw,108px)', margin: '0 0 24px' }}>
          <HeadingBreaks lines={HERO.headlineLines} />
        </h1>
        <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '480px', margin: '0 0 34px' }}>{HERO.blurb}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <a href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>
          <a href={LINKS.ebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--text)', background: 'transparent', border: '1px solid rgba(var(--border-rgb),0.22)', padding: '15px 26px', borderRadius: '8px' }}>{HERO.secondaryCta}</a>
        </div>
      </Reveal>
      <Reveal delay={1} style={{ position: 'relative' }}>
        <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(var(--border-rgb),0.10)' }}>
          <img src={IMAGES.heroSplit} alt="Krish Lalwani" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', top: '18px', right: '-14px', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.12)', borderRadius: '10px', padding: '12px 16px', boxShadow: '0 18px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ fontWeight: 900, fontSize: '26px', color: 'var(--kore-orange-text)' }}>100+</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>placed in sports</div>
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: '-16px', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.12)', borderRadius: '10px', padding: '12px 16px', boxShadow: '0 18px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ fontWeight: 900, fontSize: '26px', color: 'var(--text)' }}>60+</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>1:1 calls taken</div>
        </div>
      </Reveal>
    </div>
  );
}

function HeroCentered() {
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        img.style.transform = `scale(1.2) translateY(${y * 0.12}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '86vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '96px 32px 72px', overflow: 'hidden' }}>
      <img ref={imgRef} src={IMAGES.heroCentered} alt="" fetchPriority="high" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.2)', transformOrigin: 'center', willChange: 'transform' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(var(--surface-rgb),0.72) 0%,rgba(var(--surface-rgb),0.64) 42%,rgba(var(--surface-rgb),0.94) 100%)' }} />
      <Reveal style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1040px' }}>
        <div style={{ ...eyebrow, marginBottom: '24px' }}>{HERO.eyebrow}</div>
        <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.88, fontSize: 'clamp(52px,10vw,150px)', margin: '0 0 26px', color: 'var(--text)', textShadow: '0 4px 40px rgba(var(--surface-rgb),0.5)' }}>
          <HeadingBreaks lines={HERO.headlineLines} />
        </h1>
        <p style={{ fontSize: 'clamp(16px,1.5vw,21px)', lineHeight: 1.55, color: 'var(--text)', maxWidth: '620px', margin: '0 auto 34px' }}>{HERO.blurb}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <a href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>
          <a href={LINKS.ebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.35)', background: 'rgba(var(--surface-rgb),0.3)', padding: '15px 26px', borderRadius: '8px' }}>{HERO.secondaryCta}</a>
        </div>
      </Reveal>
      <Reveal delay={1} style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '52px' }}>
        {HERO.stats.map((s, i) => (
          <div key={i} style={{ background: 'rgba(var(--surface-rgb),0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '10px', padding: '14px 24px', textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: '28px', color: i === 0 ? 'var(--kore-magenta)' : i === 2 ? 'var(--kore-orange-text)' : 'var(--text)' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

function HeroEditorial() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(var(--border-rgb),0.12)', paddingBottom: '18px', marginBottom: '40px' }}>
        <div style={{ fontSize: '13px', letterSpacing: '0.16em', backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>01 — KORE 360</div>
        <div style={{ fontSize: '13px', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>SPORTS MANAGEMENT</div>
      </div>
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'end' }}>
        <Reveal>
          <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 0.86, fontSize: 'clamp(50px,8.5vw,128px)', margin: '0 0 28px' }}>
            Get<br />inside<br />the game.
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.4vw,20px)', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '520px', margin: '0 0 30px' }}>{HERO.blurb}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <a href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>
            <a href={LINKS.ebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.22)', padding: '15px 26px', borderRadius: '8px' }}>{HERO.secondaryCta}</a>
          </div>
        </Reveal>
        <Reveal delay={1} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(var(--border-rgb),0.10)' }}>
          <img src={IMAGES.heroEditorial} alt="Krish Lalwani" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Reveal>
      </div>
    </div>
  );
}

export default function Hero() {
  let content;
  if (HERO_VARIANT === 'split') content = <HeroSplit />;
  else if (HERO_VARIANT === 'editorial') content = <HeroEditorial />;
  else content = <HeroCentered />;

  return (
    <section style={{ position: 'relative', borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
      {content}
    </section>
  );
}

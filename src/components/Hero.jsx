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

  const words = HERO.headlineLines[0].split(' ');
  const accentPhrase = HERO.headlineLines.slice(1).join(' ');

  return (
    <div className="hero-shell" style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', padding: '96px 32px 64px', overflow: 'hidden' }}>
      <img ref={imgRef} src={IMAGES.heroCentered} alt="" className="hero-bg-desktop" fetchPriority="high" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.2)', transformOrigin: 'center', willChange: 'transform' }} />
      <img src={IMAGES.heroMobile} alt="" className="hero-bg-mobile" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'none' }} />
      <div className="hero-scrim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 100%)' }} />
      <Reveal className="hero-copy" style={{ position: 'relative', zIndex: 2, textAlign: 'left', maxWidth: '1040px' }}>
        <h1 className="hero-heading" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.88, fontSize: 'clamp(28px,5.6vw,76px)', margin: '0 0 22px', color: '#FFFFFF', whiteSpace: 'nowrap', textAlign: 'left' }}>
          {words.map((w, i) => (
            <span className="hero-heading-word" key={i}>{w} </span>
          ))}
          <span className="hero-heading-word hero-heading-accent">{accentPhrase}</span>
        </h1>
        <p className="hero-blurb" style={{ fontSize: 'clamp(16px,1.5vw,21px)', lineHeight: 1.55, color: '#FFFFFF', maxWidth: '620px', margin: '0 0 30px' }}>{HERO.blurb}</p>
        <div className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'flex-start' }}>
          <a href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>
          <a href={LINKS.ebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.5)', background: 'rgba(var(--surface-rgb),0.55)', padding: '15px 26px', borderRadius: '8px' }}>{HERO.secondaryCta}</a>
        </div>
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

import { useRef, useEffect } from 'react';
import { HERO, HERO_VARIANT, IMAGES } from '../data.js';
import Reveal from './Reveal.jsx';
import mainHeroBg from '../assets/main-hero-background.webp';
import heroVid from '../assets/hero-vid.mp4';
const eyebrow = { fontSize: '13px', letterSpacing: '0.18em', backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' };
const btnAccent = { display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' };

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
        <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '480px', margin: '0 0 34px', whiteSpace: 'pre-line', textAlign: 'justify' }}>{HERO.blurb}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <a href="#courses" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>        </div>
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
  return (
    <div className="hero-container" style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000'
    }}>
      <img src={mainHeroBg} alt="Hero Background" fetchpriority="high" style={{
        position: 'absolute',
        inset: '-40px',
        width: 'calc(100% + 80px)',
        height: 'calc(100% + 80px)',
        objectFit: 'cover',
        display: 'block',
        zIndex: 0
      }} />

      <div className="hero-center-box" style={{
        position: 'relative',
        zIndex: 1,
        width: '55%',
        maxWidth: '850px',
        height: '55vh',
        marginTop: '6vh'
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        >
          <source src={heroVid} type="video/mp4" />
        </video>

        <h1 style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          margin: 0,
          textAlign: 'center',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          fontSize: 'clamp(40px, 9vw, 120px)',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase'
        }}>
          Get Inside<br/>
          The Game.
        </h1>
      </div>
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
          <p style={{ fontSize: 'clamp(16px,1.4vw,20px)', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '520px', margin: '0 0 30px', whiteSpace: 'pre-line', textAlign: 'justify' }}>{HERO.blurb}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <a href="#courses" className="btn-accent" style={btnAccent}>{HERO.primaryCta}</a>
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

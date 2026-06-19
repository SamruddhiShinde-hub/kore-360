import { LINKS, IMAGES } from '../data.js';
import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <section id="about" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="grid-2col" style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px', display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '56px', alignItems: 'center' }}>
        <Reveal style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)' }}>
          <img src={IMAGES.about} alt="Cricket stadium with fans" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Reveal>
        <Reveal>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: '16px' }}>MEET KRISH</div>
          <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(32px,4vw,52px)', margin: '0 0 20px' }}>Your guide into the sports industry</h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#b9c4bb', maxWidth: '560px', margin: '0 0 28px' }}>Krish Lalwani is a sports management mentor with 5+ years in the industry. Through Kore 360 he's taken 60+ one-on-one calls and helped 100+ people break into sport — across teams, agencies, leagues and events. If you want in, he'll show you the way.</p>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <div><div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '38px', color: 'var(--accent)' }}>5+</div><div style={{ fontSize: '13px', color: '#9aa89c' }}>Years in industry</div></div>
            <div><div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '38px' }}>60+</div><div style={{ fontSize: '13px', color: '#9aa89c' }}>1:1 calls taken</div></div>
            <div><div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '38px', color: 'var(--accent)' }}>100+</div><div style={{ fontSize: '13px', color: '#9aa89c' }}>Placed in sports</div></div>
          </div>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '15px', fontWeight: 700, color: '#eef2ee', border: '1px solid rgba(255,255,255,0.22)', padding: '12px 20px', borderRadius: '8px' }}>Follow @krishlalwaniofficial →</a>
        </Reveal>
      </div>
    </section>
  );
}

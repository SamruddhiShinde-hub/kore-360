import { CAREERS, LINKS } from '../data.js';
import Reveal from './Reveal.jsx';

const CARD_COLORS = ['var(--kore-purple)', 'var(--kore-magenta)', 'var(--kore-pink)', 'var(--kore-orange)'];

export default function Careers() {
  return (
    <section id="careers" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <div style={{ fontSize: '13px', letterSpacing: '0.16em', color: 'var(--kore-magenta)', marginBottom: '16px' }}>03 — CAREERS</div>
        <h2 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(34px,4.5vw,60px)', margin: '0 0 14px' }}>
          Get hired in sports
        </h2>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: '#A0A0A0', maxWidth: '560px', margin: '0 0 48px' }}>
          Pick your track, fill the form, and you're in front of the right people.
        </p>
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px', marginBottom: '20px' }}>
          {CAREERS.map((k, i) => (
            <div key={i} className="card-hover" style={{ display: 'flex', flexDirection: 'column', background: '#000000', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '30px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: CARD_COLORS[i % CARD_COLORS.length], marginBottom: '16px' }}>{k.tag}</div>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '30px', letterSpacing: '-0.01em', marginBottom: '12px' }}>{k.role}</div>
              <p style={{ fontSize: '15px', lineHeight: 1.55, color: '#A0A0A0', margin: '0 0 26px', flex: 1 }}>{k.desc}</p>
              <a href={k.href} target="_blank" rel="noreferrer" className="btn-accent" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '13px 22px', borderRadius: '8px' }}>{k.cta} →</a>
            </div>
          ))}
        </Reveal>
        <Reveal className="grid-2col" style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '34px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.01em', marginBottom: '10px' }}>Not ready to apply? Join the talent pool.</div>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: '#A0A0A0', margin: 0 }}>Drop your resume and we'll reach out when the right internship or job opens up. No spam — just real opportunities in sport.</p>
          </div>
          <a href={LINKS.resume} target="_blank" rel="noreferrer" className="resume-drop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', textAlign: 'center', border: '2px dashed rgba(183,30,96,0.4)', borderRadius: '12px', padding: '30px 20px', background: 'rgba(183,30,96,0.04)', color: '#FFFFFF' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--kore-magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kore-magenta)', fontSize: '22px', fontWeight: 700 }}>↥</div>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>Submit your resume</div>
            <div style={{ fontSize: '11px', color: '#A0A0A0' }}>PDF or DOC · we'll be in touch</div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

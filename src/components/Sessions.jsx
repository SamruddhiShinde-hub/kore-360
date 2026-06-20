import { SESSIONS } from '../data.js';
import Reveal from './Reveal.jsx';

const eyebrow = { fontSize: '13px', letterSpacing: '0.16em', color: 'var(--kore-pink)', marginBottom: '16px' };
const CARD_COLORS = ['var(--kore-purple)', 'var(--kore-magenta)', 'var(--kore-pink)', 'var(--kore-orange)'];

export default function Sessions() {
  return (
    <section id="sessions" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <div style={eyebrow}>01 — WORK WITH KRISH</div>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(34px,4.5vw,60px)', margin: '0 0 14px' }}>
          Pick how you learn
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: '#A0A0A0', maxWidth: '560px', margin: '0 0 48px' }}>
          From a ₹99 read to a 1:1 game plan — start wherever you are.
        </p>
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: '18px' }}>
          {SESSIONS.map((s, i) => (
            <div key={i} className="session-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: '#000000', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '26px', minHeight: '340px' }}>
              {s.featured && (
                <div style={{ position: 'absolute', top: '-1px', right: '18px', background: 'var(--kore-gradient)', color: '#000000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 9px', borderRadius: '0 0 6px 6px' }}>
                  MOST BOOKED
                </div>
              )}
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: CARD_COLORS[i % CARD_COLORS.length], marginBottom: '18px' }}>{s.tag}</div>
              <div style={{ fontWeight: 800, fontSize: '23px', letterSpacing: '-0.01em', marginBottom: '6px' }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: '#A0A0A0', marginBottom: '16px' }}>{s.meta}</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.5, color: '#A0A0A0', margin: '0 0 22px', flex: 1 }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ fontWeight: 900, fontSize: '30px', color: '#FFFFFF' }}>{s.price}</div>
              </div>
              <a href={s.href} target="_blank" rel="noreferrer" className="btn-accent" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '13px 18px', borderRadius: '8px' }}>
                {s.cta}
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

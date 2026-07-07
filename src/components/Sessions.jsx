import { SESSIONS } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)', 'var(--kore-orange-text)', 'var(--kore-magenta-text)'];

export default function Sessions() {
  return (
    <section id="sessions" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-orange-text)">01 — WORK WITH KRISH</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Pick how you learn
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px', textAlign: 'justify' }}>
          From a ₹99 read to a 1:1 game plan: start wherever you are.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: '18px' }}>
          {SESSIONS.map((s, i) => (
            <Reveal key={i} delay={i} className="session-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '14px', padding: '26px', minHeight: '340px' }}>
              {s.featured && (
                <div style={{ position: 'absolute', top: '-1px', right: '18px', background: 'var(--kore-gradient)', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 9px', borderRadius: '0 0 6px 6px' }}>
                  MOST BOOKED
                </div>
              )}
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: CARD_COLORS[i % CARD_COLORS.length], marginBottom: '18px' }}>{s.tag}</div>
              <div style={{ fontWeight: 800, fontSize: '23px', letterSpacing: '-0.01em', marginBottom: '12px' }}>{s.name}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {s.meta.split('·').map((part) => (
                  <li key={part} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    <span style={{ color: CARD_COLORS[i % CARD_COLORS.length], fontWeight: 900 }}>✓</span>{part.trim()}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '14.5px', lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px', flex: 1, textAlign: 'justify' }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ fontWeight: 900, fontSize: '30px', color: 'var(--text)' }}>{s.price}</div>
              </div>
              <a href={s.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-orange)', padding: '13px 18px', borderRadius: '8px' }}>
                {s.cta}
              </a>
            </Reveal>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-faint)', margin: '20px 0 0' }}>No job or placement is guaranteed. These sessions provide guidance and mentorship, not employment.</p>
      </div>
    </section>
  );
}

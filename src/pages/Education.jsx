import { SESSIONS, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)', 'var(--kore-orange-text)', 'var(--kore-magenta-text)'];

const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };

export default function Education() {
  return (
    <>
      <PageHeader
        eyebrow="EDUCATION"
        title="Learn how the industry actually works"
        intro="From a ₹99 read to a 1:1 game plan with Krish — four ways to get the real picture of how sports management hiring actually works, in as much or as little time as you've got."
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 32px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SESSIONS.map((s, i) => {
            const accent = CARD_COLORS[i % CARD_COLORS.length];
            const d = s.details;
            return (
              <Reveal
                key={i} delay={i} className="card-hover"
                style={{ position: 'relative', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '28px', overflow: 'hidden' }}
              >
                {s.featured && (
                  <div style={{ position: 'absolute', top: '-1px', right: '24px', background: 'var(--kore-gradient)', color: '#000000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 9px', borderRadius: '0 0 6px 6px' }}>
                    MOST BOOKED
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: accent, fontWeight: 700 }}>{s.tag}</div>
                  <div style={{ fontWeight: 900, fontSize: '26px', color: 'var(--text)', lineHeight: 1, flex: 'none' }}>{s.price}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>{s.meta}</div>

                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 0 24px', textAlign: 'justify' }}>{s.desc}</p>

                <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', background: 'rgba(var(--border-rgb),0.03)', border: '1px solid rgba(var(--border-rgb),0.08)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <div>
                    <div style={labelStyle}>FORMAT</div>
                    <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text)', margin: '0 0 16px', textAlign: 'justify' }}>{d.format}</p>
                    <div style={labelStyle}>WHO IT'S FOR</div>
                    <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text)', margin: 0, textAlign: 'justify' }}>{d.whoFor}</p>
                  </div>
                  <div className="education-included">
                    <div style={labelStyle}>WHAT'S INCLUDED</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {d.includes.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '14px', lineHeight: 1.5, color: 'var(--text)' }}>
                          <span style={{ color: accent, fontWeight: 900, flex: 'none' }}>✓</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p style={{ fontSize: '14.5px', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: `2px solid ${accent}`, paddingLeft: '14px', margin: '0 0 26px', textAlign: 'justify' }}>{d.outcome}</p>

                <a href={s.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '13px 22px', borderRadius: '8px' }}>
                  {s.cta} →
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal style={{ marginTop: '12px', textAlign: 'center', borderTop: '1px solid rgba(var(--border-rgb),0.08)', paddingTop: '40px' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: '0 0 18px', textAlign: 'justify' }}>Not sure which one to start with? The clarity call is the most personal — the e-book is the cheapest way to find out if this industry is for you.</p>
          <a href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>Book a 1:1 clarity call →</a>
        </Reveal>
      </div>
    </>
  );
}

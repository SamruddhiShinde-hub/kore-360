import { COURSES } from '../data.js';
import Reveal from './Reveal.jsx';

const CARD_COLORS = [
  { text: 'var(--kore-orange)', border: 'rgba(240,81,35,0.35)' },
  { text: 'var(--kore-magenta)', border: 'rgba(183,30,96,0.35)' },
  { text: 'var(--kore-orange)', border: 'rgba(240,81,35,0.35)' },
];

export default function Courses() {
  return (
    <section id="courses" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <div style={{ fontSize: '13px', letterSpacing: '0.16em', color: 'var(--kore-magenta)', marginBottom: '16px' }}>02 — COURSES</div>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(34px,4.5vw,60px)', margin: '0 0 14px' }}>
          Go deeper with a course
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px' }}>
          Structured, self-paced programs that take you from curious to career-ready.
        </p>
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '20px' }}>
          {COURSES.map((c, i) => (
            <div key={i} className="card-hover" style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', fontSize: '10px', letterSpacing: '0.1em', color: CARD_COLORS[i % CARD_COLORS.length].text, border: `1px solid ${CARD_COLORS[i % CARD_COLORS.length].border}`, padding: '4px 8px', borderRadius: '5px', marginBottom: '16px' }}>{c.level}</div>
                <div style={{ fontWeight: 800, fontSize: '21px', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '10px' }}>{c.name}</div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px', flex: 1 }}>{c.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ fontWeight: 900, fontSize: '24px' }}>{c.price}</div>
                  <a href={c.href} target="_blank" rel="noreferrer" className="btn-accent" style={{ fontSize: '14px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '11px 18px', borderRadius: '8px' }}>Enroll</a>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

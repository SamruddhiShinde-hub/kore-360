import { COURSES } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';

const ACCENTS = ['var(--kore-gradient)', 'var(--kore-magenta)', 'var(--kore-orange)'];
const BADGE_BG = ['var(--kore-orange)', 'var(--kore-magenta)', 'var(--kore-orange)'];
const BADGE_TEXT = ['#000000', '#FFFFFF', '#000000'];

export default function Courses() {
  return (
    <section id="courses" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-magenta-text)">02 — COURSES</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Go deeper with a course
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px', textAlign: 'justify' }}>
          Structured, self-paced programs that take you from curious to career-ready.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
          {COURSES.map((c, i) => (
            <Reveal
              key={i} delay={i} className="course-card card-hover"
              style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '480px' }}
            >
              <img src={c.img} alt={c.name} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.92) 100%)' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 900, fontSize: '38px', color: '#FFFFFF', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '20px', background: BADGE_BG[i % BADGE_BG.length], color: BADGE_TEXT[i % BADGE_TEXT.length] }}>{c.level}</div>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ width: '28px', height: '3px', background: ACCENTS[i % ACCENTS.length], marginBottom: '14px', borderRadius: '2px' }} />
                <div style={{ fontWeight: 800, fontSize: '23px', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#FFFFFF', marginBottom: '10px' }}>{c.name}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', margin: '0 0 22px', textAlign: 'justify' }}>{c.desc}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginRight: '6px' }}>from</span>
                    <span style={{ fontWeight: 900, fontSize: '21px', color: '#FFFFFF' }}>{c.price}</span>
                  </div>
                  <a href={c.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '11px 18px', borderRadius: '8px' }}>Enroll →</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

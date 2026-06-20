import { COURSES } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';

export default function Courses() {
  return (
    <section id="courses" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-magenta-text)">02 — COURSES</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Go deeper with a course
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px' }}>
          Structured, self-paced programs that take you from curious to career-ready.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {COURSES.map((c, i) => {
            // course 3 (index 2): full-width banner with centered overlay text
            if (i === 2) {
              return (
                <Reveal
                  key={i} delay={i} className="course-banner"
                  style={{
                    position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '320px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  }}
                >
                  <img src={c.img} alt={c.name} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(var(--surface-rgb),0.45) 0%, rgba(var(--surface-rgb),0.9) 100%)' }} />
                  <div style={{ position: 'relative', zIndex: 1, padding: '40px', maxWidth: '520px' }}>
                    <div style={{ display: 'inline-flex', fontSize: '10px', letterSpacing: '0.1em', color: '#000000', background: 'var(--kore-orange)', padding: '4px 10px', borderRadius: '5px', marginBottom: '16px', fontWeight: 700 }}>{c.level}</div>
                    <div style={{ fontWeight: 900, fontSize: '28px', marginBottom: '10px', color: 'var(--text)' }}>{c.name}</div>
                    <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px' }}>{c.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <div style={{ fontWeight: 900, fontSize: '24px', color: 'var(--text)' }}>{c.price}</div>
                      <a href={c.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ fontSize: '14px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '11px 18px', borderRadius: '8px' }}>Enroll</a>
                    </div>
                  </div>
                </Reveal>
              );
            }

            // course 1 (index 0): image left, text right, gradient accent
            // course 2 (index 1): text left, image right, magenta accent
            const reversed = i === 1;
            const accent = reversed ? 'var(--kore-magenta)' : 'var(--kore-gradient)';
            const badgeColor = reversed ? 'var(--kore-magenta-text)' : 'var(--kore-orange-text)';
            return (
              <Reveal
                key={i} delay={i} className="course-row card-hover"
                style={{
                  position: 'relative', display: 'flex', flexDirection: reversed ? 'row-reverse' : 'row',
                  background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)',
                  borderRadius: '16px', overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: accent }} />
                <div className="course-image" style={{ flex: '1 1 42%', minHeight: '260px', overflow: 'hidden' }}>
                  <img src={c.img} alt={c.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ flex: '1 1 58%', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: badgeColor, marginBottom: '16px', fontWeight: 700 }}>{c.level}</div>
                  <div style={{ fontWeight: 800, fontSize: '24px', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '10px' }}>{c.name}</div>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px' }}>{c.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>{c.price}</div>
                    <a href={c.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ fontSize: '14px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '11px 18px', borderRadius: '8px' }}>Enroll</a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

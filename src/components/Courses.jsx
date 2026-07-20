import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';
import { openConnectPopup } from './ConnectPopup.jsx';
import { track } from '../lib/analytics.js';

const ACCENTS = ['var(--kore-gradient)', 'var(--kore-magenta)', 'var(--kore-orange)'];

function GraduationCapIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

export default function Courses() {
  return (
    <section id="courses" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-magenta-text)">02 — COURSES</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Go deeper with a course
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 48px', textAlign: 'justify' }}>
          Structured, self-paced programs that take you from curious to career-ready — currently in the works.
        </p>

        <Reveal
          style={{
            position: 'relative', overflow: 'hidden', borderRadius: '20px',
            border: '1px solid rgba(var(--border-rgb),0.12)', background: 'rgba(var(--border-rgb),0.035)',
            padding: 'clamp(40px,6vw,72px) clamp(24px,5vw,56px)',
            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '-120px', left: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'var(--kore-magenta)', opacity: 0.18, filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', bottom: '-140px', right: '-100px', width: '320px', height: '320px', borderRadius: '50%', background: 'var(--kore-orange)', opacity: 0.16, filter: 'blur(80px)' }} />

          <div style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '18px', background: 'var(--kore-gradient)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '26px', boxShadow: '0 18px 40px rgba(0,0,0,0.35)' }}>
            <GraduationCapIcon />
          </div>

          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--kore-orange-text)', marginBottom: '18px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--kore-orange)', boxShadow: '0 0 0 4px rgba(var(--border-rgb),0.12)' }} />
            COMING SOON
          </div>

          <div style={{ position: 'relative', fontWeight: 900, fontSize: 'clamp(24px,3.2vw,34px)', letterSpacing: '-0.01em', lineHeight: 1.15, maxWidth: '620px', marginBottom: '14px' }}>
            Stay tuned — the courses are being built right now.
          </div>
          <p style={{ position: 'relative', fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '480px', margin: '0 0 30px', textAlign: 'center' }}>
            We're putting together structured, career-ready programs. Leave your details and we'll let you know the moment they're live.
          </p>

          <button
            type="button"
            onClick={() => { track('waitlist_signup_click', { content_type: 'courses' }); openConnectPopup(); }}
            className="btn-accent"
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '14px 26px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '30px' }}
          >
            Notify me when it's live →
          </button>

          <div style={{ position: 'relative', display: 'flex', gap: '10px' }}>
            {ACCENTS.map((accent, i) => (
              <span key={i} style={{ width: '28px', height: '4px', borderRadius: '2px', background: accent }} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { SESSIONS, IMAGES, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageMeta from '../components/PageMeta.jsx';

const WEBINAR = SESSIONS.find((s) => s.sessionId === 'webinar');
const ACCENT = 'var(--kore-orange-text)';

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" /><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.36-1.36" />
    </svg>
  );
}
const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };

const WHATS_INCLUDED = [
  '60 minutes live with Krish',
  'Open Q&A — your questions, answered directly',
  'A clear picture of how this industry really works',
];

export default function LiveWebinar() {
  const [copied, setCopied] = useState(false);
  const [booking, setBooking] = useState('idle'); // idle | redirecting | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — no-op
    }
  };

  const handleBookSeat = async () => {
    setErrorMsg('');
    setBooking('redirecting');
    try {
      const res = await fetch('/api/create-webinar-payment-link', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start payment.');
      window.location.href = data.url;
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setBooking('idle');
    }
  };

  return (
    <>
      <PageMeta
        title="Behind the Field with Krish Lalwani"
        description="Every match you watch runs on departments most people never see. Join Krish Lalwani live for a behind-the-field look at how the sports industry actually hires."
        path="/live-webinar"
      />

      <div style={{ position: 'relative', overflow: 'hidden', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" />
          <img src="/hero-bg-desktop.webp" alt="" aria-hidden="true" style={{ position: 'absolute', inset: '-40px', width: 'calc(100% + 80px)', height: 'calc(100% + 80px)', objectFit: 'cover', display: 'block', zIndex: 0 }} />
        </picture>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.75) 100%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: '40px', alignItems: 'end' }} className="grid-2col">
          <Reveal>
            <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>LIVE WEBINAR</div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(30px,4.6vw,52px)', color: '#FFFFFF', margin: '0 0 18px' }}>
              Behind the Field with Krish Lalwani
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: 0, textAlign: 'justify' }}>{WEBINAR.desc}</p>
          </Reveal>
          <Reveal delay={1} style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src={IMAGES.heroCentered} alt="Krish Lalwani" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Reveal>
        </div>
        <div style={{ position: 'relative', zIndex: 1, height: '40px' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 96px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '48px', alignItems: 'start' }} className="grid-2col">
        <div>
          <div style={labelStyle}>ABOUT THE EVENT</div>
          <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.01em', margin: '0 0 16px' }}>The Sports Industry. Unlocked.</div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text)', margin: '0 0 18px', textAlign: 'justify' }}>
            Every match you watch runs on departments most people never see. This session takes you behind the field, what keeps the game alive, and exactly how to get your first foot inside it.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text)', margin: '0 0 32px', textAlign: 'justify' }}>
            In 60 minutes I'll walk you through how this industry actually works, which roles exist across every department, and the entry paths that work for different backgrounds. No textbook theory. What I've seen across 500+ matches and 20+ leagues.
          </p>

          <div style={labelStyle}>EVERYONE WHO REGISTERS GETS</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {WHATS_INCLUDED.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '15px', lineHeight: 1.5, color: 'var(--text)' }}>
                <span style={{ color: ACCENT, fontWeight: 900, flex: 'none' }}>✓</span>{item}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 12px', textAlign: 'justify' }}>
            This is for you if you're a student figuring out direction, working and want to move into sports, or simply curious about what goes on behind every match.
          </p>
          <p style={{ fontSize: '14.5px', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: `2px solid ${ACCENT}`, paddingLeft: '14px', margin: '0 0 44px' }}>
            No prior experience needed. Open to all backgrounds.
          </p>

          <div style={{ borderTop: '1px solid rgba(var(--border-rgb),0.1)', paddingTop: '32px' }}>
            <div style={labelStyle}>YOUR HOST</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img src={IMAGES.heroCentered} alt="Krish Lalwani" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '16px' }}>Krish Lalwani</div>
                <a href={LINKS.instagram} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: ACCENT, fontWeight: 600 }}>@krishlalwaniofficial</a>
              </div>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '560px', margin: 0, textAlign: 'justify' }}>
              Want to work in sports? I help you build your roadmap. Book a session and take your first step.
            </p>
          </div>
        </div>

        <div className="desktop-sticky-card" style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: ACCENT, flex: 'none', marginTop: '2px' }}><CalendarIcon /></span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{WEBINAR.eventDate}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{WEBINAR.eventTime}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: ACCENT, flex: 'none' }}><VideoIcon /></span>
              <div style={{ fontWeight: 700, fontSize: '14.5px' }}>Virtual (Google Meet)</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: ACCENT, flex: 'none' }}><TicketIcon /></span>
              <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{WEBINAR.price}</div>
            </div>
            <div style={{ background: 'rgba(var(--border-rgb),0.06)', borderRadius: '8px', padding: '10px 14px', fontSize: '13.5px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
              Limited seats · Session 02
            </div>
            <div className="sticky-cta-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {errorMsg && <div style={{ fontSize: '13px', color: 'var(--kore-orange-text)', textAlign: 'center' }}>{errorMsg}</div>}
              <button
                type="button"
                disabled={booking === 'redirecting'}
                onClick={handleBookSeat}
                className="btn-accent"
                style={{ width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '14px 22px', borderRadius: '8px', cursor: booking === 'redirecting' ? 'default' : 'pointer', opacity: booking === 'redirecting' ? 0.7 : 1 }}
              >
                {booking === 'redirecting' ? 'Taking you to payment…' : `${WEBINAR.cta} — ${WEBINAR.price}`}
              </button>
            </div>
          </div>

          <div>
            <div style={labelStyle}>INVITE YOUR NETWORK</div>
            <button
              type="button"
              onClick={handleCopyLink}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--text)', background: 'transparent', border: '1px solid rgba(var(--border-rgb),0.16)', padding: '13px 18px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <LinkIcon /> {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SESSIONS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';
import BookingModal from '../components/BookingModal.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)', 'var(--kore-orange-text)', 'var(--kore-magenta-text)'];
const DEDICATED_PAGES = { webinar: '/live-webinar', clarity: '/clarity-call', ebook: '/ebook', qna: '/qa-call' };

export default function Education() {
  const [booking, setBooking] = useState(null);

  return (
    <>
      <PageMeta
        title="Education: E-Book, Webinar, Q&A and Clarity Calls"
        description="Learn how sports management hiring actually works, from a ₹99 e-book to a 1:1 clarity call with Krish Lalwani. Pick the format that fits how you learn."
        path="/education"
      />
      <PageHeader
        eyebrow="EDUCATION"
        title="Learn how the industry actually works"
        intro="From a ₹99 read to a 1:1 game plan with Krish: four ways to get the real picture of how sports management hiring actually works, in as much or as little time as you've got."
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px 96px' }}>
        <div className="education-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {SESSIONS.map((s, i) => {
            const accent = CARD_COLORS[i % CARD_COLORS.length];
            const shortMeta = s.meta.split('·').slice(0, 2).join(' · ');
            return (
              <Reveal
                key={i} delay={i} className="card-hover education-card"
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '20px', overflow: 'hidden' }}
              >
                {s.featured && (
                  <div style={{ position: 'absolute', top: '-1px', right: '18px', background: 'var(--kore-gradient)', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 8px', borderRadius: '0 0 6px 6px' }}>
                    MOST BOOKED
                  </div>
                )}
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: accent, fontWeight: 700, marginBottom: '10px' }}>{s.tag}</div>
                <div className="education-card-name" style={{ fontWeight: 800, fontSize: '19px', letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.name}</div>
                <div className="education-card-meta" style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>{shortMeta}</div>

                <p className="education-card-desc" style={{ fontSize: '13px', lineHeight: 1.45, color: 'var(--text-muted)', margin: '0 0 14px', flex: 1 }}>{s.desc}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <div className="education-card-price" style={{ fontWeight: 900, fontSize: '20px', color: 'var(--text)', lineHeight: 1 }}>{s.price}</div>
                  {DEDICATED_PAGES[s.sessionId] ? (
                    <Link
                      to={DEDICATED_PAGES[s.sessionId]}
                      className="btn-tertiary education-card-cta"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-orange)', padding: '9px 14px', borderRadius: '7px', whiteSpace: 'nowrap' }}
                    >
                      {s.cta}
                    </Link>
                  ) : s.sessionId ? (
                    <button
                      type="button"
                      onClick={() => setBooking(s)}
                      className="btn-tertiary education-card-cta"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-orange)', padding: '9px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                    >
                      {s.cta}
                    </button>
                  ) : (
                    <a href={s.href} target="_blank" rel="noreferrer" className="btn-tertiary education-card-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-orange)', padding: '9px 14px', borderRadius: '7px', whiteSpace: 'nowrap' }}>
                      {s.cta}
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {booking && (
          <BookingModal
            sessionId={booking.sessionId}
            sessionName={booking.name}
            price={booking.price}
            onClose={() => setBooking(null)}
          />
        )}

        <Reveal style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid rgba(var(--border-rgb),0.08)', paddingTop: '32px' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: '0 0 18px' }}>Not sure which one to start with? The clarity call is the most personal option, and the e-book is the cheapest way to find out if this industry is for you.</p>
          <Link to="/clarity-call" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>Talk to Krish 1:1 →</Link>
        </Reveal>
      </div>
    </>
  );
}

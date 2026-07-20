import { useEffect, useRef, useState } from 'react';
import { SESSIONS, IMAGES, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageMeta from '../components/PageMeta.jsx';
import BookingModal from '../components/BookingModal.jsx';
import SlotPicker from '../components/SlotPicker.jsx';
import { track, priceToNumber } from '../lib/analytics.js';

const CLARITY = SESSIONS.find((s) => s.sessionId === 'clarity');
const ACCENT = 'var(--kore-orange-text)';

const REVIEW_TAGS = [
  { label: 'Value for money', count: 3 },
  { label: 'Great guidance', count: 3 },
  { label: 'Helpful', count: 2 },
  { label: 'Informative', count: 1 },
];

// Real testimonials supplied for this page — not invented.
const TESTIMONIALS = [
  { name: 'Rohit', location: 'Mumbai', tag: 'Career switcher', quote: 'Got real clarity on how to start in sports. Before this I was confused, now I know my next 2-3 steps clearly' },
  { name: 'Shreyas', location: 'Pune', tag: 'Career switcher', quote: "Not generic advice at all. Everything was practical and based on real experience. Helped me understand how th…" },
  { name: 'Anmol', location: '', tag: 'Student', quote: 'I was overthinking a lot before the call. This session simplified things and gave me confidence to start taking action.' },
  { name: 'Yaseen', location: 'Bangalore', tag: 'Career switcher', quote: 'Best part was understanding different roles in sports. I had no idea about half of these opportunities before this' },
];

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
    </svg>
  );
}
function ArrowIcon({ dir = 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" />
    </svg>
  );
}

const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };

export default function ClarityCall() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shared, setShared] = useState(false);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    track('view_item', {
      currency: 'INR',
      value: priceToNumber(CLARITY.price),
      items: [{ item_id: CLARITY.sessionId, item_name: CLARITY.name, item_category: 'session', price: priceToNumber(CLARITY.price) }],
    });
  }, []);

  const handleShare = async () => {
    const shareData = { title: 'Career Clarity with Krish Lalwani', text: CLARITY.desc, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const scrollTestimonials = (dir) => {
    testimonialsRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <>
      <PageMeta
        title="Career Clarity with Krish"
        description={CLARITY.desc}
        path="/education/clarity-call"
      />

      <div style={{ position: 'relative', overflow: 'hidden', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" />
          <img src="/hero-bg-desktop.webp" alt="" aria-hidden="true" style={{ position: 'absolute', inset: '-40px', width: 'calc(100% + 80px)', height: 'calc(100% + 80px)', objectFit: 'cover', display: 'block', zIndex: 0 }} />
        </picture>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.75) 100%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
          <Reveal>
            <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>1:1 CALL</div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(30px,4.6vw,52px)', color: '#FFFFFF', margin: '0 0 18px' }}>
              Career Clarity with Krish
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0, textAlign: 'justify' }}>{CLARITY.desc}</p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><ClockIcon /> 30 mins</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><VideoIcon /> Google Meet</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(34,197,94,0.12)', color: '#22c55e', fontSize: '13px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
            <StarIcon /> 4.8
          </span>
          {CLARITY.featured && (
            <span style={{ background: 'rgba(var(--border-rgb),0.08)', color: ACCENT, fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>Most Popular</span>
          )}
          <span style={{ fontSize: '15px', color: 'var(--text-faint)', textDecoration: 'line-through' }}>{CLARITY.originalPrice}</span>
          <span style={{ fontWeight: 900, fontSize: '24px', color: 'var(--text)' }}>{CLARITY.price}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 32px 96px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: '48px', alignItems: 'start' }} className="grid-2col">
        <div>
          <div style={labelStyle}>ABOUT SESSION</div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text)', margin: '0 0 24px', textAlign: 'justify' }}>
            In this exclusive session, you'll engage in a direct and insightful conversation with me. It is designed to provide you with a safe space to discuss the challenges and questions you currently face. During the session, I will attentively listen to your concerns and offer a tailored approach to a solution. Book your 1:1 session now and embark on a journey of personalised support and expertise with me.
          </p>

          <button
            type="button"
            onClick={handleShare}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--text)', background: 'transparent', border: '1px solid rgba(var(--border-rgb),0.16)', padding: '11px 18px', borderRadius: '8px', cursor: 'pointer', marginBottom: '44px' }}
          >
            <ShareIcon /> {shared ? 'Link copied' : 'Share this session'}
          </button>

          <div style={{ borderTop: '1px solid rgba(var(--border-rgb),0.1)', paddingTop: '32px' }}>
            <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '16px' }}>Reviews &amp; Ratings</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              {REVIEW_TAGS.map((t) => (
                <span key={t.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(var(--border-rgb),0.06)', border: '1px solid rgba(var(--border-rgb),0.1)', fontSize: '13px', color: 'var(--text)', padding: '6px 12px', borderRadius: '999px' }}>
                  {t.label} <span style={{ color: 'var(--text-faint)' }}>{t.count}</span>
                </span>
              ))}
            </div>

            <div style={{ position: 'relative' }}>
              <div ref={testimonialsRef} style={{ display: 'flex', gap: '14px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '4px' }}>
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} style={{ flex: '0 0 auto', width: 'min(300px, 82vw)', scrollSnapAlign: 'start', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.1)', borderRadius: '12px', padding: '18px' }}>
                    <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text)', margin: '0 0 16px', textAlign: 'justify' }}>{t.quote}</p>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>{t.name}{t.location ? ` (${t.location})` : ''}<span style={{ fontWeight: 400, color: 'var(--text-faint)' }}>, {t.tag}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button type="button" onClick={() => scrollTestimonials('left')} aria-label="Previous reviews" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(var(--border-rgb),0.16)', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowIcon dir="left" /></button>
                <button type="button" onClick={() => scrollTestimonials('right')} aria-label="Next reviews" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(var(--border-rgb),0.16)', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowIcon /></button>
              </div>
            </div>
          </div>
        </div>

        <SlotPicker
          sessionId="clarity"
          onConfirm={(slot) => { setSelectedSlot(slot); setShowModal(true); }}
        />
      </div>

      {showModal && (
        <BookingModal
          sessionId="clarity"
          sessionName={CLARITY.name}
          price={CLARITY.price}
          initialSlot={selectedSlot}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

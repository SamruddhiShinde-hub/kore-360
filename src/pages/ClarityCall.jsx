import { useEffect, useMemo, useRef, useState } from 'react';
import { SESSIONS, IMAGES, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageMeta from '../components/PageMeta.jsx';
import BookingModal from '../components/BookingModal.jsx';

const CLARITY = SESSIONS.find((s) => s.sessionId === 'clarity');
const ACCENT = 'var(--kore-orange-text)';
const DAYS_WINDOW = 21;
const VISIBLE_DAYS = 5;

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
function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
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

function periodOf(iso) {
  const hourStr = new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' });
  const h = parseInt(hourStr, 10) % 24;
  if (h < 12) return 'morning';
  if (h < 16) return 'midday';
  return 'evening';
}

const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };
const todayKey = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

export default function ClarityCall() {
  const [daysData, setDaysData] = useState(null);
  const [dayWindowStart, setDayWindowStart] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('morning');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shared, setShared] = useState(false);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/availability-range?sessionId=clarity&start=${todayKey}&days=${DAYS_WINDOW}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const days = data.days || [];
        setDaysData(days);
        const firstIdx = days.findIndex((d) => d.slots.length > 0);
        if (firstIdx >= 0) {
          setSelectedDate(days[firstIdx].date);
          setDayWindowStart(Math.max(0, Math.min(firstIdx, days.length - VISIBLE_DAYS)));
        }
      })
      .catch(() => { if (!cancelled) setDaysData([]); });
    return () => { cancelled = true; };
  }, []);

  const daySlots = useMemo(() => daysData?.find((d) => d.date === selectedDate)?.slots || [], [daysData, selectedDate]);

  const buckets = useMemo(() => {
    const m = { morning: [], midday: [], evening: [] };
    daySlots.forEach((iso) => m[periodOf(iso)].push(iso));
    return m;
  }, [daySlots]);

  useEffect(() => {
    setSelectedSlot(null);
    if (buckets.morning.length) setSelectedPeriod('morning');
    else if (buckets.midday.length) setSelectedPeriod('midday');
    else if (buckets.evening.length) setSelectedPeriod('evening');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const visibleDays = daysData ? daysData.slice(dayWindowStart, dayWindowStart + VISIBLE_DAYS) : [];

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
        path="/clarity-call"
      />

      <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1a0410 0%, #120303 55%, #000000 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
          <Reveal>
            <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>1:1 CALL</div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(30px,4.6vw,52px)', color: '#FFFFFF', margin: '0 0 18px' }}>
              Career Clarity with Krish
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0, textAlign: 'justify' }}>{CLARITY.desc}</p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 96px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: '48px', alignItems: 'start' }} className="grid-2col">
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><ClockIcon /> 30 mins</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><VideoIcon /> Google Meet</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(34,197,94,0.12)', color: '#22c55e', fontSize: '13px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
              <StarIcon /> 4.8
            </span>
            {CLARITY.featured && (
              <span style={{ background: 'rgba(var(--border-rgb),0.08)', color: ACCENT, fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>Most Popular</span>
            )}
            <span style={{ fontSize: '15px', color: 'var(--text-faint)', textDecoration: 'line-through' }}>{CLARITY.originalPrice}</span>
            <span style={{ fontWeight: 900, fontSize: '24px', color: 'var(--text)' }}>{CLARITY.price}</span>
          </div>

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

        <div style={{ position: 'sticky', top: '24px', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '14px', padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontWeight: 800, fontSize: '16px' }}>When should we connect?</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button type="button" onClick={() => setDayWindowStart((v) => Math.max(0, v - VISIBLE_DAYS))} disabled={dayWindowStart === 0} aria-label="Earlier days" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(var(--border-rgb),0.16)', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: dayWindowStart === 0 ? 'default' : 'pointer', opacity: dayWindowStart === 0 ? 0.4 : 1 }}><ArrowIcon dir="left" /></button>
              <button type="button" onClick={() => setDayWindowStart((v) => Math.min((daysData?.length || VISIBLE_DAYS) - VISIBLE_DAYS, v + VISIBLE_DAYS))} disabled={!daysData || dayWindowStart + VISIBLE_DAYS >= daysData.length} aria-label="Later days" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(var(--border-rgb),0.16)', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowIcon /></button>
            </div>
          </div>

          {!daysData ? (
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '20px 0' }}>Loading availability…</div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', marginBottom: '20px' }}>
                {visibleDays.map((d) => {
                  const date = new Date(`${d.date}T00:00:00+05:30`);
                  const isSelected = d.date === selectedDate;
                  const hasSlots = d.slots.length > 0;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={!hasSlots}
                      onClick={() => setSelectedDate(d.date)}
                      style={{
                        flex: '1 0 0', minWidth: '62px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                        padding: '8px 4px', borderRadius: '8px', cursor: hasSlots ? 'pointer' : 'default',
                        border: isSelected ? '1px solid transparent' : '1px solid rgba(var(--border-rgb),0.16)',
                        background: isSelected ? 'var(--kore-gradient)' : 'transparent',
                        color: isSelected ? '#FFFFFF' : hasSlots ? 'var(--text)' : 'var(--text-faint)',
                        opacity: hasSlots ? 1 : 0.5,
                      }}
                    >
                      <span style={{ fontSize: '10px', letterSpacing: '0.04em' }}>{date.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' })}</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap' }}>{date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })}</span>
                      <span style={{ fontSize: '10px', whiteSpace: 'nowrap', color: isSelected ? 'rgba(255,255,255,0.85)' : hasSlots ? '#22c55e' : 'var(--text-faint)' }}>{hasSlots ? `${d.slots.length} slots` : 'No slots'}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>Select your preferred time slot</div>
              <div style={{ display: 'flex', background: 'rgba(var(--border-rgb),0.06)', borderRadius: '999px', padding: '4px', marginBottom: '16px' }}>
                {[
                  { key: 'morning', label: 'Morning' },
                  { key: 'midday', label: 'Midday' },
                  { key: 'evening', label: 'Evening' },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    disabled={buckets[p.key].length === 0}
                    onClick={() => setSelectedPeriod(p.key)}
                    style={{
                      flex: 1, fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, padding: '8px 10px', borderRadius: '999px', border: 'none', cursor: buckets[p.key].length ? 'pointer' : 'default',
                      background: selectedPeriod === p.key ? 'var(--surface)' : 'transparent',
                      boxShadow: selectedPeriod === p.key ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                      color: buckets[p.key].length === 0 ? 'var(--text-faint)' : 'var(--text)',
                      opacity: buckets[p.key].length === 0 ? 0.5 : 1,
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {buckets[selectedPeriod].length === 0 ? (
                <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', padding: '10px 0', marginBottom: '18px' }}>No slots in this window — try another day or time of day.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(78px,1fr))', gap: '8px', marginBottom: '18px' }}>
                  {buckets[selectedPeriod].map((iso) => {
                    const isSelected = selectedSlot === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setSelectedSlot(iso)}
                        style={{
                          padding: '9px 6px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                          border: isSelected ? '1px solid transparent' : '1px solid rgba(var(--border-rgb),0.16)',
                          background: isSelected ? 'var(--kore-gradient)' : 'transparent',
                          color: isSelected ? '#FFFFFF' : 'var(--text)',
                        }}
                      >
                        {new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                      </button>
                    );
                  })}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                <GlobeIcon /> Asia/Calcutta (GMT+5:30)
              </div>

              <button
                type="button"
                disabled={!selectedSlot}
                onClick={() => setShowModal(true)}
                className="btn-accent"
                style={{ width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '13px 22px', borderRadius: '8px', cursor: selectedSlot ? 'pointer' : 'default', opacity: selectedSlot ? 1 : 0.5 }}
              >
                Confirm details
              </button>
            </>
          )}
        </div>
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

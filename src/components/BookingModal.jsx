import { useEffect, useMemo, useState } from 'react';

const DAYS_AHEAD = 21;

function toDateKey(date) {
  return date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function upcomingDates() {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(d);
  }
  return dates;
}

export default function BookingModal({ sessionId, sessionName, price, onClose }) {
  const [step, setStep] = useState('picker'); // picker | details | redirecting | error
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dates = useMemo(() => upcomingDates(), []);

  useEffect(() => {
    if (dates.length && !selectedDate) setSelectedDate(dates[0]);
  }, [dates, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSelectedSlot(null);
    const dateKey = toDateKey(selectedDate);
    fetch(`/api/availability?sessionId=${encodeURIComponent(sessionId)}&date=${dateKey}`)
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setSlots(data.slots || []); })
      .catch(() => { if (!cancelled) setSlots([]); })
      .finally(() => { if (!cancelled) setSlotsLoading(false); });
    return () => { cancelled = true; };
  }, [selectedDate, sessionId]);

  const handleClose = (e) => {
    e?.stopPropagation();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStep('redirecting');
    try {
      const holdRes = await fetch('/api/create-hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, slotStart: selectedSlot, userName: name, userEmail: email }),
      });
      const holdData = await holdRes.json();
      if (!holdRes.ok) throw new Error(holdData.error || 'That slot is no longer available.');

      const linkRes = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdId: holdData.holdId }),
      });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error || 'Could not start payment.');

      window.location.href = linkData.url;
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStep('details');
    }
  };

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`Book ${sessionName}`}
      onClick={handleClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: '480px', maxHeight: '86vh', overflowY: 'auto', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
      >
        <button onClick={handleClose} aria-label="Close" style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '20px', lineHeight: 1, padding: '4px' }}>×</button>

        <div style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-0.01em', marginBottom: '4px' }}>{sessionName}</div>
        <div style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '22px' }}>{price}</div>

        {step === 'picker' && (
          <>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>PICK A DAY</div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '18px' }}>
              {dates.map((d) => {
                const isSelected = selectedDate && toDateKey(d) === toDateKey(selectedDate);
                return (
                  <button
                    key={toDateKey(d)}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    style={{
                      flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                      padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                      border: isSelected ? '1px solid transparent' : '1px solid rgba(var(--border-rgb),0.16)',
                      background: isSelected ? 'var(--kore-gradient)' : 'transparent',
                      color: isSelected ? '#FFFFFF' : 'var(--text)',
                    }}
                  >
                    <span style={{ fontSize: '11px', letterSpacing: '0.04em' }}>{d.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' })}</span>
                    <span style={{ fontSize: '15px', fontWeight: 800 }}>{d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>PICK A TIME (IST)</div>
            {slotsLoading ? (
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '20px 0' }}>Loading available times…</div>
            ) : slots.length === 0 ? (
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '20px 0' }}>No slots available this day — try another date.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(84px,1fr))', gap: '8px', marginBottom: '22px' }}>
                {slots.map((iso) => {
                  const isSelected = selectedSlot === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSelectedSlot(iso)}
                      style={{
                        padding: '10px 8px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer',
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

            <button
              type="button"
              disabled={!selectedSlot}
              onClick={() => setStep('details')}
              className="btn-accent"
              style={{ width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '13px 22px', borderRadius: '8px', cursor: selectedSlot ? 'pointer' : 'default', opacity: selectedSlot ? 1 : 0.5 }}
            >
              Continue
            </button>
          </>
        )}

        {(step === 'details' || step === 'redirecting') && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {selectedDate && selectedSlot && new Date(selectedSlot).toLocaleString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
              {' · '}<button type="button" onClick={() => setStep('picker')} style={{ background: 'none', border: 'none', color: 'var(--kore-orange-text)', cursor: 'pointer', fontSize: '13.5px', padding: 0 }}>change</button>
            </div>
            <input
              type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
            />
            <input
              type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
            />
            {errorMsg && <div style={{ fontSize: '13px', color: 'var(--kore-orange-text)' }}>{errorMsg}</div>}
            <button
              type="submit" disabled={step === 'redirecting'} className="btn-accent"
              style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '13px 22px', borderRadius: '8px', cursor: step === 'redirecting' ? 'default' : 'pointer', opacity: step === 'redirecting' ? 0.7 : 1 }}
            >
              {step === 'redirecting' ? 'Taking you to payment…' : 'Continue to payment'}
            </button>
            <p style={{ fontSize: '12px', color: 'var(--text-faint)', margin: 0 }}>This slot is held for you for 15 minutes while you complete payment.</p>
          </form>
        )}
      </div>
    </div>
  );
}

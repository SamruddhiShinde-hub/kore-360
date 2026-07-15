import { useEffect, useMemo, useState } from 'react';

const DAYS_WINDOW = 21;
const VISIBLE_DAYS = 5;
const todayKey = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

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

function periodOf(iso) {
  const hourStr = new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' });
  const h = parseInt(hourStr, 10) % 24;
  if (h < 12) return 'morning';
  if (h < 16) return 'midday';
  return 'evening';
}

// Real day/time picker (day-strip with live slot counts + Morning/Midday/
// Evening filter) shared by every individually-scheduled session page
// (Clarity Call, Q&A) — same availability window, same mechanics.
export default function SlotPicker({ sessionId, heading = 'When should we connect?', confirmLabel = 'Confirm details', onConfirm }) {
  const [daysData, setDaysData] = useState(null);
  const [dayWindowStart, setDayWindowStart] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('morning');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setDaysData(null);
    setSelectedDate(null);
    fetch(`/api/availability-range?sessionId=${encodeURIComponent(sessionId)}&start=${todayKey}&days=${DAYS_WINDOW}`)
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
  }, [sessionId]);

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

  return (
    <div style={{ position: 'sticky', top: '24px', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '14px', padding: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '16px' }}>{heading}</div>
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

          <div className="sticky-cta-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <GlobeIcon /> Asia/Calcutta (GMT+5:30)
            </div>
            <button
              type="button"
              disabled={!selectedSlot}
              onClick={() => onConfirm(selectedSlot)}
              className="btn-accent"
              style={{ width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '13px 22px', borderRadius: '8px', cursor: selectedSlot ? 'pointer' : 'default', opacity: selectedSlot ? 1 : 0.5 }}
            >
              {confirmLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { EVENT_METRICS, METRIC_SCOPE_LABELS, SHOW_DRAFTS } from '../eventsContent.js';
import { usePrefersReducedMotion } from '../lib/motion.js';

const COUNT_MS = 1400;
const format = (n) => Math.round(n).toLocaleString('en-IN');

// Counts up once, the first time `start` turns true. The final value sits
// underneath, invisible, so the cell is sized for it from the first paint
// and the climbing digits never shift the layout.
function CountUp({ value, suffix, start, reduced }) {
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) { setShown(value); return undefined; }
    if (!start) return undefined;
    let raf;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      setShown(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value, reduced]);

  return (
    <span className="ev-metric-num">
      <span className="ev-metric-ghost" aria-hidden="true">{format(value)}{suffix}</span>
      <span className="ev-metric-live" aria-hidden="true">{format(shown)}{suffix}</span>
      <span className="sr-only">{format(value)}{suffix}</span>
    </span>
  );
}

export default function EventMetrics() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  const metrics = EVENT_METRICS.filter((m) => m.approved && m.value != null);
  const drafts = SHOW_DRAFTS ? EVENT_METRICS.filter((m) => !metrics.includes(m)) : [];
  const items = [...metrics, ...drafts];

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section ref={ref} className="ev-metrics" aria-labelledby="ev-metrics-heading">
      <div className="ev-shell">
        <h2 id="ev-metrics-heading" className="sr-only">KORE 360 in numbers</h2>
        <ul className="ev-metrics-grid" data-count={items.length}>
          {items.map((m) => {
            const isDraft = !metrics.includes(m);
            const scope = m.scope === 'project' ? m.scopeNote : METRIC_SCOPE_LABELS[m.scope];
            return (
              <li key={m.id} className={`ev-metric ${isDraft ? 'is-draft' : ''}`.trim()}>
                {isDraft
                  ? <span className="ev-metric-num" aria-hidden="true">00</span>
                  : <CountUp value={m.value} suffix={m.suffix} start={inView} reduced={reduced} />}
                <span className="ev-metric-label">{m.label}</span>
                {scope && <span className="ev-metric-scope">{scope}</span>}
                {isDraft && <span className="ev-draft-tag">Draft · needs a verified figure</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

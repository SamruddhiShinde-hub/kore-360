import { useCallback, useEffect, useRef, useState } from 'react';
import { KORE_RELATIONSHIPS, RELATIONSHIP_LABELS, SHOW_DRAFTS, visibleLogos } from '../eventsContent.js';
import { usePrefersReducedMotion } from '../lib/motion.js';
import Reveal from './Reveal.jsx';

// Flip-tile motion, after the DNA Networks client grid: a fixed grid of
// cells; on a steady beat one random cell flips on its horizontal axis
// (rotateX, ~2s) to reveal a logo that wasn't on screen, with a brief lift
// shadow as it starts. Cells keep their size and position; only the faces
// change. Unlike the reference it only runs while the grid is on screen,
// and it never shows the same logo in two cells.
const CELLS = 8;
const TICK_MS = 1500;      // one flip starts per beat
const START_DELAY_MS = 1200;
const FLIP_MS = 2000;      // keep in sync with .ev-logo-card transition
const LIFT_MS = 500;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function LogoFace({ logo, back }) {
  return (
    <div className={`ev-logo-face ${back ? 'ev-logo-face--back' : ''}`.trim()}>
      <span className="ev-logo-name">{logo.name}</span>
      {!logo.approved && <span className="ev-logo-rel">Draft · {RELATIONSHIP_LABELS[logo.relationship]}</span>}
      <span className="ev-logo-mark"><img src={logo.logo} alt="" loading="lazy" decoding="async" /></span>
    </div>
  );
}

function StaticGrid({ logos }) {
  return (
    <div className="ev-logos ev-logos--static" data-count={logos.length} aria-hidden="true">
      {logos.map((l) => <div key={l.name} className="ev-logo-cell"><div className="ev-logo-card"><LogoFace logo={l} /></div></div>)}
    </div>
  );
}

function FlipGrid({ logos }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const [cells, setCells] = useState(() => Array.from({ length: CELLS }, (_, i) => ({ faces: [i, i], flipped: false, lift: false })));
  const cellsRef = useRef(cells);
  const queueRef = useRef(shuffle(logos.slice(CELLS).map((_, i) => i + CELLS)));
  const busyRef = useRef({ until: [], last: -1 });

  const commit = (next) => { cellsRef.current = next; setCells(next); };

  const tick = useCallback((timers) => {
    const now = performance.now();
    const { until, last } = busyRef.current;
    const free = cellsRef.current.map((_, i) => i).filter((i) => i !== last && (until[i] || 0) <= now);
    if (!free.length || !queueRef.current.length) return;
    const pick = free[Math.floor(Math.random() * free.length)];
    const incoming = queueRef.current.shift();

    commit(cellsRef.current.map((c, i) => {
      if (i !== pick) return c;
      const showing = c.flipped ? 1 : 0;
      queueRef.current.push(c.faces[showing]); // outgoing goes to the back of the line
      const faces = [...c.faces];
      faces[1 - showing] = incoming;           // load the hidden face, then turn it round
      return { faces, flipped: !c.flipped, lift: true };
    }));
    busyRef.current = { until: Object.assign([...until], { [pick]: now + FLIP_MS }), last: pick };
    timers.add(setTimeout(() => {
      commit(cellsRef.current.map((c, i) => (i === pick ? { ...c, lift: false } : c)));
    }, LIFT_MS));
  }, []);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => { obs.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const running = inView && pageVisible && !paused;
  useEffect(() => {
    if (!running) return undefined;
    const timers = new Set();
    let interval;
    const start = setTimeout(() => {
      tick(timers);
      interval = setInterval(() => tick(timers), TICK_MS);
    }, START_DELAY_MS);
    return () => { clearTimeout(start); clearInterval(interval); timers.forEach(clearTimeout); };
  }, [running, tick]);

  return (
    <div ref={ref} className="ev-flip">
      <div className="ev-logos" aria-hidden="true">
        {cells.map((c, i) => (
          <div key={i} className="ev-logo-cell">
            <div className={`ev-logo-card${c.flipped ? ' is-flipped' : ''}${c.lift ? ' is-lifted' : ''}`}>
              <LogoFace logo={logos[c.faces[0]]} />
              <LogoFace logo={logos[c.faces[1]]} back />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="ev-who-pause" onClick={() => setPaused((p) => !p)}>
        {paused
          ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
          : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>}
        {paused ? 'Play logo animation' : 'Pause logo animation'}
      </button>
    </div>
  );
}

// Names for screen readers: one stable list, not every visual change.
function LogoList({ logos }) {
  return <ul className="sr-only">{logos.map((l) => <li key={l.name}>{l.name}</li>)}</ul>;
}

function LogoGroup({ title, note, logos, animate }) {
  return (
    <div className="ev-logo-group">
      {title && <h3 className="ev-logo-group-title">{title}</h3>}
      {note && <p className="ev-logo-group-note">{note}</p>}
      <LogoList logos={logos} />
      {animate ? <FlipGrid logos={logos} /> : <StaticGrid logos={logos} />}
    </div>
  );
}

// Marks are grouped by what they actually represent. KORE 360 clients and
// partners lead under "Who We Work With"; the founder's earlier experience
// is labelled as such. Until there are approved KORE 360 marks, the section
// is titled for the experience it does show.
export default function WhoWeWorkWith() {
  const reduced = usePrefersReducedMotion();
  const kore = visibleLogos(KORE_RELATIONSHIPS);
  const founder = visibleLogos(['founder']);
  const unconfirmed = SHOW_DRAFTS ? visibleLogos(['unconfirmed']) : [];
  if (!kore.length && !founder.length && !unconfirmed.length) return null;

  const flips = (list) => list.length > CELLS && !reduced;
  const founderNote = 'Leagues and events our founder worked on in his own professional capacity before KORE 360. These are not KORE 360 client engagements.';

  return (
    <section className="ev-section ev-who" aria-labelledby="ev-who-heading">
      <div className="ev-shell ev-who-grid">
        <Reveal className="ev-who-intro">
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>OUR NETWORK</div>
          {kore.length > 0 ? (
            <>
              <h2 id="ev-who-heading" className="ev-who-title">Who We Work With</h2>
              <p className="league-lede">We work with league owners, event organisers and brands to plan, launch and deliver live events.</p>
            </>
          ) : (
            <>
              <h2 id="ev-who-heading" className="ev-who-title">Where Our Team Has Worked</h2>
              <p className="league-lede">The leagues and sporting events behind KORE 360&apos;s on-ground experience.</p>
            </>
          )}
        </Reveal>

        <div className="ev-who-right">
          {kore.length > 0 && <LogoGroup title={founder.length ? 'KORE 360 clients & partners' : null} logos={kore} animate={flips(kore)} />}
          {founder.length > 0 && <LogoGroup title="Founder & team experience" note={founderNote} logos={founder} animate={flips(founder)} />}
          {unconfirmed.length > 0 && <LogoGroup title="Draft · relationship to confirm" note="Shown in dev only. Confirm each as client, partner, sponsor or founder experience before publishing." logos={unconfirmed} animate={false} />}
        </div>
      </div>
    </section>
  );
}

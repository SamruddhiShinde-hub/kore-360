import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LEAGUE_ENGAGEMENTS, LEAGUE_COMPARISON } from '../data.js';
import { track } from '../lib/analytics.js';
import Reveal from './Reveal.jsx';
import LeagueEnquiryModal from './LeagueEnquiryModal.jsx';

function EngagementCard({ model, index, expanded, onToggle }) {
  const regionId = `league-scope-${model.id}`;
  const shown = model.deliverables.slice(0, model.preview);
  const more = model.deliverables.slice(model.preview);

  return (
    // Reveal wraps the card rather than being it — its stagger delay would
    // otherwise also delay the card's own hover transitions.
    <Reveal delay={index} style={{ height: '100%' }}>
      <article className="league-card" aria-labelledby={`league-name-${model.id}`}>
        <div className="league-card-head">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <h3 id={`league-name-${model.id}`} className="league-card-name">{model.name}</h3>
            <span className="league-card-step">0{index + 1}</span>
          </div>
          <div className="league-card-descriptor">{model.descriptor}</div>
          <div className="league-card-role">{model.role}</div>
        </div>

        <div className="league-row" data-row="intro">
          <p className="league-card-headline">{model.headline}</p>
          <p className="league-card-desc">{model.desc}</p>
        </div>

        <div className="league-row" data-row="preview">
          <div className="league-card-label">{model.deliverablesLabel}</div>
          <ul className="league-list">
            {shown.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>

        {/* Collapsed with grid-template-rows 0fr → 1fr so it animates to its
            natural height; `inert` keeps the hidden part out of tab order and
            the accessibility tree until it's opened. */}
        <div id={regionId} className={`league-expand ${expanded ? 'is-open' : ''}`} inert={expanded ? undefined : ''}>
          <div className="league-expand-inner">
            <div className="league-row" data-row="more">
              {more.length > 0 && (
                <ul className="league-list" style={{ marginTop: '10px' }}>
                  {more.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}
            </div>

            <div className="league-row" data-row="framework">
              <div className="league-card-label" style={{ marginTop: '26px' }}>How it works</div>
              <ol className="league-framework">
                {model.framework.map((f, i) => (
                  <li key={`${f.letter}-${i}`}>
                    <span className="league-framework-letter" aria-hidden="true">{f.letter}</span>
                    <div>
                      <div className="league-framework-word">{f.word}</div>
                      {f.question && <div className="league-framework-question">{f.question}</div>}
                      <div className="league-framework-detail">{f.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="league-row" data-row="note">
              <p className="league-card-note">{model.note}</p>
            </div>
          </div>
        </div>

        {/* Bottom group sits on the card's floor (margin-top: auto), so the
            outcome boxes and toggles line up across all three cards no matter
            how long the content above them runs. */}
        <div className="league-card-bottom">
          <div id={`${regionId}-outcome`} className={`league-expand ${expanded ? 'is-open' : ''}`} inert={expanded ? undefined : ''}>
            <div className="league-expand-inner">
              <div className="league-outcome">
                <div className="league-card-label" style={{ marginBottom: '8px' }}>The outcome</div>
                <p>{model.outcome}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="league-toggle"
            aria-expanded={expanded}
            aria-controls={`${regionId} ${regionId}-outcome`}
            onClick={onToggle}
          >
            {expanded ? 'Hide scope' : 'Explore scope'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            <span className="sr-only"> for {model.name}</span>
          </button>
        </div>

        <div className="league-card-footer">
          <span>{model.footer}</span>
          {model.tag && <span className="league-card-tag">{model.tag}</span>}
        </div>
      </article>
    </Reveal>
  );
}

export default function LeagueEngagements() {
  const sectionRef = useRef(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const gridRef = useRef(null);

  // Side by side, each matching block (intro, deliverables, how it works,
  // note, outcome, footer) takes the tallest card's height for that block,
  // so every section starts on the same line across all three cards.
  // Re-measured on resize since wrapping changes with card width.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const rows = ['.league-card-head', ...['intro', 'more', 'framework', 'note'].map((r) => `[data-row="${r}"]`), '.league-outcome', '.league-card-footer'];
    // getBoundingClientRect, not offsetHeight — offsetHeight rounds, and
    // the rounding drifts blocks lower down by a pixel.
    const height = (el) => el.getBoundingClientRect().height;
    const equalize = () => {
      const sideBySide = window.matchMedia('(min-width: 981px)').matches;
      rows.forEach((sel) => {
        const boxes = [...grid.querySelectorAll(sel)];
        boxes.forEach((b) => { b.style.minHeight = ''; });
        if (!sideBySide) return;
        if (sel === '[data-row="more"]') {
          // The deliverables list is split across the preview and the
          // expandable remainder — size them as one block, padding only the
          // remainder, so the list never shows a gap in its middle.
          const previews = [...grid.querySelectorAll('[data-row="preview"]')];
          const totals = boxes.map((b, i) => height(previews[i]) + height(b));
          const tallest = Math.max(...totals);
          boxes.forEach((b, i) => { b.style.minHeight = `${tallest - height(previews[i])}px`; });
          return;
        }
        const tallest = Math.max(...boxes.map(height));
        boxes.forEach((b) => { b.style.minHeight = `${tallest}px`; });
      });
    };
    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  // Side by side (desktop), the cards open and close together so they stay
  // the same height and line up for comparison. Stacked (tablet/mobile),
  // each opens on its own so the page doesn't balloon.
  const toggleScope = (id) => {
    const sideBySide = window.matchMedia('(min-width: 981px)').matches;
    setExpanded((prev) => {
      const next = !prev[id];
      if (!sideBySide) return { ...prev, [id]: next };
      return Object.fromEntries(LEAGUE_ENGAGEMENTS.map((m) => [m.id, next]));
    });
  };
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  // Fires once per page view, the first time the section is actually seen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track('league_engagement_section_viewed', { lead_type: 'league_management' });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openEnquiry = () => {
    setEnquiryOpen(true);
    track('league_enquiry_opened', { lead_type: 'league_management' });
  };

  return (
    <>
      <section ref={sectionRef} id="league-management" aria-labelledby="league-heading" className="league-section">
        <div className="league-shell">
          <Reveal style={{ maxWidth: '760px', marginBottom: '48px' }}>
            <div className="league-eyebrow" style={{ marginBottom: '18px' }}>SPORTS & LEAGUE MANAGEMENT</div>
            <h2 id="league-heading" className="league-h2">Three levels. Different depths of involvement.</h2>
            <p className="league-lede">
              Whether you're building a new sporting league, preparing for execution or looking for a long-term operating partner, KORE 360 brings the strategy, structure and execution expertise to move your vision forward.
            </p>
          </Reveal>

          <div ref={gridRef} className="league-grid">
            {LEAGUE_ENGAGEMENTS.map((m, i) => <EngagementCard key={m.id} model={m} index={i} expanded={!!expanded[m.id]} onToggle={() => toggleScope(m.id)} />)}
          </div>

          <Reveal style={{ marginTop: '88px' }}>
            <h2 id="league-compare-heading" className="league-h2" style={{ fontSize: 'clamp(26px,3.6vw,40px)', marginBottom: '28px' }}>One model. Three levels of involvement.</h2>
            <div className="league-compare-wrap">
              <table className="league-compare" aria-labelledby="league-compare-heading">
                <thead>
                  <tr>
                    <th scope="col" className="league-compare-corner"><span className="sr-only">Area</span></th>
                    {LEAGUE_ENGAGEMENTS.map((m) => <th key={m.id} scope="col">{m.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {LEAGUE_COMPARISON.map((row) => (
                    <tr key={row.area}>
                      <th scope="row">{row.area}</th>
                      <td data-label="CORE">{row.core}</td>
                      <td data-label="LAUNCH">{row.launch}</td>
                      <td data-label="SCALE">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="league-disclaimer">
              Every engagement is tailored to the scope, locations, event days, duration, team deployment and operational complexity. The level of KORE 360 involvement is determined by the agreed scope of work; third-party, production, travel, accommodation, venue and statutory costs are scoped separately during the proposal process.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="league-cta-heading" className="league-cta">
        <div className="league-cta-glow" aria-hidden="true" />
        <Reveal className="league-shell" style={{ position: 'relative', textAlign: 'center' }}>
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>LET'S TALK LEAGUES</div>
          <h2 id="league-cta-heading" className="league-cta-title">Want us to run your league?</h2>
          <p className="league-cta-text">
            Whether you're building a new league, preparing for your next season or looking for an experienced operating partner, tell us what you have in mind. We'll help define the right level of KORE 360 involvement.
          </p>
          <button type="button" onClick={openEnquiry} className="btn-accent league-cta-btn" aria-haspopup="dialog">
            Tell Us About Your League →
          </button>
        </Reveal>
      </section>

      <LeagueEnquiryModal open={enquiryOpen} onClose={closeEnquiry} />
    </>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { LEAGUE_ENGAGEMENTS, LEAGUE_COMPARISON } from '../data.js';
import { track } from '../lib/analytics.js';
import Reveal from './Reveal.jsx';
import LeagueEnquiryModal from './LeagueEnquiryModal.jsx';

function EngagementCard({ model, index, expanded, onToggle }) {
  const regionId = `league-scope-${model.id}`;
  const shown = model.deliverables.slice(0, model.preview);
  const more = model.deliverables.slice(model.preview);

  return (
    // Reveal wraps the card rather than being it, so its fade-in transition
    // doesn't also slow the card's own hover transitions.
    <Reveal>
      <article id={`league-${model.id}`} className="league-card" aria-labelledby={`league-name-${model.id}`}>
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

// Sticky-rail layout: on wide screens the heading and the three package
// labels stay in view on the left while the cards scroll past on the right
// in normal document flow; the card nearest the middle of the screen marks
// its label as current. The rail is plain anchor links, so it still works
// (and the cards still read in order) without JS or with reduced motion.
//
// `beforeCta` renders between the comparison and the closing CTA band.
// `onEventEnquire` turns that band into a general event enquiry with the
// league form as the secondary action.
export default function LeagueEngagements({ beforeCta = null, onEventEnquire }) {
  const sectionRef = useRef(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [active, setActive] = useState(LEAGUE_ENGAGEMENTS[0].id);

  const toggleScope = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  // Current package = the card crossing the middle band of the viewport.
  useEffect(() => {
    const cards = LEAGUE_ENGAGEMENTS.map((m) => document.getElementById(`league-${m.id}`)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id.replace('league-', '')); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

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
          <div className="league-rail-layout">
            <aside className="league-rail">
              <div className="league-eyebrow" style={{ marginBottom: '18px' }}>SPORTS & LEAGUE MANAGEMENT</div>
              <h2 id="league-heading" className="league-h2 league-rail-title">Three levels. Different depths of involvement.</h2>
              <p className="league-lede league-rail-lede">
                Whether you're building a new sporting league, preparing for execution or looking for a long-term operating partner, KORE 360 brings the strategy, structure and execution expertise to move your vision forward.
              </p>
              <nav className="league-rail-nav" aria-label="League packages">
                <ol>
                  {LEAGUE_ENGAGEMENTS.map((m, i) => (
                    <li key={m.id}>
                      <a href={`#league-${m.id}`} className={`league-rail-link${active === m.id ? ' is-active' : ''}`} aria-current={active === m.id ? 'true' : undefined}>
                        <span className="league-rail-num">0{i + 1}</span>
                        <span className="league-rail-name">{m.name}</span>
                        <span className="league-rail-desc">{m.descriptor}</span>
                      </a>
                    </li>
                  ))}
                </ol>
                <a href="#league-compare" className="league-rail-compare">Compare all three <span aria-hidden="true">↓</span></a>
              </nav>
            </aside>

            <div className="league-stack">
              {LEAGUE_ENGAGEMENTS.map((m, i) => <EngagementCard key={m.id} model={m} index={i} expanded={!!expanded[m.id]} onToggle={() => toggleScope(m.id)} />)}
            </div>
          </div>

          <Reveal id="league-compare" className="league-compare-block">
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
            <button type="button" onClick={openEnquiry} className="hx-link league-compare-cta" aria-haspopup="dialog">
              Tell Us About Your League <span aria-hidden="true" className="hx-arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>

      {beforeCta}

      <section aria-labelledby="league-cta-heading" className="league-cta">
        <div className="league-cta-glow" aria-hidden="true" />
        {onEventEnquire ? (
          <Reveal className="league-shell" style={{ position: 'relative', textAlign: 'center' }}>
            <div className="league-eyebrow" style={{ marginBottom: '18px' }}>LET'S TALK</div>
            <h2 id="league-cta-heading" className="league-cta-title">Tell us about your event</h2>
            <p className="league-cta-text">
              A league season, a corporate event or a brand experience: tell us what you're planning and we'll scope the services and level of involvement that fit.
            </p>
            <div className="hx-ctas hx-ctas--center">
              <button type="button" onClick={() => onEventEnquire(undefined, 'events_final')} className="btn-accent league-cta-btn" aria-haspopup="dialog">Tell Us About Your Event →</button>
              <button type="button" onClick={openEnquiry} className="hx-btn hx-btn--ghost" aria-haspopup="dialog">Tell Us About Your League →</button>
            </div>
          </Reveal>
        ) : (
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
        )}
      </section>

      <LeagueEnquiryModal open={enquiryOpen} onClose={closeEnquiry} />
    </>
  );
}

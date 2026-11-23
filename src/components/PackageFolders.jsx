import { useCallback, useRef, useState } from 'react';
import { LEAGUE_ENGAGEMENTS, LEAGUE_COMPARISON } from '../data.js';
import { track } from '../lib/analytics.js';
import { usePrefersReducedMotion } from '../lib/motion.js';
import Reveal from './Reveal.jsx';
import LeagueEnquiryModal from './LeagueEnquiryModal.jsx';

const TRANSITION_MS = 420; // keep in sync with .league-expand

// "At a glance" rows for one package, from the comparison data.
const glance = (id) => LEAGUE_COMPARISON.filter((r) => ['Role', 'Implementation', 'Team Deployment', 'On-Ground Delivery', 'Duration'].includes(r.area)).map((r) => [r.area, r[id]]);

// CORE / LAUNCH / SCALE as stacked folders. One open at a time (CORE to
// start); the open one can be closed. Each header is a real button; the
// enquiry CTA inside is separate from it.
export default function PackageFolders() {
  const [openId, setOpenId] = useState(LEAGUE_ENGAGEMENTS[0].id);
  const [enquiry, setEnquiry] = useState({ open: false, support: undefined });
  const reduced = usePrefersReducedMotion();
  const folders = useRef({});

  // Opening a folder collapses the one above it at the same time, which
  // would drag the clicked header upwards (or off-screen). Pin the header
  // where the visitor tapped it for the length of the transition, then make
  // sure it ends up comfortably in view.
  const keepInView = useCallback((id) => {
    const el = folders.current[id];
    if (!el) return;
    const startTop = el.getBoundingClientRect().top;
    const end = performance.now() + (reduced ? 0 : TRANSITION_MS) + 60;
    const pin = () => {
      const drift = el.getBoundingClientRect().top - startTop;
      if (Math.abs(drift) > 0.5) window.scrollBy({ top: drift, behavior: 'instant' });
      if (performance.now() < end) requestAnimationFrame(pin);
      else {
        const top = el.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.6) el.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });
      }
    };
    requestAnimationFrame(pin);
  }, [reduced]);

  const toggle = (id) => {
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (opening) {
      track('select_content', { content_type: 'league_package', item_id: id });
      keepInView(id);
    }
  };

  const enquire = (m) => {
    setEnquiry({ open: true, support: m.enquirySupport });
    track('league_enquiry_opened', { lead_type: 'league_management', source: 'events_package', item_id: m.id });
  };
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), []);

  return (
    <section id="league-management" className="pk-section" aria-labelledby="pk-heading">
      <div className="ev-shell">
        <Reveal className="pk-head">
          <h2 id="pk-heading" className="league-h2">Choose Your Level of Support</h2>
          <p className="league-lede">Three ways to work with KORE 360 on a league, from the plan your team runs to a long-term operating partnership. Every engagement is scoped to the brief.</p>
        </Reveal>

        <div className="pk-folders">
          {LEAGUE_ENGAGEMENTS.map((m, i) => {
            const isOpen = openId === m.id;
            const btnId = `pk-btn-${m.id}`;
            const panelId = `pk-panel-${m.id}`;
            return (
              <div key={m.id} id={`league-${m.id}`} ref={(el) => { folders.current[m.id] = el; }} className={`pk-folder${isOpen ? ' is-open' : ''}`}>
                <div className="pk-tab" aria-hidden="true"><span className="pk-tab-num">0{i + 1}</span>{m.descriptor}</div>
                <div className="pk-sheet">
                <h3 className="pk-heading">
                  <button id={btnId} type="button" className="pk-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(m.id)}>
                    <span className="pk-title">
                      <span className="pk-name">{m.name}</span>
                      <span className="pk-role">{m.role}</span>
                    </span>
                    <span className="pk-summary">{m.summary}</span>
                    <span className="pk-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className={`league-expand${isOpen ? ' is-open' : ''}`} inert={isOpen ? undefined : ''}>
                  <div className="league-expand-inner">
                    <div className="pk-body">
                      <div className="pk-main">
                        <p className="pk-headline">{m.headline}</p>
                        <p className="pk-desc">{m.desc}</p>
                        <div className="pk-label">{m.deliverablesLabel}</div>
                        <ul className="pk-list">
                          {m.deliverables.map((d) => <li key={d}>{d}</li>)}
                        </ul>
                      </div>
                      <div className="pk-side">
                        <div className="pk-label">At a glance</div>
                        <dl className="pk-glance">
                          {glance(m.id).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                        </dl>
                        <div className="pk-label">How it works</div>
                        <ol className="pk-framework">
                          {m.framework.map((f, j) => (
                            <li key={`${f.letter}-${j}`}>
                              <span className="pk-letter" aria-hidden="true">{f.letter}</span>
                              <span><strong>{f.word}</strong>{f.question && <em> {f.question}</em>} — {f.detail}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="pk-foot">
                        <p className="pk-outcome">{m.outcome}</p>
                        <p className="pk-note">{m.note}</p>
                        <button type="button" className="hx-btn hx-btn--primary pk-cta" onClick={() => enquire(m)} aria-haspopup="dialog">
                          Discuss {m.name} for your league <span aria-hidden="true" className="hx-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="pk-disclaimer">
          Every engagement is tailored to the scope, locations, event days, duration, team deployment and operational complexity. The level of KORE 360 involvement is determined by the agreed scope of work; third-party, production, travel, accommodation, venue and statutory costs are scoped separately during the proposal process.
        </p>
      </div>
      <LeagueEnquiryModal open={enquiry.open} onClose={closeEnquiry} initialSupport={enquiry.support} />
    </section>
  );
}

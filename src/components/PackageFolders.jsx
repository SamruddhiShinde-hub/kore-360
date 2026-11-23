import { useCallback, useRef, useState } from 'react';
import { LEAGUE_ENGAGEMENTS, LEAGUE_COMPARISON } from '../data.js';
import { track } from '../lib/analytics.js';
import Reveal from './Reveal.jsx';
import LeagueEnquiryModal from './LeagueEnquiryModal.jsx';

// "At a glance" rows for one package, from the comparison data.
const glance = (id) => LEAGUE_COMPARISON.filter((r) => ['Role', 'Implementation', 'Team Deployment', 'On-Ground Delivery', 'Duration'].includes(r.area)).map((r) => [r.area, r[id]]);

// CORE / LAUNCH / SCALE as three folders side by side. Picking one opens
// its contents in the panel underneath, joined to the chosen folder
// (CORE to start). Built as a tab set: arrow keys / Home / End move between
// folders, and the enquiry CTA in the panel is separate from the folders.
export default function PackageFolders() {
  const [activeId, setActiveId] = useState(LEAGUE_ENGAGEMENTS[0].id);
  const [enquiry, setEnquiry] = useState({ open: false, support: undefined });
  const tabs = useRef({});

  const select = (id, focus = false) => {
    if (id !== activeId) track('select_content', { content_type: 'league_package', item_id: id });
    setActiveId(id);
    if (focus) tabs.current[id]?.focus();
  };

  const onKeyDown = (e, i) => {
    const n = LEAGUE_ENGAGEMENTS.length;
    const to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    select(LEAGUE_ENGAGEMENTS[to].id, true);
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

        <div className="pk-tabs" role="tablist" aria-label="League support levels">
          {LEAGUE_ENGAGEMENTS.map((m, i) => {
            const active = activeId === m.id;
            return (
              <button
                key={m.id} id={`pk-tab-${m.id}`} ref={(el) => { tabs.current[m.id] = el; }}
                type="button" role="tab" aria-selected={active} aria-controls={`pk-panel-${m.id}`} tabIndex={active ? 0 : -1}
                className={`pk-folder${active ? ' is-active' : ''}`}
                onClick={() => select(m.id)} onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="pk-tab" aria-hidden="true"><span className="pk-tab-num">0{i + 1}</span><span className="pk-tab-text">{m.descriptor}</span></span>
                <span className="pk-name">{m.name}</span>
                <span className="pk-role">{m.role}</span>
                <span className="pk-summary">{m.summary}</span>
                <span className="pk-pick" aria-hidden="true">{active ? 'Selected' : 'View package'}</span>
              </button>
            );
          })}
        </div>

        {LEAGUE_ENGAGEMENTS.map((m, i) => (
          <div key={m.id} id={`pk-panel-${m.id}`} role="tabpanel" aria-labelledby={`pk-tab-${m.id}`} tabIndex={0} hidden={activeId !== m.id} className="pk-panel" data-pos={i === 0 ? 'first' : i === LEAGUE_ENGAGEMENTS.length - 1 ? 'last' : 'mid'}>
            <p className="pk-panel-summary">{m.summary}</p>
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
        ))}

        <p className="pk-disclaimer">
          Every engagement is tailored to the scope, locations, event days, duration, team deployment and operational complexity. The level of KORE 360 involvement is determined by the agreed scope of work; third-party, production, travel, accommodation, venue and statutory costs are scoped separately during the proposal process.
        </p>
      </div>
      <LeagueEnquiryModal open={enquiry.open} onClose={closeEnquiry} initialSupport={enquiry.support} />
    </section>
  );
}

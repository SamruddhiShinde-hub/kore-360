import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EVENT_SERVICES } from '../eventsContent.js';
import { projectsIn } from '../workContent.js';
import { track } from '../lib/analytics.js';
import Reveal from './Reveal.jsx';

// Each row has its own anchor (/events#service-decor), which also opens it,
// so Home's capability tiles and the footer can deep-link to a service.
export default function EventServices({ onEnquire }) {
  const { hash } = useLocation();
  const [open, setOpen] = useState({});

  useEffect(() => {
    const id = hash.startsWith('#service-') ? hash.slice('#service-'.length) : null;
    if (id && EVENT_SERVICES.some((s) => s.id === id)) setOpen((prev) => ({ ...prev, [id]: true }));
  }, [hash]);

  const toggle = (s) => {
    if (!open[s.id]) track('select_content', { content_type: 'event_service', item_id: s.name });
    setOpen((prev) => ({ ...prev, [s.id]: !prev[s.id] }));
  };

  return (
    <section id="services" className="ev-section" aria-labelledby="ev-services-heading">
      <div className="ev-shell ev-services">
        <Reveal className="ev-services-intro">
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>WHAT WE DELIVER</div>
          <h2 id="ev-services-heading" className="league-h2">Event Services</h2>
          <p className="league-lede">From venue planning to match-day production, we bring together the teams and services your event needs.</p>
          <p className="ev-services-note">
            Services are scoped to each brief, so not every service is part of every league package. These are what we can deliver; <a href="#league-management">CORE, LAUNCH and SCALE</a> set how involved we get.
          </p>
        </Reveal>

        {/* Same 0fr → 1fr grid-row collapse as the league scope cards; `inert`
            keeps a closed panel out of the tab order and accessibility tree. */}
        <ul className="ev-acc">
          {EVENT_SERVICES.map((s, i) => {
            const isOpen = !!open[s.id];
            const btnId = `ev-service-btn-${s.id}`;
            const panelId = `ev-service-panel-${s.id}`;
            const hasWork = s.category && projectsIn(s.category).length > 0;
            return (
              <li key={s.id} id={`service-${s.id}`} className={`ev-acc-item ${isOpen ? 'is-open' : ''}`.trim()}>
                <h3 className="ev-acc-heading">
                  <button id={btnId} type="button" className="ev-acc-btn" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(s)}>
                    <span className="ev-acc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ev-acc-name">{s.name}</span>
                    <span className="ev-acc-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className={`league-expand ${isOpen ? 'is-open' : ''}`} inert={isOpen ? undefined : ''}>
                  <div className="league-expand-inner">
                    <div className="ev-acc-panel">
                      <p className="ev-acc-desc">{s.desc}</p>
                      <div className="ev-acc-links">
                        {hasWork && <Link to={`/work?category=${s.category}`} className="hx-link">See the work <span aria-hidden="true" className="hx-arrow">→</span></Link>}
                        <button type="button" className="hx-link" onClick={() => onEnquire(s.service, 'events_service')} aria-haspopup="dialog">
                          Enquire about {s.name.toLowerCase()} <span aria-hidden="true" className="hx-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

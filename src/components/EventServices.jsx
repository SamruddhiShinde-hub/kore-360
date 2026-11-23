import { EVENT_SERVICES } from '../eventsContent.js';
import Reveal from './Reveal.jsx';

// Two-column service list (one column on phones): name + one line on what
// the organiser gets. Each row keeps its old anchors as hidden aliases so
// existing links like /events#service-decor still scroll to it.
export default function EventServices() {
  return (
    <section id="services" className="sv-section" aria-labelledby="sv-heading">
      <div className="ev-shell">
        <Reveal className="sv-head">
          <h2 id="sv-heading" className="league-h2">Event Services</h2>
          <p className="league-lede">From the first budget to the final handover, choose the areas you want KORE 360 to run.</p>
        </Reveal>
        <ul className="sv-list">
          {EVENT_SERVICES.map((s, i) => (
            <li key={s.id} id={`service-${s.id}`} className="sv-item">
              {s.aliases.map((a) => <span key={a} id={`service-${a}`} className="sv-alias" aria-hidden="true" />)}
              <span className="sv-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="sv-name">{s.name}</h3>
                <p className="sv-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

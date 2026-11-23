import { EVENTS_PORTFOLIO } from '../eventsContent.js';
import Reveal from './Reveal.jsx';

// Static grid of the competitions and teams worked across.
// Every card starts with the same fixed-height logo stage, so names
// line up across a row. Logos carry empty alt text because the card
// names the same entity right below.
function LogoStage({ item }) {
  if (!item.logo) {
    return (
      <div className="pf-stage pf-stage--text" aria-hidden="true">
        <span className="pf-stage-edition">{item.edition}</span>
      </div>
    );
  }
  return (
    <div className="pf-stage">
      <img src={item.logo} alt="" width={item.w} height={item.h} loading="lazy" decoding="async" className="pf-logo" style={{ maxWidth: item.size[0], maxHeight: item.size[1] }} />
    </div>
  );
}

export default function EventsPortfolio() {
  return (
    <section id="portfolio" className="pf-section" aria-labelledby="pf-heading">
      <div className="ev-shell">
        <Reveal className="pf-head">
          <h2 id="pf-heading" className="league-h2">Leagues, Events &amp; Teams</h2>
          <p className="league-lede">KORE 360 founder Krish Lalwani has worked across these competitions and teams.</p>
        </Reveal>
        <ul className="pf-grid">
          {EVENTS_PORTFOLIO.map((item) => (
            <li key={item.id} className="pf-card">
              <LogoStage item={item} />
              <h3 className="pf-name">{item.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

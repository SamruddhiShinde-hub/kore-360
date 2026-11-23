import { Link } from 'react-router-dom';
import { FOUNDER as F } from '../eventsContent.js';
import Reveal from './Reveal.jsx';

// Short founder/team link for /events — the full story lives on /about.
export default function EventsFounder() {
  return (
    <section className="ev-founder" aria-labelledby="ev-founder-heading">
      <Reveal className="ev-shell ev-founder-inner">
        {F.portrait && (
          <div className="ev-founder-photo">
            <img src={F.portrait} alt={F.portraitAlt} loading="lazy" decoding="async" width={F.portraitW} height={F.portraitH} style={{ objectPosition: F.focal }} />
          </div>
        )}
        <div>
          <div className="hx-eyebrow">WHO YOU&apos;LL WORK WITH</div>
          <h2 id="ev-founder-heading" className="ev-founder-name">{F.name}</h2>
          <div className="ev-founder-role">{F.role}</div>
          <p className="ev-founder-copy">{F.short}</p>
          <Link to="/about" className="hx-link">About KORE 360 and the team <span aria-hidden="true" className="hx-arrow">→</span></Link>
        </div>
      </Reveal>
    </section>
  );
}

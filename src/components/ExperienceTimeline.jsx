import { Link } from 'react-router-dom';
import { FOUNDER_ROLES } from '../workContent.js';

// Krish's CV as a timeline, most recent first. Roles at properties with an
// experience page link through to it.
export default function ExperienceTimeline({ roles = FOUNDER_ROLES }) {
  return (
    <ol className="xp-timeline">
      {roles.map((r) => (
        <li key={`${r.org}-${r.dates}`} className="xp-row">
          <span className="xp-dates">{r.dates}</span>
          <span className="xp-main">
            {r.slug
              ? <Link to={`/work/${r.slug}`} className="xp-org">{r.org} <span aria-hidden="true" className="hx-arrow">→</span></Link>
              : <span className="xp-org">{r.org}</span>}
            <span className="xp-role">{r.role}</span>
          </span>
          {r.location && <span className="xp-loc">{r.location}</span>}
        </li>
      ))}
    </ol>
  );
}

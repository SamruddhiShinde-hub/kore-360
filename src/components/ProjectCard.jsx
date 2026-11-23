import { Link } from 'react-router-dom';
import { categoryById, isDraft, isFounderWork } from '../workContent.js';
import { Media } from './Gallery.jsx';
import Reveal from './Reveal.jsx';

// Image-led portfolio card: category + title always visible over the photo
// (so they read on touch devices), scope and location underneath.
export function ProjectCard({ project: p, headingLevel: H = 'h3' }) {
  const category = categoryById(p.categories[0]);
  const founder = isFounderWork(p);
  const meta = founder
    ? [p.roles?.[0]?.role, p.roles?.length > 1 ? `${p.roles.length} roles` : p.roles?.[0]?.dates].filter(Boolean).join(' · ')
    : [p.location, p.scope].filter(Boolean).join(' · ');
  return (
    <Link to={`/work/${p.slug}`} className="wk-card">
      <div className="wk-card-photo">
        <Media img={p.cover ? { ...p.cover, caption: 'Cover photo needed' } : { caption: 'Cover photo needed' }} sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 400px" />
        <div className="wk-card-shade" aria-hidden="true" />
        <div className="wk-card-tags">
          {founder ? <span className="wk-tag">Founder experience</span> : category && <span className="wk-tag">{category.label}</span>}
          {p.status === 'in-progress' && <span className="wk-tag wk-tag--light">In progress</span>}
          {isDraft(p) && <span className="ev-draft-tag wk-tag-draft">Draft · not published</span>}
        </div>
        <H className="wk-card-title">{p.title}<span className="wk-card-arrow" aria-hidden="true"> →</span></H>
      </div>
      {meta && <p className="wk-card-meta">{meta}</p>}
    </Link>
  );
}

// "Selected work" band: up to `limit` projects, optionally limited to some
// categories. Renders nothing when there's no published work to show.
export default function ProjectShowcase({ id, eyebrow = 'SELECTED WORK', title = 'Selected Work', intro, projects, limit = 3, allHref = '/work', allLabel = 'View all work' }) {
  const list = projects.slice(0, limit);
  if (!list.length) return null;
  return (
    <section className="ev-section wk-showcase" aria-labelledby={id}>
      <div className="ev-shell">
        <Reveal className="wk-showcase-head">
          <div>
            <div className="league-eyebrow" style={{ marginBottom: '18px' }}>{eyebrow}</div>
            <h2 id={id} className="league-h2">{title}</h2>
            {intro && <p className="league-lede">{intro}</p>}
          </div>
          <Link to={allHref} className="hx-link wk-showcase-all">{allLabel} <span aria-hidden="true" className="hx-arrow">→</span></Link>
        </Reveal>
        <ul className="wk-grid">
          {list.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i % 3}><ProjectCard project={p} /></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

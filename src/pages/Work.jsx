import { useCallback, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import ExperienceTimeline from '../components/ExperienceTimeline.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { ACTIVE_CATEGORIES, FOUNDER_WORK, KORE_PROJECTS, categoryById } from '../workContent.js';
import { track } from '../lib/analytics.js';

// Filters are plain links (/work?category=decor), so a filtered view can be
// shared, opens pre-filtered, and Back/Forward step through filter changes.
function Filters({ active }) {
  if (!ACTIVE_CATEGORIES.length) return null;
  const chip = (to, label, current) => (
    <Link key={to} to={to} className={`wk-filter${current ? ' is-active' : ''}`} aria-current={current ? 'page' : undefined} preventScrollReset>
      {label}
    </Link>
  );
  return (
    <nav className="wk-filters" aria-label="Filter work by type">
      {chip('/work', 'All Work', !active)}
      {ACTIVE_CATEGORIES.map((c) => chip(`/work?category=${c.id}`, c.label, active === c.id))}
    </nav>
  );
}

function CardGrid({ projects }) {
  return (
    <ul className="wk-grid">
      {projects.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={i % 3}><ProjectCard project={p} headingLevel="h3" /></Reveal>
      ))}
    </ul>
  );
}

// Krish's own roles, kept apart from KORE 360's projects.
function FounderExperience() {
  return (
    <section className="wk-xp" aria-labelledby="wk-xp-title">
      <div className="wk-xp-head">
        <h2 id="wk-xp-title" className="wk-h2">Krish Lalwani&apos;s experience</h2>
        <p className="wk-xp-note">Roles Krish has held himself across cricket leagues and sporting events, listed separately from KORE 360&apos;s own projects.</p>
      </div>
      {FOUNDER_WORK.length > 0 && <CardGrid projects={FOUNDER_WORK} />}
      <h3 className="wk-xp-sub">Full timeline</h3>
      <ExperienceTimeline />
    </section>
  );
}

export default function Work() {
  const [params] = useSearchParams();
  const category = categoryById(params.get('category'));
  const showFounder = !category || category.id === 'experience';
  const kore = category ? KORE_PROJECTS.filter((p) => p.categories.includes(category.id)) : KORE_PROJECTS;
  const [enquiry, setEnquiry] = useState({ open: false, service: undefined });

  const enquire = useCallback((service, source) => {
    setEnquiry({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '', source });
  }, []);

  return (
    <>
      <PageMeta
        title={category ? `${category.label}: Our Work` : 'Our Work: Event Portfolio'}
        description="Event work by KORE 360 and the league experience of its founder, Krish Lalwani: Legends League Cricket, Entertainers Cricket League, C11CL and more."
        path={category ? `/work?category=${category.id}` : '/work'}
      />
      <header className="wk-header">
        <div className="ev-shell">
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>OUR WORK</div>
          <h1 className="wk-title">{category ? category.label : 'Work'}</h1>
          <p className="wk-intro">
            {category?.id === 'experience'
              ? 'The leagues and events Krish Lalwani has worked on, and the roles he held.'
              : 'Events we’ve planned and delivered, and the league experience behind them.'}
          </p>
        </div>
      </header>

      <div className="ev-shell wk-page">
        <Filters active={category?.id} />

        {category?.id !== 'experience' && (kore.length > 0 ? (
          <section aria-labelledby="wk-kore-title" className="wk-kore">
            <h2 id="wk-kore-title" className={category ? 'sr-only' : 'wk-h2'}>KORE 360 projects</h2>
            <CardGrid projects={kore} />
          </section>
        ) : (
          <div className="wk-note">
            <div>
              <h2 className="wk-note-title">{category ? `No published ${category.label.toLowerCase()} projects yet` : 'KORE 360 case studies are on their way'}</h2>
              <p>Tell us about your event and we&apos;ll walk you through the work closest to your brief.</p>
            </div>
            <button type="button" className="hx-btn hx-btn--primary" onClick={() => enquire(category?.service, category ? 'work_empty_category' : 'work_empty')} aria-haspopup="dialog">Tell Us About Your Event</button>
          </div>
        ))}

        {showFounder && <FounderExperience />}
      </div>

      <section className="wk-band" aria-labelledby="wk-band-title">
        <div className="ev-shell wk-band-inner">
          <div>
            <h2 id="wk-band-title" className="league-h2" style={{ fontSize: 'clamp(26px,3.4vw,40px)', margin: '0 0 10px' }}>Planning something similar?</h2>
            <p className="league-lede">Tell us about the event. Every project is scoped to the brief.</p>
          </div>
          <button type="button" className="hx-btn hx-btn--primary" onClick={() => enquire(category?.service, 'work_footer')} aria-haspopup="dialog">Tell Us About Your Event</button>
        </div>
      </section>

      <EventEnquiryModal open={enquiry.open} onClose={() => setEnquiry((e) => ({ ...e, open: false }))} initialService={enquiry.service} />
    </>
  );
}

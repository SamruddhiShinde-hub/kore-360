import { useCallback, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { ACTIVE_CATEGORIES, categoryById, projectsIn } from '../workContent.js';
import { EVENT_CAPABILITIES } from '../eventsContent.js';
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

export default function Work() {
  const [params] = useSearchParams();
  const category = categoryById(params.get('category'));
  const projects = projectsIn(category?.id);
  const [enquiry, setEnquiry] = useState({ open: false, service: undefined });

  const enquire = useCallback((service, source) => {
    setEnquiry({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '', source });
  }, []);

  return (
    <>
      <PageMeta
        title={category ? `${category.label}: Our Work` : 'Our Work: Event Portfolio'}
        description="Event projects delivered by KORE 360: décor and venue styling, sports leagues, corporate events, brand activations and production."
        path={category ? `/work?category=${category.id}` : '/work'}
      />
      <header className="wk-header">
        <div className="ev-shell">
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>OUR WORK</div>
          <h1 className="wk-title">{category ? category.label : 'Work'}</h1>
          <p className="wk-intro">Events we&apos;ve planned and delivered, with what KORE 360 handled on each one.</p>
        </div>
      </header>

      <div className="ev-shell wk-page">
        <Filters active={category?.id} />
        <p className="sr-only" aria-live="polite">{projects.length} {projects.length === 1 ? 'project' : 'projects'} shown</p>

        {projects.length > 0 ? (
          <ul className="wk-grid">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i % 3}><ProjectCard project={p} headingLevel="h2" /></Reveal>
            ))}
          </ul>
        ) : category ? (
          <div className="wk-empty">
            <h2 className="wk-empty-title">No published {category.label.toLowerCase()} projects yet</h2>
            <p>We can walk you through relevant work on a call. Tell us about your event and we&apos;ll come back with examples that match your brief.</p>
            <div className="hx-ctas">
              <button type="button" className="hx-btn hx-btn--primary" onClick={() => enquire(category.service, 'work_empty_category')} aria-haspopup="dialog">Tell Us About Your Event</button>
              <Link to="/work" className="hx-link">See all work <span aria-hidden="true" className="hx-arrow">→</span></Link>
            </div>
          </div>
        ) : (
          <div className="wk-empty">
            <h2 className="wk-empty-title">Case studies are on their way</h2>
            <p>We&apos;re putting together full write-ups and galleries from recent events. In the meantime, tell us what you&apos;re planning and we&apos;ll share the work that&apos;s closest to your brief.</p>
            <ul className="wk-empty-services">
              {EVENT_CAPABILITIES.map((c) => (
                <li key={c.id}>
                  <button type="button" className="wk-empty-service" onClick={() => enquire(c.service, 'work_empty')} aria-haspopup="dialog">
                    <span>{c.name}</span><span aria-hidden="true" className="hx-arrow">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <section className="wk-band" aria-labelledby="wk-band-title">
          <div className="ev-shell wk-band-inner">
            <div>
              <h2 id="wk-band-title" className="league-h2" style={{ fontSize: 'clamp(26px,3.4vw,40px)', margin: '0 0 10px' }}>Planning something similar?</h2>
              <p className="league-lede">Tell us about the event. Every project is scoped to the brief.</p>
            </div>
            <button type="button" className="hx-btn hx-btn--primary" onClick={() => enquire(category?.service, 'work_footer')} aria-haspopup="dialog">Tell Us About Your Event</button>
          </div>
        </section>
      )}

      <EventEnquiryModal open={enquiry.open} onClose={() => setEnquiry((e) => ({ ...e, open: false }))} initialService={enquiry.service} />
    </>
  );
}


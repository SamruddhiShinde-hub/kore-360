import { useCallback, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import Gallery, { Media } from '../components/Gallery.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { VISIBLE_PROJECTS, categoryById, findProject, formatProjectDate, isDraft, isFounderWork, orderedGallery } from '../workContent.js';
import { track } from '../lib/analytics.js';

// Click-to-play: nothing downloads until asked for.
function ProjectVideo({ video, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="wk-video">
      {playing ? (
        <video src={video.src} poster={video.poster} controls autoPlay playsInline preload="metadata">
          {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
        </video>
      ) : (
        <button type="button" className="wk-video-poster" onClick={() => { setPlaying(true); track('video_start', { item_id: title }); }} aria-label={`Play the ${title} video`}>
          {video.poster && <img src={video.poster} alt="" loading="lazy" decoding="async" />}
          <span className="wk-video-play" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Project() {
  const { slug } = useParams();
  const p = findProject(slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  if (!p) return <Navigate to="/work" replace />;

  const primary = categoryById(p.categories[0]);
  const gallery = orderedGallery(p);
  const founder = isFounderWork(p);
  // Same kind (KORE 360 project vs founder experience) first, then a shared category.
  const score = (o) => (isFounderWork(o) === founder ? 2 : 0) + (o.categories.some((c) => p.categories.includes(c)) ? 1 : 0);
  const related = VISIBLE_PROJECTS.filter((o) => o.slug !== p.slug).sort((a, b) => score(b) - score(a))[0];
  const portraitCover = p.cover && p.cover.h > p.cover.w;
  const facts = [
    ['Client', p.client],
    ['Location', p.location],
    ['Date', formatProjectDate(p.date)],
    ['Scope', p.scope],
    ['Scale', p.scale],
    ['Status', p.status === 'in-progress' ? 'In progress' : ''],
  ].filter(([, v]) => v);

  const openEnquiry = () => {
    setEnquiryOpen(true);
    track('event_enquiry_opened', { lead_type: 'event', service: primary?.service || '', source: 'project', item_id: p.slug });
  };

  return (
    <article className="wk-project">
      <PageMeta title={`${p.title}: Our Work`} description={p.role || `${p.title}, an event project by KORE 360.`} path={`/work/${p.slug}`} />

      <header className="wk-header wk-header--project">
        <div className="ev-shell">
          <Link to={primary ? `/work?category=${primary.id}` : '/work'} className="wk-back">
            <span aria-hidden="true">←</span> {primary ? primary.label : 'All work'}
          </Link>
          {founder && <div className="wk-founder-chip">Founder experience · Krish Lalwani&apos;s role</div>}
          {isDraft(p) && <div className="ev-draft-tag" style={{ marginBottom: '14px' }}>Draft · not published{p.cover?.placeholder ? ' · placeholder imagery' : ''}</div>}
          <h1 className="wk-title">{p.title}</h1>
          <div className="wk-project-tags">
            {p.categories.map((c) => categoryById(c)).filter(Boolean).map((c) => (
              <Link key={c.id} to={`/work?category=${c.id}`} className="wk-tag wk-tag--outline">{c.label}</Link>
            ))}
          </div>
          {p.role && <p className="wk-intro wk-role">{p.role}</p>}
        </div>
      </header>

      <div className={`wk-cover${portraitCover ? ' wk-cover--portrait' : ''}`}>
        <Media img={p.cover ? { ...p.cover, caption: 'Cover photo needed' } : { caption: 'Cover photo needed' }} eager sizes="100vw" />
      </div>

      <div className="ev-shell wk-project-body">
        {facts.length > 0 && (
          <dl className="wk-facts">
            {facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        )}

        {p.roles?.length > 0 && (
          <section aria-labelledby="wk-roles-title" className="wk-section">
            <h2 id="wk-roles-title" className="wk-h2">{p.roles.length > 1 ? 'Krish’s roles' : 'Krish’s role'}</h2>
            <ol className="xp-timeline">
              {p.roles.map((r) => (
                <li key={`${r.role}-${r.dates}`} className="xp-row">
                  <span className="xp-dates">{r.dates}</span>
                  <span className="xp-main"><span className="xp-org">{r.role}</span></span>
                  {r.location && <span className="xp-loc">{r.location}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {gallery.length > 0 && (
          <section aria-labelledby="wk-gallery-title" className="wk-section">
            <h2 id="wk-gallery-title" className="wk-h2">{p.categories.includes('decor') ? 'The walkthrough' : 'Gallery'}</h2>
            <p className="wk-hint">Select a photo to view it full screen. Use the arrow keys or swipe to move between photos.</p>
            <Gallery images={gallery} label={p.title} />
          </section>
        )}

        {p.video?.src && (
          <section aria-labelledby="wk-video-title" className="wk-section">
            <h2 id="wk-video-title" className="wk-h2">Watch</h2>
            <ProjectVideo video={p.video} title={p.title} />
          </section>
        )}

        {p.credits.length > 0 && (
          <section aria-labelledby="wk-credits-title" className="wk-section">
            <h2 id="wk-credits-title" className="wk-h2">Credits</h2>
            <dl className="wk-credits">
              {p.credits.map((c) => <div key={`${c.role}-${c.name}`}><dt>{c.role}</dt><dd>{c.name}</dd></div>)}
            </dl>
          </section>
        )}
      </div>

      <section className="wk-band" aria-labelledby="wk-cta-title">
        <div className="ev-shell wk-band-inner">
          <div>
            <h2 id="wk-cta-title" className="league-h2" style={{ fontSize: 'clamp(26px,3.4vw,40px)', margin: '0 0 10px' }}>Discuss a similar event</h2>
            <p className="league-lede">Tell us what you&apos;re planning and we&apos;ll scope it to your brief.</p>
          </div>
          <button type="button" className="hx-btn hx-btn--primary" onClick={openEnquiry} aria-haspopup="dialog">Discuss a Similar Event</button>
        </div>
      </section>

      {related && (
        <section className="ev-section" aria-labelledby="wk-related-title">
          <Reveal className="ev-shell">
            <h2 id="wk-related-title" className="wk-h2">Related project</h2>
            <div className="wk-related"><ProjectCard project={related} /></div>
          </Reveal>
        </section>
      )}

      <EventEnquiryModal open={enquiryOpen} onClose={closeEnquiry} initialService={primary?.service} initialProject={`Similar to: ${p.title}`} />
    </article>
  );
}

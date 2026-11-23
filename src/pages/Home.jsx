import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import ProjectShowcase from '../components/ProjectCard.jsx';
import EventMetrics from '../components/EventMetrics.jsx';
import { openConnectPopup } from '../components/ConnectPopup.jsx';
import { track } from '../lib/analytics.js';
import { usePrefersReducedMotion } from '../lib/motion.js';
import { HOME_PROCESS } from '../data.js';
import { EVENT_CAPABILITIES, FOUNDER, KORE_RELATIONSHIPS, visibleLogos, EVENT_METRICS } from '../eventsContent.js';
import { VISIBLE_PROJECTS, projectsIn } from '../workContent.js';
import { SHOW_DRAFTS } from '../lib/drafts.js';

// Served from public/home/ (not hashed src/assets imports) so index.html can
// preload the hero poster by a stable URL. The hero videos are silent
// (audio track removed) 10-second H.264 loops — 720p for desktop, 480p for
// phones — and the poster is the first frame.
const HERO_VIDEO_DESKTOP = '/home/hero-desktop-v2.mp4';
const HERO_VIDEO_MOBILE = '/home/hero-mobile-v2.mp4';
const HERO_POSTER = '/home/hero-poster.webp';

function Arrow() {
  return <span aria-hidden="true" className="hx-arrow">→</span>;
}

function SectionHead({ eyebrow, title, id, intro }) {
  return (
    <Reveal className="hx-head">
      <div className="hx-eyebrow">{eyebrow}</div>
      <h2 id={id} className="hx-h2">{title}</h2>
      {intro && <p className="hx-lede">{intro}</p>}
    </Reveal>
  );
}

// Data-saver connections and reduced-motion visitors get the still poster
// only; the headline and CTAs are plain HTML either way, so the first
// screen works before (or without) the video.
function useHeroVideo() {
  const reduced = usePrefersReducedMotion();
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;
  return !reduced && !saveData;
}

function HomeHero({ onEnquire }) {
  const videoRef = useRef(null);
  const playVideo = useHeroVideo();
  // <video> has no media-query <source> support everywhere, so pick the file
  // once on mount — phones get the lighter 480p encode.
  const [src] = useState(() => (window.matchMedia('(max-width: 768px)').matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP));

  // React sets `muted` as a property rather than an attribute, which some
  // mobile browsers don't count as muted for autoplay — set it explicitly and
  // kick off playback. If autoplay is still blocked (e.g. iOS Low Power Mode),
  // retry on the visitor's first touch; the poster shows until then.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    v.muted = true;
    v.setAttribute('muted', '');
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', tryPlay);
  }, [playVideo]);

  return (
    <section className="hx-hero" aria-labelledby="hx-hero-title">
      {playVideo ? (
        <video
          ref={videoRef} className="hx-hero-img" src={src} poster={HERO_POSTER}
          autoPlay muted loop playsInline preload="auto" disablePictureInPicture
          aria-hidden="true" tabIndex={-1}
        />
      ) : (
        <img className="hx-hero-img" src={HERO_POSTER} alt="" aria-hidden="true" fetchpriority="high" decoding="async" width="1280" height="720" />
      )}
      <div className="hx-hero-shade" aria-hidden="true" />
      <div className="hx-hero-content">
        <div className="hx-eyebrow hx-eyebrow--hero">SPORTS • CORPORATE • BRAND EXPERIENCES</div>
        <h1 id="hx-hero-title" className="hx-hero-title">
          <span className="hx-hero-line">Live events,</span>
          <span className="hx-hero-line hx-hero-title-accent">from brief to show day.</span>
        </h1>
        <p className="hx-hero-copy">
          KORE 360 plans and delivers sports leagues, corporate events and brand experiences, from venue setup to live production.
        </p>
        <div className="hx-ctas">
          <Link to="/work" className="hx-btn hx-btn--primary">View Our Work <Arrow /></Link>
          <button type="button" className="hx-btn hx-btn--ghost" onClick={() => onEnquire(undefined, 'home_hero')} aria-haspopup="dialog">Tell Us About Your Event <Arrow /></button>
        </div>
      </div>
    </section>
  );
}

// One tile per capability. A tile with published work opens that portfolio
// filter; otherwise it points at the matching service on /events (or, with
// no section to show, straight to the enquiry form pre-filled with it).
function Capabilities({ onEnquire }) {
  return (
    <section id="services" className="hx-section hx-section--charcoal" aria-labelledby="hx-services">
      <div className="hx-shell">
        <SectionHead
          eyebrow="WHAT WE DELIVER" id="hx-services" title="Event capabilities."
          intro="Choose the kind of event you're planning to see the work and what we cover. Every project is scoped to the brief."
        />
        <ul className="hx-caps">
          {EVENT_CAPABILITIES.map((c, i) => {
            const hasWork = c.category && projectsIn(c.category).length > 0;
            return (
              <Reveal as="li" key={c.id} delay={i % 4} className="hx-cap">
                <span className="hx-cap-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="hx-cap-name">{c.name}</h3>
                <p className="hx-cap-desc">{c.desc}</p>
                <div className="hx-cap-actions">
                  {hasWork ? (
                    <Link to={`/work?category=${c.category}`} className="hx-link">See the work <Arrow /></Link>
                  ) : c.anchor ? (
                    <Link to={c.anchor} className="hx-link">What&apos;s included <Arrow /></Link>
                  ) : null}
                  <button type="button" className="hx-cap-enquire" onClick={() => onEnquire(c.service, 'home_capability')} aria-haspopup="dialog">
                    Enquire<span className="sr-only"> about {c.name}</span>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Verified figures and KORE 360 client/partner marks only — each part
// hides itself until it has approved content.
function Credibility() {
  const logos = visibleLogos(KORE_RELATIONSHIPS);
  const hasMetrics = EVENT_METRICS.some((m) => m.approved && m.value != null) || SHOW_DRAFTS;
  if (!logos.length && !hasMetrics) return null;
  return (
    <>
      <EventMetrics />
      {logos.length > 0 && (
        <section className="hx-marks" aria-label="Clients and partners">
          <ul className="hx-shell hx-marks-row">
            {logos.map((l) => <li key={l.name}><img src={l.logo} alt={l.name} loading="lazy" decoding="async" /></li>)}
          </ul>
        </section>
      )}
    </>
  );
}

// Founder + delivery approach in one section (replaces the separate
// founder, "how we work" and "why us" blocks).
function FounderAndTeam() {
  return (
    <section className="hx-section" aria-labelledby="hx-founder">
      <div className="hx-shell hx-team">
        <Reveal className="hx-photo hx-team-photo">
          <img src={FOUNDER.portrait} alt={FOUNDER.portraitAlt} loading="lazy" decoding="async" width={FOUNDER.portraitW} height={FOUNDER.portraitH} style={{ objectPosition: FOUNDER.focal }} />
        </Reveal>
        <Reveal delay={1}>
          <div className="hx-eyebrow">THE PEOPLE BEHIND KORE 360</div>
          <h2 id="hx-founder" className="hx-h2 hx-h2--gateway">One team, from brief to show day.</h2>
          <p className="hx-body">{FOUNDER.short}</p>
          <ol className="hx-team-steps">
            {HOME_PROCESS.map((p) => (
              <li key={p.step}><span className="hx-team-step-name">{p.name}</span><span className="hx-team-step-desc">{p.desc}</span></li>
            ))}
          </ol>
          <Link to="/about" className="hx-link">Meet the team <Arrow /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function Gateways() {
  return (
    <div className="hx-gateways">
      <section className="hx-gateway hx-gateway--light" aria-labelledby="hx-education">
        <Reveal className="hx-gateway-card">
          <div className="hx-eyebrow">FOR STUDENTS & CAREER-SWITCHERS</div>
          <h2 id="hx-education" className="hx-h2 hx-h2--gateway">KORE 360 Education</h2>
          <p className="hx-body">Learn how sports management hiring actually works, from a ₹99 e-book to a 1:1 Clarity Call with Krish.</p>
          <Link to="/education" className="hx-btn hx-btn--dark">Explore Education <Arrow /></Link>
        </Reveal>
      </section>
      <section className="hx-gateway hx-gateway--talent" aria-labelledby="hx-talent">
        <Reveal className="hx-gateway-card">
          <div className="hx-eyebrow">FOR CANDIDATES & EMPLOYERS</div>
          <h2 id="hx-talent" className="hx-h2 hx-h2--gateway">KORE 360 Talent</h2>
          <p className="hx-body">Internships, jobs and recruitment drives with brands working in and around sport.</p>
          <Link to="/talent" className="hx-btn hx-btn--ghost">Explore Talent <Arrow /></Link>
        </Reveal>
      </section>
    </div>
  );
}

function FinalCta({ onEnquire }) {
  return (
    <section className="league-cta" aria-labelledby="hx-final">
      <div className="league-cta-glow" aria-hidden="true" />
      <Reveal className="league-shell" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="league-eyebrow" style={{ marginBottom: '18px' }}>LET'S BUILD SOMETHING</div>
        <h2 id="hx-final" className="league-cta-title">Have an event in mind?</h2>
        <p className="league-cta-text">
          From a sporting league to a corporate experience or brand activation, tell us what you're planning. Let's explore how KORE 360 can bring it together.
        </p>
        <div className="hx-ctas hx-ctas--center">
          <button type="button" onClick={() => onEnquire(undefined, 'home_final')} className="hx-btn hx-btn--primary" aria-haspopup="dialog">Tell Us About Your Event <Arrow /></button>
          <button type="button" onClick={openConnectPopup} className="hx-btn hx-btn--ghost" aria-haspopup="dialog">Contact KORE 360 <Arrow /></button>
        </div>
      </Reveal>
    </section>
  );
}

// Selected Work: aim for one décor/venue, one sports and one corporate or
// brand project — the first visible project from each, topped up in order.
function pickSelected() {
  const picked = [];
  [['decor'], ['sports'], ['corporate', 'activations']].forEach((group) => {
    const p = VISIBLE_PROJECTS.find((x) => !picked.includes(x) && x.categories.some((c) => group.includes(c)));
    if (p) picked.push(p);
  });
  VISIBLE_PROJECTS.forEach((p) => { if (picked.length < 3 && !picked.includes(p)) picked.push(p); });
  return picked;
}

export default function Home() {
  const [event, setEvent] = useState({ open: false, service: undefined });

  const openEvent = useCallback((service, source = 'homepage') => {
    setEvent({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '', source });
  }, []);
  const closeEvent = useCallback(() => setEvent((e) => ({ ...e, open: false })), []);

  return (
    <div className="home">
      <PageMeta
        fullTitle="KORE 360 | Sports & Event Management Company"
        description="KORE 360 plans and delivers sports leagues, corporate events and brand experiences, from venue setup and décor to live production."
        path="/"
      />
      <HomeHero onEnquire={openEvent} />
      <ProjectShowcase
        id="hx-work" eyebrow="SELECTED WORK" title="Selected Work"
        intro="Recent events and what KORE 360 delivered on each."
        projects={pickSelected()}
      />
      <Capabilities onEnquire={openEvent} />
      <Credibility />
      <FounderAndTeam />
      <Gateways />
      <FinalCta onEnquire={openEvent} />
      <EventEnquiryModal open={event.open} onClose={closeEvent} initialService={event.service} />
    </div>
  );
}

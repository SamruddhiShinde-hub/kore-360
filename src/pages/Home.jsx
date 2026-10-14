import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import LeagueEnquiryModal from '../components/LeagueEnquiryModal.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import { openConnectPopup } from '../components/ConnectPopup.jsx';
import { track } from '../lib/analytics.js';
import { HOME_SERVICES, KORE_PROJECTS, INDUSTRY_EXPERIENCE, LEAGUE_ENGAGEMENTS, HOME_PROCESS, HOME_WHY } from '../data.js';

// Served from public/home/ (not hashed src/assets imports) so index.html can
// preload the hero poster by a stable URL. The hero videos are silent
// (audio track removed) H.264 re-encodes of src/assets/new-hero-video.mp4 —
// 720p for desktop, 480p for phones — and the poster is its first frame.
// The other photos are generated from the real event photos in src/assets
// with sharp — see the homepage revamp notes.
const HERO_VIDEO_DESKTOP = '/home/hero-desktop.mp4';
const HERO_VIDEO_MOBILE = '/home/hero-mobile.mp4';
const HERO_POSTER = '/home/hero-poster.webp';
const IMG_ON_GROUND = '/home/on-ground.webp';
const IMG_MATCH_DAY = '/home/match-day.webp';
const IMG_PITCH_PREP = '/home/pitch-prep.webp';

const LEAGUE_PREVIEW = {
  core: 'Strategic planning and league readiness.',
  launch: 'Event coordination, deployment and execution.',
  scale: 'Deeper league operations and commercial partnership.',
};

function Arrow() {
  return <span aria-hidden="true" className="hx-arrow">→</span>;
}

function SectionHead({ eyebrow, title, id, intro, light }) {
  return (
    <Reveal className="hx-head">
      <div className="hx-eyebrow">{eyebrow}</div>
      <h2 id={id} className={`hx-h2${light ? ' hx-h2--light' : ''}`}>{title}</h2>
      {intro && <p className="hx-lede">{intro}</p>}
    </Reveal>
  );
}

function HomeHero() {
  const videoRef = useRef(null);
  // <video> has no media-query <source> support everywhere, so pick the file
  // once on mount — phones get the lighter 480p encode.
  const [src] = useState(() => (window.matchMedia('(max-width: 768px)').matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP));

  // React sets `muted` as a property rather than an attribute, which some
  // mobile browsers don't count as muted for autoplay — set it explicitly and
  // kick off playback. If autoplay is still blocked (e.g. iOS Low Power Mode),
  // retry on the visitor's first touch; the poster shows until then.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute('muted', '');
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', tryPlay);
  }, []);

  return (
    <section className="hx-hero" aria-labelledby="hx-hero-title">
      <video
        ref={videoRef} className="hx-hero-img" src={src} poster={HERO_POSTER}
        autoPlay muted loop playsInline preload="auto" disablePictureInPicture
        aria-hidden="true" tabIndex={-1}
      />
      <div className="hx-hero-shade" aria-hidden="true" />
      <div className="hx-hero-content">
        <div className="hx-eyebrow hx-eyebrow--hero">SPORTS • CORPORATE • ENTERTAINMENT • EXPERIENCES</div>
        <h1 id="hx-hero-title" className="hx-hero-title">
          <span className="hx-hero-line">From concept to execution.</span>
          <span className="hx-hero-line hx-hero-title-accent">Every angle covered.</span>
        </h1>
        <p className="hx-hero-copy">
          We plan, manage and deliver sports, corporate, entertainment and brand experiences — bringing strategy, production, people and on-ground operations together under one roof.
        </p>
        <div className="hx-ctas">
          <a href="#services" className="hx-btn hx-btn--primary">Explore Our Services <Arrow /></a>
          <a href="#work" className="hx-btn hx-btn--ghost">View Our Work <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="hx-section" aria-labelledby="hx-who">
      <div className="hx-shell hx-split">
        <Reveal>
          <div className="hx-eyebrow">WHO WE ARE</div>
          <h2 id="hx-who" className="hx-h2">One brief.<br />Every angle.</h2>
          <p className="hx-body">
            KORE 360 brings together strategy, management, production, operations and industry expertise to deliver events and experiences with one integrated approach.
          </p>
          <p className="hx-body">
            From sporting leagues and corporate events to brand activations and live experiences, we connect the moving parts that turn ideas into execution.
          </p>
          <Link to="/about" className="hx-link">Discover KORE 360 <Arrow /></Link>
        </Reveal>
        <Reveal delay={1} className="hx-photo hx-photo--tall">
          <img src={IMG_ON_GROUND} alt="On-ground coordination pitch-side at a live cricket event" loading="lazy" decoding="async" width="1200" height="799" />
        </Reveal>
      </div>
    </section>
  );
}

function Services({ onEnquire }) {
  return (
    <section id="services" className="hx-section hx-section--charcoal" aria-labelledby="hx-services">
      <div className="hx-shell">
        <SectionHead
          eyebrow="WHAT WE DO" id="hx-services" title="Experiences built from every angle."
          intro="From planning and production to people and operations, our services bring every essential part of an event together."
        />
        <ol className="hx-services">
          {HOME_SERVICES.map((s, i) => (
            <li key={s.id}>
              <Reveal className="hx-service">
                <span className="hx-service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="hx-service-name">{s.name}</h3>
                <p className="hx-service-desc">{s.desc}</p>
                {s.to ? (
                  <Link to={s.to} className="hx-link hx-service-cta">{s.cta} <Arrow /></Link>
                ) : (
                  <button type="button" className="hx-link hx-service-cta" onClick={() => onEnquire(s.name)} aria-haspopup="dialog">{s.cta} <Arrow /></button>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const meta = [p.category, p.location, p.year].filter(Boolean).join(' · ');
  const inner = (
    <>
      {p.img && <div className="hx-photo"><img src={p.img} alt={p.imgAlt || p.name} loading="lazy" decoding="async" /></div>}
      <div className="hx-project-meta">{meta}</div>
      <h4 className="hx-project-name">{p.name}</h4>
      {p.involvement && <p className="hx-project-role">{p.involvement}</p>}
    </>
  );
  return p.href ? <Link to={p.href} className="hx-project">{inner}</Link> : <div className="hx-project">{inner}</div>;
}

function SelectedWork() {
  return (
    <section id="work" className="hx-section" aria-labelledby="hx-work">
      <div className="hx-shell">
        <SectionHead
          eyebrow="OUR EXPERIENCE" id="hx-work" title="The work behind the experience."
          intro="Explore the projects, operations and industry experience shaping how KORE 360 approaches every brief."
        />

        {KORE_PROJECTS.length > 0 && (
          <div className="hx-work-group">
            <h3 className="hx-h3">KORE 360 projects</h3>
            <div className="hx-projects">
              {KORE_PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
            </div>
          </div>
        )}

        <div className="hx-work-group hx-split hx-split--wide">
          <Reveal className="hx-photo hx-photo--square">
            <img src={IMG_MATCH_DAY} alt="Pitch-side operations with players at a live cricket league match" loading="lazy" decoding="async" width="1074" height="945" />
          </Reveal>
          <Reveal delay={1}>
            <h3 className="hx-h3">Founder &amp; team industry experience</h3>
            <p className="hx-note">
              Sporting properties our founder and team have worked on in their individual professional capacities. These are not KORE 360 client engagements.
            </p>
            <ul className="hx-experience">
              {INDUSTRY_EXPERIENCE.map((e) => (
                <li key={e.name}>
                  <span className="hx-experience-name">{e.name}</span>
                  <span className="hx-experience-meta">{[e.category, e.location].filter(Boolean).join(' · ')}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LeagueFeature({ onLeagueEnquire }) {
  return (
    <section className="hx-section hx-section--charcoal hx-league" aria-labelledby="hx-league">
      <div className="hx-shell">
        <SectionHead
          eyebrow="SPORTS & LEAGUE MANAGEMENT" id="hx-league"
          title={<>Beyond match day.<br />Behind the business.</>}
          intro="From league planning and operational readiness to active event execution and long-term growth, KORE 360 supports sporting properties at different stages of their journey."
        />
        <div className="hx-models">
          {LEAGUE_ENGAGEMENTS.map((m, i) => (
            <Reveal key={m.id} delay={i} className="hx-model">
              <div className="hx-model-name">{m.name}</div>
              <div className="hx-model-descriptor">{m.descriptor}</div>
              <p className="hx-model-line">{LEAGUE_PREVIEW[m.id]}</p>
            </Reveal>
          ))}
        </div>
        <div className="hx-ctas">
          <button type="button" className="hx-btn hx-btn--primary" onClick={onLeagueEnquire} aria-haspopup="dialog">Tell Us About Your League <Arrow /></button>
          <Link to="/events" className="hx-btn hx-btn--ghost">Explore League Management <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="hx-section" aria-labelledby="hx-process">
      <div className="hx-shell">
        <SectionHead eyebrow="OUR APPROACH" id="hx-process" title="From the first brief to the final moment." />
        <ol className="hx-process">
          {HOME_PROCESS.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i} className="hx-step">
              <span className="hx-step-num">{p.step}</span>
              <h3 className="hx-step-name">{p.name}</h3>
              <p className="hx-step-desc">{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyKore() {
  return (
    <section className="hx-section hx-section--charcoal" aria-labelledby="hx-why">
      <div className="hx-shell">
        <SectionHead eyebrow="WHY KORE 360" id="hx-why" title="One team. One vision. Every detail." />
        <div className="hx-why">
          {HOME_WHY.map((w, i) => (
            <Reveal key={w.name} delay={i} className="hx-why-item">
              <h3 className="hx-why-name">{w.name}</h3>
              <p className="hx-why-desc">{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="hx-section" aria-labelledby="hx-founder">
      <div className="hx-shell hx-split hx-split--reverse">
        <Reveal className="hx-photo hx-photo--wide">
          <img src={IMG_PITCH_PREP} alt="Ground staff marking out the pitch ahead of a live cricket match" loading="lazy" decoding="async" width="1400" height="932" />
        </Reveal>
        <Reveal delay={1}>
          <div className="hx-eyebrow">THE PEOPLE BEHIND KORE 360</div>
          <h2 id="hx-founder" className="hx-h2">Built on experience.<br />Driven by execution.</h2>
          <p className="hx-body">
            Founded by Krish Lalwani, KORE 360 brings an on-ground understanding of sporting events, league operations and the wider events ecosystem into an integrated event management business.
          </p>
          <p className="hx-body">
            The company's approach is shaped by practical experience, attention to operational detail and the belief that every successful experience begins long before event day.
          </p>
          <Link to="/about" className="hx-link">Our Story <Arrow /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function EducationGateway() {
  return (
    <section className="hx-gateway hx-gateway--light" aria-labelledby="hx-education">
      <Reveal className="hx-shell hx-gateway-inner">
        <div>
          <div className="hx-eyebrow">KORE 360 EDUCATION</div>
          <h2 id="hx-education" className="hx-h2 hx-h2--gateway">Want to build a career in sports?</h2>
          <p className="hx-body">Explore the sports industry through career guidance, learning resources, mentorship and real-world industry insights.</p>
        </div>
        <Link to="/education" className="hx-btn hx-btn--dark">Explore Education <Arrow /></Link>
      </Reveal>
    </section>
  );
}

function TalentGateway() {
  return (
    <section className="hx-gateway hx-gateway--talent" aria-labelledby="hx-talent">
      <Reveal className="hx-shell hx-gateway-inner">
        <div>
          <div className="hx-eyebrow">KORE 360 TALENT</div>
          <h2 id="hx-talent" className="hx-h2 hx-h2--small">Connecting people with the industry.</h2>
          <p className="hx-body">Supporting event workforce requirements, talent partnerships and industry opportunities through a connected sports and events ecosystem.</p>
        </div>
        <Link to="/talent" className="hx-btn hx-btn--ghost">Explore Talent <Arrow /></Link>
      </Reveal>
    </section>
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
          <button type="button" onClick={() => onEnquire()} className="hx-btn hx-btn--primary" aria-haspopup="dialog">Tell Us About Your Event <Arrow /></button>
          <button type="button" onClick={openConnectPopup} className="hx-btn hx-btn--ghost" aria-haspopup="dialog">Contact KORE 360 <Arrow /></button>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [event, setEvent] = useState({ open: false, service: undefined });

  const openEvent = useCallback((service) => {
    setEvent({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '' });
  }, []);
  const closeEvent = useCallback(() => setEvent((e) => ({ ...e, open: false })), []);
  const openLeague = useCallback(() => {
    setLeagueOpen(true);
    track('league_enquiry_opened', { lead_type: 'league_management', source: 'homepage' });
  }, []);
  const closeLeague = useCallback(() => setLeagueOpen(false), []);

  return (
    <div className="home">
      <PageMeta
        fullTitle="KORE 360 | Sports & Event Management Company"
        description="KORE 360 provides sports and event management, corporate events, brand activations, production, hospitality and league operations services."
        path="/"
      />
      <HomeHero />
      <WhoWeAre />
      <Services onEnquire={openEvent} />
      <SelectedWork />
      <LeagueFeature onLeagueEnquire={openLeague} />
      <Process />
      <WhyKore />
      <Founder />
      <EducationGateway />
      <TalentGateway />
      <FinalCta onEnquire={openEvent} />
      <LeagueEnquiryModal open={leagueOpen} onClose={closeLeague} />
      <EventEnquiryModal open={event.open} onClose={closeEvent} initialService={event.service} />
    </div>
  );
}

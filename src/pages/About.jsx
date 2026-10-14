import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import { track } from '../lib/analytics.js';
import { INDUSTRY_EXPERIENCE, LINKS } from '../data.js';

// Served from public/about/ — WebP crops of the real event photos in
// src/assets, generated with sharp the same way as public/home/.
const HERO_DESKTOP = '/about/hero-desktop.webp';
const HERO_MOBILE = '/about/hero-mobile.webp';
const IMG_TEAMWORK = '/about/teamwork.webp';
const IMG_FOUNDER = '/about/founder.webp';
const IMG_LEAGUE_OPS = '/about/league-ops.webp';
const IMG_LOGISTICS = '/about/team-logistics.webp';
const IMG_STADIUM = '/about/stadium.webp';

const PRINCIPLES = [
  { name: 'Think beyond the brief', desc: 'Understand the objective, identify the challenges and approach every requirement with a broader perspective.' },
  { name: 'Execute with purpose', desc: 'Bring planning, people and operations together with clear responsibilities and practical solutions.' },
  { name: "Build for what's next", desc: 'Look beyond immediate event delivery to identify opportunities for longer-term relationships, partnerships and growth.' },
];

const VERTICALS = [
  { id: 'events', num: '01', name: 'Events', tagline: 'From strategy to showtime.', desc: 'Sports and league management, corporate events, event operations, production coordination, hospitality, logistics, brand experiences and commercial partnerships.', cta: 'Explore Events', to: '/events' },
  { id: 'education', num: '02', name: 'Education', tagline: 'Sharing the experience behind the industry.', desc: 'Sports management guidance, industry learning resources, mentorship and practical career insights for people seeking to understand the sports ecosystem.', cta: 'Explore Education', to: '/education' },
  { id: 'talent', num: '03', name: 'Talent', tagline: 'Connecting people with opportunities.', desc: 'Event workforce requirements, staffing support, talent partnerships and career opportunities within the wider sports and events industry.', cta: 'Explore Talent', to: '/talent' },
];

const EXPERIENCE_AREAS = [
  { name: 'Professional Cricket & Sporting Leagues', desc: 'Experience in cricket league environments, team logistics and sporting event operations.' },
  { name: 'Team & Event Logistics', desc: 'Travel coordination, accommodation, venue requirements, transport and operational planning.' },
  { name: 'On-Ground Event Operations', desc: 'Supporting the coordination and delivery of time-sensitive sporting events.' },
  { name: 'Stakeholder Coordination', desc: 'Working with teams, event personnel, vendors and operational stakeholders.' },
  { name: 'International Sporting Environments', desc: 'Assignments outside India, including Legends League Cricket in Doha.' },
];

const APPROACH = [
  { step: '01', name: 'Understand', desc: "Start with the client's objectives, requirements and challenges." },
  { step: '02', name: 'Structure', desc: 'Create a clear working model covering responsibilities, resources, timelines and deliverables.' },
  { step: '03', name: 'Execute', desc: 'Coordinate the agreed teams, vendors and operational elements to bring the plan to life.' },
  { step: '04', name: 'Evolve', desc: 'Review the outcome, identify improvements and explore opportunities for future collaboration.' },
];

const ABOUT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About KORE 360',
  url: 'https://kore360.in/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'KORE 360',
    url: 'https://kore360.in/',
    slogan: 'Beyond Every Angle.',
    founder: { '@type': 'Person', name: 'Krish Lalwani', jobTitle: 'Founder', sameAs: [LINKS.krishInstagram] },
    sameAs: [LINKS.instagram],
  },
};

function Arrow() {
  return <span aria-hidden="true" className="hx-arrow">→</span>;
}

function AboutHero() {
  return (
    <section className="hx-hero" aria-labelledby="ab-hero-title">
      <picture>
        <source media="(max-width: 768px)" srcSet={HERO_MOBILE} />
        <img
          src={HERO_DESKTOP} alt="Match-day crew measuring and marking the pitch before a live cricket league game"
          fetchpriority="high" decoding="async" width="1600" height="1065" className="hx-hero-img"
        />
      </picture>
      <div className="hx-hero-shade" aria-hidden="true" />
      <div className="hx-hero-content">
        <div className="hx-eyebrow hx-eyebrow--hero">THE STORY BEHIND KORE 360</div>
        <h1 id="ab-hero-title" className="hx-hero-title">
          <span className="hx-hero-line">Built on experience.</span>
          <span className="hx-hero-line hx-hero-title-accent">Driven by execution.</span>
        </h1>
        <p className="hx-hero-copy">
          KORE 360 is an integrated sports and event management company bringing strategy, operations, partnerships and people together to create meaningful events and experiences.
        </p>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="hx-section" aria-labelledby="ab-who">
      <div className="hx-shell hx-split">
        <Reveal>
          <div className="hx-eyebrow">WHO WE ARE</div>
          <h2 id="ab-who" className="hx-h2">One brief.<br />Every angle.</h2>
          <p className="hx-body">KORE 360 was built around a simple belief: successful events require more than what the audience sees.</p>
          <p className="hx-body">Behind every match, production, brand activation or live experience is a network of people, planning, partnerships and operational decisions working together.</p>
          <p className="hx-body">We bring these elements under one coordinated approach, helping brands, sporting properties and event organizers move from ideas to execution.</p>
          <p className="hx-body">From sports and league management to corporate experiences, hospitality, partnerships and on-ground operations, KORE 360 is built to simplify complexity and bring accountability to every brief.</p>
          <p className="ab-strap">One stop. One brief. <span>Every angle.</span></p>
        </Reveal>
        <Reveal delay={1} className="hx-photo hx-photo--tall">
          <img src={IMG_TEAMWORK} alt="The event crew gathered together on the outfield of a stadium after a cricket league match" loading="lazy" decoding="async" width="1200" height="799" />
        </Reveal>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="hx-section hx-section--charcoal" aria-labelledby="ab-philosophy">
      <div className="hx-shell">
        <div className="ab-philosophy">
          <Reveal>
            <div className="hx-eyebrow">OUR PHILOSOPHY</div>
            <h2 id="ab-philosophy" className="hx-h2">Beyond every angle.</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="ab-lead">An event is never just one moving part.</p>
            <p className="hx-body">It is the venue, the people, the partners, the timelines, the logistics, the audience and the execution coming together.</p>
            <p className="hx-body">At KORE 360, we believe every detail contributes to the bigger experience.</p>
            <p className="hx-body">Our approach connects strategy with execution, ensuring that what happens behind the scenes receives as much attention as what happens in the spotlight.</p>
          </Reveal>
        </div>
        <div className="ab-principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.name} delay={i} className="ab-principle">
              <span className="ab-principle-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ab-principle-name">{p.name}</h3>
              <p className="ab-principle-desc">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const [events, ...rest] = VERTICALS;
  return (
    <section className="hx-section" aria-labelledby="ab-expertise">
      <div className="hx-shell">
        <Reveal className="hx-head">
          <div className="hx-eyebrow">WHAT WE BRING TO THE TABLE</div>
          <h2 id="ab-expertise" className="hx-h2">Experience across the event ecosystem.</h2>
          <p className="hx-lede">KORE 360 brings together capabilities across the planning, commercial and operational sides of the sports and events industry.</p>
        </Reveal>

        <Reveal className="ab-vertical-feature">
          <div className="hx-photo ab-vertical-photo">
            <img src={IMG_LEAGUE_OPS} alt="Event staff alongside players on the field at a professional cricket league match" loading="lazy" decoding="async" width="1074" height="945" />
          </div>
          <div className="ab-vertical-body">
            <span className="ab-vertical-num">{events.num} — Primary vertical</span>
            <h3 className="ab-vertical-name ab-vertical-name--lg">{events.name}</h3>
            <div className="ab-vertical-tagline">{events.tagline}</div>
            <p className="hx-body">{events.desc}</p>
            <Link to={events.to} className="hx-btn hx-btn--primary">{events.cta} <Arrow /></Link>
          </div>
        </Reveal>

        <div className="ab-verticals">
          {rest.map((v, i) => (
            <Reveal key={v.id} delay={i} className="ab-vertical">
              <span className="ab-vertical-num">{v.num}</span>
              <h3 className="ab-vertical-name">{v.name}</h3>
              <div className="ab-vertical-tagline">{v.tagline}</div>
              <p className="ab-vertical-desc">{v.desc}</p>
              <Link to={v.to} className="hx-link">{v.cta} <Arrow /></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="ab-founder" aria-labelledby="ab-founder">
      <div className="hx-shell ab-founder-grid">
        <Reveal className="hx-photo ab-founder-photo">
          <img src={IMG_FOUNDER} alt="Portrait of Krish Lalwani, founder of KORE 360" loading="lazy" decoding="async" width="1000" height="1333" />
        </Reveal>
        <Reveal delay={1}>
          <div className="hx-eyebrow">MEET THE FOUNDER</div>
          <h2 id="ab-founder" className="hx-h2 ab-founder-name">Krish Lalwani</h2>
          <div className="ab-founder-role">Founder — KORE 360</div>
          <p className="ab-founder-headline">From the field to building the business.</p>
          <p className="hx-body">Krish Lalwani is a sports management professional and entrepreneur whose journey has been shaped by hands-on experience across major sporting events and cricket leagues.</p>
          <p className="hx-body">From managing team logistics and operational requirements to coordinating stakeholders and working within live event environments, his experience has provided a practical understanding of what goes into delivering large-scale sporting properties.</p>
          <p className="hx-body">Having worked across different aspects of event operations, Krish recognized the need for a more connected approach — one that brings strategy, execution, industry relationships and operational expertise together.</p>
          <p className="ab-founder-pull">That thinking became the foundation of KORE 360.</p>
          <p className="hx-body">Today, through KORE 360, Krish is focused on building an integrated sports and events company that supports event organizers, brands, sporting properties and businesses with structured, execution-led solutions.</p>
          <p className="hx-body">Alongside the events business, he also shares practical industry insights and career guidance with aspiring sports management professionals through KORE 360 Education.</p>
          <a href={LINKS.krishInstagram} target="_blank" rel="noreferrer" className="hx-link">Follow Krish on Instagram <Arrow /></a>
        </Reveal>
      </div>
    </section>
  );
}

function IndustryExperience() {
  return (
    <section className="hx-section" aria-labelledby="ab-experience">
      <div className="hx-shell">
        <Reveal className="hx-head">
          <div className="hx-eyebrow">THE EXPERIENCE BEHIND THE VISION</div>
          <h2 id="ab-experience" className="hx-h2">Learning the business from the ground up.</h2>
          <p className="hx-lede">Before building KORE 360, its founder developed practical experience working within sporting event environments where operational precision, stakeholder coordination and timely execution are essential. That industry exposure continues to shape the company's approach to every project.</p>
        </Reveal>

        <ul className="ab-areas">
          {EXPERIENCE_AREAS.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i % 3} className="ab-area">
              <h3 className="ab-area-name">{a.name}</h3>
              <p className="ab-area-desc">{a.desc}</p>
            </Reveal>
          ))}
        </ul>

        <div className="hx-split hx-split--wide ab-experience-split">
          <Reveal className="hx-photo hx-photo--wide">
            <img src={IMG_LOGISTICS} alt="Players arriving with their luggage from the team bus at a Legends League Cricket venue in Qatar" loading="lazy" decoding="async" width="1100" height="733" />
          </Reveal>
          <Reveal delay={1}>
            <h3 className="hx-h3">Selected professional experience</h3>
            <p className="hx-note">
              Selected professional experience of the founder prior to and outside KORE 360 engagements. These are not KORE 360 client projects.
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

function WhyKore() {
  return (
    <section className="ab-why" aria-labelledby="ab-why">
      <img src={IMG_STADIUM} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ab-why-bg" />
      <div className="ab-why-shade" aria-hidden="true" />
      <div className="hx-shell ab-why-inner">
        <Reveal>
          <div className="hx-eyebrow">WHY KORE 360 EXISTS</div>
          <h2 id="ab-why" className="ab-why-title">The bigger picture was always the vision.</h2>
        </Reveal>
        <Reveal delay={1} className="ab-why-copy">
          <p>Working within sporting events offers a clear view of how many different elements must come together to deliver a successful experience.</p>
          <p>Planning, logistics, staffing, operations, partnerships and commercial decisions are often managed across multiple teams.</p>
          <p>KORE 360 was founded with the vision of bringing these connected requirements into one integrated service approach.</p>
          <p>The ambition is to build a company that clients can approach with a brief, a challenge or an idea — and find the expertise, structure and execution support needed to move it forward.</p>
          <p className="ab-why-close">Beyond a single service. Beyond a single event. <span>Beyond Every Angle.</span></p>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="hx-section hx-section--charcoal" aria-labelledby="ab-approach">
      <div className="hx-shell">
        <Reveal className="hx-head">
          <div className="hx-eyebrow">HOW WE WORK</div>
          <h2 id="ab-approach" className="hx-h2">Think. Plan.<br />Execute. Evolve.</h2>
        </Reveal>
        <ol className="hx-process">
          {APPROACH.map((p, i) => (
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

function Vision() {
  return (
    <section className="ab-vision" aria-labelledby="ab-vision">
      <Reveal className="hx-shell ab-vision-inner">
        <div>
          <div className="hx-eyebrow">LOOKING AHEAD</div>
          <h2 id="ab-vision" className="hx-h2 hx-h2--gateway">Building beyond boundaries.</h2>
        </div>
        <div>
          <p className="hx-body">Our vision is to build KORE 360 into a trusted sports and events partner, supporting ambitious projects across India and international markets.</p>
          <p className="hx-body">By combining operational understanding, creative collaboration and an integrated business approach, we aim to build lasting relationships with brands, leagues, event organizers and industry partners.</p>
          <p className="hx-body">As KORE 360 grows, our commitment remains the same: understand every brief, take ownership of the agreed responsibilities and deliver with purpose.</p>
        </div>
      </Reveal>
    </section>
  );
}

function FinalCta({ onEnquire }) {
  return (
    <section className="league-cta" aria-labelledby="ab-final">
      <div className="league-cta-glow" aria-hidden="true" />
      <Reveal className="league-shell" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="league-eyebrow" style={{ marginBottom: '18px' }}>LET'S WORK TOGETHER</div>
        <h2 id="ab-final" className="league-cta-title">Your vision.<br />Our next brief.</h2>
        <p className="league-cta-text">
          Planning a sporting league, corporate event, brand experience or a new sporting property? Let's explore how KORE 360 can support your project.
        </p>
        <div className="hx-ctas hx-ctas--center">
          <button type="button" onClick={onEnquire} className="hx-btn hx-btn--primary" aria-haspopup="dialog">Tell Us About Your Event <Arrow /></button>
          <Link to="/#services" className="hx-btn hx-btn--ghost">Explore Our Services <Arrow /></Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function About() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = useCallback(() => {
    setEnquiryOpen(true);
    track('event_enquiry_opened', { lead_type: 'event', service: '', source: 'about' });
  }, []);
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  return (
    <div className="about">
      <PageMeta
        fullTitle="About KORE 360 | Sports & Event Management | Krish Lalwani"
        description="Meet KORE 360, an integrated sports and event management company founded by Krish Lalwani. Explore our vision, experience and approach to event execution."
        path="/about"
        jsonLd={ABOUT_JSON_LD}
      />
      <AboutHero />
      <Founder />
      <WhoWeAre />
      <Philosophy />
      <Expertise />
      <IndustryExperience />
      <WhyKore />
      <Approach />
      <Vision />
      <FinalCta onEnquire={openEnquiry} />
      <EventEnquiryModal open={enquiryOpen} onClose={closeEnquiry} />
    </div>
  );
}

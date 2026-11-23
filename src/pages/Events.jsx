import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import PageMeta from '../components/PageMeta.jsx';
import LeagueEngagements from '../components/LeagueEngagements.jsx';
import ProjectShowcase from '../components/ProjectCard.jsx';
import WhoWeWorkWith from '../components/WhoWeWorkWith.jsx';
import EventServices from '../components/EventServices.jsx';
import EventsFounder from '../components/EventsFounder.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import { VISIBLE_PROJECTS } from '../workContent.js';
import { track } from '../lib/analytics.js';
import heroImg from '../assets/events/events_page_hero_image.webp';

// Capabilities page. Section content lives in src/eventsContent.js and
// projects in src/workContent.js. /events#league-management is the direct
// league-sales link (also /league-management, redirected in vercel.json).
export default function Events() {
  const [event, setEvent] = useState({ open: false, service: undefined });
  const openEvent = useCallback((service, source = 'events') => {
    setEvent({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '', source });
  }, []);
  const closeEvent = useCallback(() => setEvent((e) => ({ ...e, open: false })), []);

  return (
    <>
      <PageMeta
        title="Events: Event Services and League Management"
        description="KORE 360 plans and delivers sports leagues, corporate events and brand experiences: décor and venue styling, production, operations, hospitality and league management."
        path="/events"
      />
      <PageHero
        id="events-hero-title"
        eyebrow="EVENTS"
        title={<>
          <span className="hx-hero-line">From league idea</span>
          <span className="hx-hero-line hx-hero-title-accent">to match day</span>
        </>}
        // Approved photo (IMG_3717): LLC Masters stadium, Doha, at dusk. Desktop
        // keeps the crowd, field and main floodlight in frame; phones shift
        // right to centre the floodlight over the stands.
        image={heroImg} width="1920" height="1440" focal="50% 62%" focalMobile="64% 50%"
        alt="Floodlit cricket stadium in Doha at dusk."
        intro="KORE 360 works with league owners, event organisers and sports IP holders to plan, launch and grow sporting leagues, from strategy and structure to on-ground execution and long-term operations."
        actions={<>
          <Link to="/work" className="hx-btn hx-btn--primary">View Our Work <span aria-hidden="true" className="hx-arrow">→</span></Link>
          <button type="button" className="hx-btn hx-btn--ghost" onClick={() => openEvent(undefined, 'events_hero')} aria-haspopup="dialog">Tell Us About Your Event <span aria-hidden="true" className="hx-arrow">→</span></button>
        </>}
      />
      <ProjectShowcase id="ev-work-heading" eyebrow="OUR WORK" title="Selected Event Projects" projects={VISIBLE_PROJECTS} />
      <EventServices onEnquire={openEvent} />
      <WhoWeWorkWith />
      <LeagueEngagements beforeCta={<EventsFounder />} onEventEnquire={openEvent} />
      <EventEnquiryModal open={event.open} onClose={closeEvent} initialService={event.service} />
    </>
  );
}

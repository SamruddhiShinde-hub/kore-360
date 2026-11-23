import { useCallback, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Reveal from '../components/Reveal.jsx';
import EventsPortfolio from '../components/EventsPortfolio.jsx';
import EventServices from '../components/EventServices.jsx';
import PackageFolders from '../components/PackageFolders.jsx';
import EventEnquiryModal from '../components/EventEnquiryModal.jsx';
import LeagueEnquiryModal from '../components/LeagueEnquiryModal.jsx';
import WhatsAppCta from '../components/WhatsAppCta.jsx';
import { track } from '../lib/analytics.js';
import heroImg from '../assets/events/events_page_hero_image.webp';

// Reads like a short proposal for a league owner: where the experience
// comes from (portfolio), what KORE 360 can run (services), how involved
// it gets (packages), then the enquiry. Content lives in src/eventsContent.js
// and LEAGUE_ENGAGEMENTS in src/data.js. /events#league-management is the
// direct league-sales link (also /league-management, redirected in vercel.json).
export default function Events() {
  const [event, setEvent] = useState({ open: false, service: undefined });
  const [leagueOpen, setLeagueOpen] = useState(false);
  const openEvent = useCallback((service, source = 'events') => {
    setEvent({ open: true, service });
    track('event_enquiry_opened', { lead_type: 'event', service: service || '', source });
  }, []);
  const closeEvent = useCallback(() => setEvent((e) => ({ ...e, open: false })), []);
  const openLeague = () => {
    setLeagueOpen(true);
    track('league_enquiry_opened', { lead_type: 'league_management', source: 'events_final' });
  };
  const closeLeague = useCallback(() => setLeagueOpen(false), []);

  return (
    <>
      <PageMeta
        title="Events: Event Services and League Management"
        description="KORE 360 plans and delivers sports leagues and live events: league planning, venue and matchday operations, production, branding, hospitality and three levels of league support."
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
          <WhatsAppCta source="events_hero" text="Hi KORE 360, I'd like to talk about an event or league we're planning." />
          <button type="button" className="hx-btn hx-btn--ghost" onClick={() => openEvent(undefined, 'events_hero')} aria-haspopup="dialog">Tell Us About Your Event <span aria-hidden="true" className="hx-arrow">→</span></button>
        </>}
      />
      <EventsPortfolio />
      <EventServices />
      <PackageFolders />

      <section aria-labelledby="ev-cta-heading" className="league-cta">
        <div className="league-cta-glow" aria-hidden="true" />
        <Reveal className="league-shell" style={{ position: 'relative', textAlign: 'center' }}>
          <div className="league-eyebrow" style={{ marginBottom: '18px' }}>LET'S TALK</div>
          <h2 id="ev-cta-heading" className="league-cta-title">Tell us about your event</h2>
          <p className="league-cta-text">
            A league season, a corporate event or a brand experience: tell us what you're planning and we'll scope the services and level of involvement that fit.
          </p>
          <div className="hx-ctas hx-ctas--center">
            <button type="button" onClick={() => openEvent(undefined, 'events_final')} className="btn-accent league-cta-btn" aria-haspopup="dialog">Tell Us About Your Event →</button>
            <button type="button" onClick={openLeague} className="hx-btn hx-btn--ghost" aria-haspopup="dialog">Tell Us About Your League →</button>
          </div>
        </Reveal>
      </section>

      <EventEnquiryModal open={event.open} onClose={closeEvent} initialService={event.service} />
      <LeagueEnquiryModal open={leagueOpen} onClose={closeLeague} />
    </>
  );
}

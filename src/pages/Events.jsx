import PageHero from '../components/PageHero.jsx';
import PageMeta from '../components/PageMeta.jsx';
import LeagueEngagements from '../components/LeagueEngagements.jsx';

export default function Events() {
  return (
    <>
      <PageMeta
        title="Events: Sports League Management"
        description="KORE 360 works with league owners, event organisers and sports IP holders to plan, launch and grow sporting leagues, from strategy and structure to on-ground execution and long-term league operations."
        path="/events"
      />
      <PageHero
        id="events-hero-title"
        eyebrow="EVENTS"
        title={<>
          <span className="hx-hero-line">From league idea</span>
          <span className="hx-hero-line hx-hero-title-accent">to match day</span>
        </>}
        image="/events/hero-desktop.webp" imageMobile="/events/hero-mobile.webp" width="1600" height="1065"
        alt="Event staff coordinating pitch-side inside a stadium on a cricket league match day"
        intro="KORE 360 works with league owners, event organisers and sports IP holders to plan, launch and grow sporting leagues, from strategy and structure to on-ground execution and long-term operations."
      />
      <LeagueEngagements />
    </>
  );
}

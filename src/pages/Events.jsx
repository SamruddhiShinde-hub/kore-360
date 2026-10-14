import PageHeader from '../components/PageHeader.jsx';
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
      <PageHeader
        eyebrow="EVENTS"
        title={<>From league idea<br />to match day</>}
        intro="KORE 360 works with league owners, event organisers and sports IP holders to plan, launch and grow sporting leagues, from strategy and structure to on-ground execution and long-term operations."
      />
      <LeagueEngagements />
    </>
  );
}

import { Link } from 'react-router-dom';
import { LINKS } from '../../data.js';
import Reveal from '../../components/Reveal.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import PageMeta from '../../components/PageMeta.jsx';

const SITE_URL = 'https://kore360.in';
const POST_PATH = '/blog/event-budget-planning-where-the-money-goes';
const POST_URL = `${SITE_URL}${POST_PATH}`;
const PUBLISH_DATE = '2026-08-24';
const META_DESCRIPTION = 'A ground-level event budget breakdown: the real line items, the hidden costs, and the five places money leaks on live sports and events.';

// Stable object references — passed straight to PageMeta, so keep these
// outside the component instead of building them on every render.
const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Where Event Budgets Actually Go',
  description: META_DESCRIPTION,
  image: `${SITE_URL}/og-image.jpg`,
  datePublished: PUBLISH_DATE,
  dateModified: PUBLISH_DATE,
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Krish Lalwani', url: `${SITE_URL}/about` },
  publisher: {
    '@type': 'Organization',
    name: 'KORE 360',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': POST_URL },
  keywords: 'event budget planning, event budget breakdown, sports event budget, event logistics costs, event budget line items',
};

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'Where Event Budgets Actually Go', item: POST_URL },
  ],
};

const JSON_LD = [ARTICLE_JSON_LD, BREADCRUMB_JSON_LD];

const pStyle = { fontSize: '17px', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 22px', textAlign: 'justify' };
const h2Style = { fontWeight: 800, fontSize: 'clamp(22px,2.8vw,28px)', letterSpacing: '-0.01em', margin: '44px 0 18px' };

export default function EventBudgetPlanning() {
  return (
    <>
      <PageMeta
        title="Where Event Budgets Actually Go"
        description={META_DESCRIPTION}
        path={POST_PATH}
        type="article"
        jsonLd={JSON_LD}
      />
      <PageHeader
        eyebrow="BLOG"
        title="Where Event Budgets Actually Go"
        intro="The line items nobody shows you, and the five places money quietly leaks."
      />

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 32px 40px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/blog" style={{ color: 'var(--text-faint)' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Where Event Budgets Actually Go</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '13.5px', color: 'var(--text-faint)', marginBottom: '40px', paddingBottom: '28px', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
          <span style={{ fontWeight: 700, color: 'var(--text)' }}>Krish Lalwani</span>
          <span>·</span>
          <time dateTime={PUBLISH_DATE}>24 August 2026</time>
        </div>

        <Reveal>
          <p style={pStyle}>Every event starts with a number. Someone says we've got this much for it, and the whole room nods like that number is the budget. It isn't. It's just the starting point. The real budget is what that number turns into once the ground has its say. The rain. The reschedule. The truck that shows up two hours late. The forty extra chairs nobody counted.</p>
          <p style={pStyle}>I've handled event budgets from small local leagues all the way up to league cricket running into crores. IPL, Legends League Cricket, ISPL, Khelo India. Venues from Pune to Doha. On one of those leagues I ran central logistics myself, the entire travel, accommodation and ground transport operation across six venues, charter flights included. That single line ran close to five crore. So I've signed off big numbers, and I've watched them try to leak in real time. And the most expensive mistake I keep seeing is almost never overspending. It's not knowing where the money was always going to go in the first place.</p>
          <p style={pStyle}>So here's the honest breakdown. Where the money actually lands, and where it quietly slips out before anyone notices it's gone.</p>

          <h2 style={h2Style}>The budget is never the number you were quoted</h2>
          <p style={pStyle}>A quote is just a snapshot of a plan that hasn't met reality yet. The plan assumes the sun is out, the crew is on time, the gear works, and nobody changes their mind. Live events break all four of those on a normal day.</p>
          <p style={pStyle}>The gap between the quote and the final cost isn't waste. It's the part of the event nobody bothered to put on paper.</p>
          <p style={pStyle}>A real budget makes that gap small and visible before the event, instead of big and ugly after it. And that starts with actually knowing your line items.</p>

          <h2 style={h2Style}>Where the money actually goes</h2>
          <p style={pStyle}>On the events I've run, the spend usually falls into six buckets. The split changes with the format. A broadcast league is heavy on production. A corporate day is heavy on hospitality. But the buckets themselves stay the same.</p>
          <p style={pStyle}><strong>Venue and ground.</strong> Rental, ground prep, pitch and outfield work, power, water, waste, teardown. This is the bill everyone remembers, and usually the one they underestimate on prep.</p>
          <p style={pStyle}><strong>Production and technical.</strong> AV, staging, sets, lighting, broadcast feeds, screens, tech support. On anything televised or ticketed, this is where the biggest single numbers sit.</p>
          <p style={pStyle}><strong>People.</strong> Crew, ground staff, security, marshals, medical, volunteers. Not glamorous, and the first line clients try to cut. It's also the line that decides whether the day runs or falls apart.</p>
          <p style={pStyle}><strong>Hospitality and logistics.</strong> Travel, stay, transport, catering, VIP and guest management. The audience feels all of this before they see anything on the field.</p>
          <p style={pStyle}><strong>Permits, compliance and insurance.</strong> Licences, clearances, safety sign offs, cover. Boring until it's the reason the gates don't open.</p>
          <p style={pStyle}><strong>Contingency.</strong> The one line with no glory attached to it, and the one that saves the event more often than any other.</p>
          <p style={pStyle}>Notice what's missing from that list. A big miscellaneous bucket. The moment real costs get dumped into misc, you've lost track of your own budget. Every rupee should be able to tell you which of those six buckets it belongs to.</p>

          <h2 style={h2Style}>The five places budgets leak</h2>
          <p style={pStyle}>Money rarely disappears in one big hole. It leaks in small, familiar ways. And it's the same five, on almost every event.</p>
          <p style={pStyle}><strong>1. The quote that wasn't really a quote.</strong> Verbal add-ons. The "can we also just…" requests. Scope that quietly grew after the number was set. None of it written down, all of it billed. If it isn't on paper, it isn't agreed. It's just a future argument with a price tag on it.</p>
          <p style={pStyle}><strong>2. Last mile logistics.</strong> The plan looks clean on a sheet. The cost lives in the gap between the plan and the ground. The extra vehicle. The loader who stays back. The second trip because the first truck was packed wrong. Small numbers, but many times over, and when you're running six venues at once, you feel every one of them six times.</p>
          <p style={pStyle}><strong>3. Idle time and standby.</strong> Crew and gear booked for a full day, then waiting around for half of it. You pay for the wait the same as the work. Tight scheduling is a budget line too, even if it never shows up as one.</p>
          <p style={pStyle}><strong>4. The small asks that aren't small.</strong> A last-minute VIP. One more camera. A green room that suddenly needs to become two. Each one sounds tiny in the moment. Stack them across a full event day and they're often the whole difference between on budget and over.</p>
          <p style={pStyle}><strong>5. No contingency line at all.</strong> This is the big one. On that six-venue league, a player's flight got cancelled the night before a fixture, and another was stuck on a visa that hadn't cleared. Overnight the whole logistics plan had to move. Rebooking seats at last-minute fares. Holding cars and rooms for players who weren't even in the air yet. Reworking ground transport that was set for six venues, not for chaos. None of it was in the quoted number. All of it still had to be paid. Years before that, in Doha, when I was nineteen, I watched a wet outfield almost get a match abandoned, saved only by laying metal sheets across the ground, a fix nobody had budgeted because "it might rain" was never on anyone's sheet. Different problem, same lesson. An event without a contingency line isn't cheaper. It's just not ready for the bill it's definitely going to get.</p>

          <h2 style={h2Style}>How to build a budget that survives the ground</h2>
          <p style={pStyle}>A good budget isn't a prettier spreadsheet. It's built so reality can't surprise it. Five habits do most of the work.</p>
          <p style={pStyle}><strong>Build it bottom up, not top down.</strong> Don't start with the number you were handed and work backwards to fit it. Cost every element for real, then check it against the number. If it doesn't fit, cut scope out in the open. Don't hide the gap and hope.</p>
          <p style={pStyle}><strong>Name a contingency line and protect it.</strong> Ten to fifteen percent, ring-fenced. Not the first thing you raid the moment something else runs over. Contingency spent on a real emergency is the budget doing its job, not failing.</p>
          <p style={pStyle}><strong>Get everything in writing.</strong> Every add-on, every scope change, every yes re-priced on the spot. The written number is the agreed number.</p>
          <p style={pStyle}><strong>Give every rupee an owner.</strong> A line with no name on it is a line nobody is watching. Someone should be accountable for each bucket, on the day, in real time.</p>
          <p style={pStyle}><strong>Reconcile daily on site, not after.</strong> On multi-day events, the daily reconcile is where you catch leaks while you can still stop them. A budget you only check after teardown is a post-mortem, not control.</p>

          <h2 style={h2Style}>The rule I run every budget by</h2>
          <p style={pStyle}>There's one line I hold above all the others, and it's the same rule I run the whole company on. Collect before you commit. Never spend against money that isn't already in hand or contractually locked. Sounds obvious. It gets quietly broken on more events than you'd believe. Costs committed on the back of a sponsorship that hadn't signed. A payment that was "coming."</p>
          <p style={pStyle}>Every rupee should have a name and an owner before the event opens. The ones that don't are the ones that leak.</p>
          <p style={{ ...pStyle, marginBottom: 0 }}>A budget isn't a wish for what the event should cost. It's a plan for what it actually will. Rain included. Reschedules included. The small asks included. Get that right and the number stops being something you dread and starts being something you trust. That's the whole difference between an event that survives contact with the ground and one that doesn't.</p>
        </Reveal>

        <Reveal style={{ marginTop: '52px', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '40px 34px', textAlign: 'center' }}>
          <p style={{ fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(22px,3vw,30px)', margin: '0 0 18px' }}>
            You don't hand us one line item.
            <br />
            <span style={{ backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              You hand us the whole budget, and get it back accounted for.
            </span>
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 28px' }}>
            That's what KORE360 was built for. Leagues, brands and institutions sit on brilliant ideas without the muscle to run them, on budget, at scale. The gap between a great idea and a great event, without a single rupee unaccounted for, is exactly where we live.
          </p>
          <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>
            Let's talk →
          </a>
        </Reveal>

        <Reveal style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <span>Planning your next event's budget?</span>
          <Link to="/management" style={{ fontWeight: 700, color: 'var(--kore-orange-text)', whiteSpace: 'nowrap' }}>See KORE360's event management services →</Link>
        </Reveal>
      </article>
    </>
  );
}

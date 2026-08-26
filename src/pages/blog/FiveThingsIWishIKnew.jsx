import { Link } from 'react-router-dom';
import { LINKS } from '../../data.js';
import Reveal from '../../components/Reveal.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import PageMeta from '../../components/PageMeta.jsx';
import coverImage from '../../assets/5-things-I-wish-someone-taugh-me-cover-image.jpg';

const SITE_URL = 'https://kore360.in';
const POST_PATH = '/blog/5-things-i-wish-i-knew-before-sports-industry';
const POST_URL = `${SITE_URL}${POST_PATH}`;
const PUBLISH_DATE = '2026-08-26';
const META_DESCRIPTION = 'The lessons that shaped a career in live sports and events. What the ground teaches you about being useful, staying ready and earning the next call.';

// Stable object references — passed straight to PageMeta, so keep these
// outside the component instead of building them on every render.
const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: '5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry',
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
  keywords: 'sports industry career lessons, career in sports management, working in live events, sports industry advice',
};

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: '5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry', item: POST_URL },
  ],
};

const JSON_LD = [ARTICLE_JSON_LD, BREADCRUMB_JSON_LD];

const pStyle = { fontSize: '17px', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 22px', textAlign: 'justify' };
const h2Style = { fontWeight: 800, fontSize: 'clamp(22px,2.8vw,28px)', letterSpacing: '-0.01em', margin: '44px 0 18px' };
const pullStyle = { fontSize: '17px', lineHeight: 1.7, color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 22px', textAlign: 'justify' };

export default function FiveThingsIWishIKnew() {
  return (
    <>
      <PageMeta
        title="5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry"
        description={META_DESCRIPTION}
        path={POST_PATH}
        type="article"
        jsonLd={JSON_LD}
      />
      <PageHeader
        eyebrow="INSIDE THE GROUND"
        title="5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry"
        intro="The lessons that shaped how I work. Learned in the one place they actually stick, on the ground."
        bgImage={coverImage}
        bgImageMobile={coverImage}
      />

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 32px 40px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/blog" style={{ color: 'var(--text-faint)' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>5 Things I Wish Someone Taught Me Before Getting Into The Sports Industry</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '13.5px', color: 'var(--text-faint)', marginBottom: '40px', paddingBottom: '28px', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
          <span style={{ fontWeight: 700, color: 'var(--text)' }}>Krish Lalwani</span>
          <span>·</span>
          <time dateTime={PUBLISH_DATE}>26 August 2026</time>
        </div>

        <Reveal>
          <p style={pStyle}>Nobody hands you this job fully formed. You learn it standing on the ground, on the days that don't go to plan, next to people who've done it a hundred times more than you have. The classroom version of this industry is neat. The real one is loud, fast and full of small decisions that only start to make sense once you've made a few of them yourself.</p>
          <p style={pStyle}>I started at the very bottom of it. Counting seats. Carrying gear. Saying yes to the jobs nobody else put their hand up for. And almost everything I know now, everything that lets me sign off a five crore logistics line or run a match day without my pulse moving, I picked up on those early grounds, one lesson at a time.</p>
          <p style={pStyle}>Here are the ones that stuck. Not regrets. Lessons. The things I'd tell anyone starting out today, because they're the whole difference between watching this world and working in it.</p>
          <p style={pullStyle}>The ground is the best teacher in this industry. It just doesn't slow down to explain itself.</p>

          <h2 style={h2Style}>Be useful before you're important.</h2>
          <p style={pStyle}>On my first events I wasn't there for the spotlight. I was there to make someone else's job lighter. Fetch it, move it, count it, fix it. And I learned fast that being genuinely useful is the entire entry ticket. Nobody remembers the person who wanted a title on day one. Everybody remembers the one who made the day run smoother without being asked twice.</p>
          <p style={pStyle}>The smallest job, done properly, is how you earn the next one. That's the whole ladder. Do the seat count like it matters, and the person above you quietly starts trusting you with the thing that matters more. Then the thing after that. That is how a career in this industry actually gets built, from the bottom, one clean job at a time.</p>

          <h2 style={h2Style}>The invisible roles are the ones holding the day up.</h2>
          <p style={pStyle}>The camera finds the players. It never finds the people who got the players there, fed the crew, cleared the ground and kept the gates moving. Early on I assumed the important work was the visible work. The ground corrected me quickly. The day is held up by the roles nobody claps for.</p>
          <p style={pStyle}>Once that landed, I stopped chasing the glamorous line and started respecting the quiet one. Learn what logistics, production, ground staff and hospitality actually do all day, and you understand how an event really works from the inside. That understanding is worth more than any title on a lanyard, and it's the thing that lets you step into almost any room and be useful in it.</p>
          <p style={pullStyle}>The spotlight shows you the game. The people you never see are the ones running it.</p>

          <h2 style={h2Style}>Clarity beats assumption, every single time.</h2>
          <p style={pStyle}>The fastest way to learn the value of a clear yes is to work off a foggy one. Early on I'd hear "we'll sort it on the day" and treat it like a plan. On the day, it wasn't. So I built a habit that has never once let me down. Confirm it. Write it. Repeat it back to the room. A yes you didn't pin down isn't an agreement. It's a hope with your name on it.</p>
          <p style={pStyle}>Clarity isn't admin, and it isn't being difficult. It's a gift you give the whole team. When everyone knows exactly what was agreed, the day gets calmer, faster and cheaper for everybody on it. The people who keep getting called back are almost always the clearest ones in the room.</p>

          <h2 style={h2Style}>Plan for the rain, even when the sky is clear.</h2>
          <p style={pStyle}>In Doha, when I was nineteen, I watched a wet outfield nearly get a match called off, saved only by laying metal sheets across the ground. Nobody had planned for it, because the day had started sunny. That one stayed with me. The ground taught me to respect the thing that probably won't happen, because "probably won't" turns up far more often than anyone budgets for.</p>
          <p style={pStyle}>Now I plan for the version of the day that goes sideways, not just the tidy one on the sheet. The flight that gets cancelled. The truck that runs late. The change that lands an hour before gates open. Preparing like that isn't fear, it's the opposite. It's confidence. You walk in calm because you've already met the problem once, in your head, before it ever reached the ground.</p>
          <p style={pullStyle}>Composure on a live day isn't a personality. It's just preparation you did earlier.</p>

          <h2 style={h2Style}>People remember how you made the day easier.</h2>
          <p style={pStyle}>Skills get you into the room. The way you make people feel on a hard day is what gets you called back into it. I've watched steady, generous, reliable people get pulled up fast, simply because working with them made everything lighter. This industry is far smaller than it looks, and it has a long, warm memory for the people who show up well.</p>
          <p style={pStyle}>So I made a choice early to be the person the day gets easier around. Calm when it moves. Steady when it's tight. Generous with the crew, whatever my own day looked like. That kind of reputation compounds quietly, event after event, until one day you notice the calls are coming to you instead of the other way around.</p>

          <h2 style={h2Style}>The lesson underneath all of it</h2>
          <p style={pStyle}>If I had to fold every one of these into a single line, it would be this. Earn the next yes. Every event, every shift, every unglamorous task is really a quiet audition for the bigger one standing behind it. You don't rise in this industry by demanding the next level. You rise by being so useful, so clear and so steady at the current one that the next one simply becomes obvious to everyone around you.</p>
          <p style={pStyle}>The ground doesn't hand you a career. It teaches you how to build one, if you're paying attention while you're standing on it. I started at the very bottom, counting seats, and those lessons carried me further than I'd have believed back then. To a production seat at a packed Wankhede. To a microphone in front of players I grew up watching. I wouldn't trade a single one of those early days, because they're where the real education happened, and they're the reason the big ones feel calm now.</p>
          <p style={{ ...pStyle, marginBottom: 0 }}>You don't wait to be ready for this world. You get useful, and the doors open behind the work.</p>
        </Reveal>

        <Reveal style={{ marginTop: '52px', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '40px 34px', textAlign: 'center' }}>
          <p style={{ fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(22px,3vw,30px)', margin: '0 0 18px' }}>
            You don't need a script to start.
            <br />
            <span style={{ backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              You need the next useful thing to do.
            </span>
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 28px' }}>
            That's what KORE360's courses and 1:1 calls are built around — the real routes into sports management, and a plan for your specific starting point, not a script for someone else's.
          </p>
          <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>
            Let's talk →
          </a>
        </Reveal>

        <Reveal style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <span>Want to work the game, not just watch it?</span>
          <Link to="/education" style={{ fontWeight: 700, color: 'var(--kore-orange-text)', whiteSpace: 'nowrap' }}>See KORE360's courses →</Link>
        </Reveal>
      </article>
    </>
  );
}

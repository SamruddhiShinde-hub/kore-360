import { Link } from 'react-router-dom';
import { LINKS } from '../../data.js';
import Reveal from '../../components/Reveal.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import PageMeta from '../../components/PageMeta.jsx';
import coverImage from '../../assets/what-actually-happens-on-match-day-cover-image.jpg';

const SITE_URL = 'https://kore360.in';
const POST_PATH = '/blog/what-happens-on-match-day';
const POST_URL = `${SITE_URL}${POST_PATH}`;
const PUBLISH_DATE = '2026-08-18';
const META_DESCRIPTION = 'A ground-level walk through everything that happens on match day, from before sunrise to teardown, written by someone who has actually run it across the IPL, LLC and ISPL.';

// Stable object references — passed straight to PageMeta, so keep these
// outside the component instead of building them on every render.
const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What Actually Happens on Match Day',
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
  keywords: 'how a cricket match is organised, behind the scenes of a live match, match day operations, cricket event management',
};

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'What Actually Happens on Match Day', item: POST_URL },
  ],
};

const JSON_LD = [ARTICLE_JSON_LD, BREADCRUMB_JSON_LD];

const pStyle = { fontSize: '17px', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 22px', textAlign: 'justify' };
const h2Style = { fontWeight: 800, fontSize: 'clamp(22px,2.8vw,28px)', letterSpacing: '-0.01em', margin: '44px 0 18px' };

export default function WhatHappensOnMatchDay() {
  return (
    <>
      <PageMeta
        title="What Actually Happens on Match Day"
        description={META_DESCRIPTION}
        path={POST_PATH}
        type="article"
        jsonLd={JSON_LD}
      />
      <PageHeader
        eyebrow="BLOG"
        title="What Actually Happens on Match Day"
        intro="The fifteen-hour day nobody sees behind three hours of cricket."
        bgImage={coverImage}
        bgImageMobile={coverImage}
      />

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 32px 40px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/blog" style={{ color: 'var(--text-faint)' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>What Actually Happens on Match Day</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '13.5px', color: 'var(--text-faint)', marginBottom: '40px', paddingBottom: '28px', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
          <span style={{ fontWeight: 700, color: 'var(--text)' }}>Krish Lalwani</span>
          <span>·</span>
          <time dateTime={PUBLISH_DATE}>18 August 2026</time>
        </div>

        <Reveal>
          <p style={pStyle}>You watch three hours of cricket. I've watched the fifteen hours wrapped around it.</p>
          <p style={pStyle}>The stadium erupts and a team made that happen. It's the best seat in the house, and you can't buy a ticket to it.</p>
          <p style={pStyle}>I've spent five-plus years on that side of the rope. I started as a venue team assistant at the TATA IPL, then moved into a central logistics role across leagues. And I'll tell you straight: the game on the field is the smallest part of the day.</p>
          <p style={pStyle}>Here's how a cricket match is actually organised — the behind-the-scenes of a live match, hours before anyone finds their seat.</p>

          <h2 style={h2Style}>It starts before the sun does</h2>
          <p style={pStyle}>The ops team is on ground four to six hours before the first ball. Sometimes earlier.</p>
          <p style={pStyle}>Because overnight, things move. A generator that was fine yesterday won't hold load. A delivery is stuck at a gate. A block of seating got damaged and nobody logged it.</p>
          <p style={pStyle}>So the first job isn't setting up. It's walking the whole venue to catch what changed while everyone slept. You're not building from zero. You're checking a plan you made days ago against a reality that never fully cooperates.</p>
          <p style={pStyle}>By the time the first staff briefing happens, every zone has an owner: field of play, broadcast, hospitality, gates. And every owner knows exactly what 'ready' means for their patch.</p>

          <h2 style={h2Style}>Gates, security, and the first crowd</h2>
          <p style={pStyle}>This is where an event quietly wins or quietly falls apart.</p>
          <p style={pStyle}>Thousands of people arrive inside a ninety-minute window. They have to clear security, find their block and reach their seat with no bottleneck and no crush. That takes signage. Trained stewards. And a plan for when one gate goes down and its whole crowd has to be pushed to the next one.</p>
          <p style={pStyle}>The audience should feel none of this. If they're talking about the queue, we got something wrong.</p>

          <h2 style={h2Style}>The field is run to the minute</h2>
          <p style={pStyle}>The pitch and the outfield sit at the centre of a clock.</p>
          <p style={pStyle}>Ground staff. Curators. Practice slots. The toss. The anthems. The sponsor moment on the boundary rope. All of it lined up against a broadcast schedule that does not move.</p>
          <p style={pStyle}>A lot of my job was protecting that clock. The thing meant to happen at 3:12 has to happen at 3:12, because everything after it is stacked right on top of it.</p>

          <h2 style={h2Style}>Broadcast is a second event</h2>
          <p style={pStyle}>A televised match is two events happening at once. The live one in the stadium, and the one being built for millions of screens.</p>
          <p style={pStyle}>Cameras. Cable runs. Commentary positions. The production truck. All of it needs power, access and protection. And when broadcast and the live crowd both want the same square metre of ground at the same second, someone had to have solved that on paper long before. That someone is ops.</p>

          <h2 style={h2Style}>Something will break</h2>
          <p style={pStyle}>No match day runs clean. Not one.</p>
          <p style={pStyle}>A VIP lands off-schedule. Rain sits over the outfield. A supplier doesn't show up.</p>
          <p style={pStyle}>A good ops team and a great one don't differ on whether problems happen. They differ on how fast the fix lands, and on how few people ever notice it happened at all.</p>

          <h2 style={h2Style}>Teardown: the part nobody films</h2>
          <p style={pStyle}>The last spectator leaves and the day still isn't done.</p>
          <p style={pStyle}>Every piece of equipment has to be accounted for. The venue goes back to its owner in the exact condition it was handed over. And you sit down while it's all still fresh and write down what worked and what didn't.</p>
          <p style={{ ...pStyle, marginBottom: 0 }}>Skip that step and you carry the same mistakes straight into the next event. Do it well and you get a little sharper every single match.</p>
        </Reveal>

        <Reveal style={{ marginTop: '52px', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '40px 34px', textAlign: 'center' }}>
          <p style={{ fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(22px,3vw,30px)', margin: '0 0 18px' }}>
            You don't come to us for one service.
            <br />
            <span style={{ backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              You come because we handle the whole ground.
            </span>
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 28px' }}>
            That's what KORE360 was built for. Leagues, brands and institutions sit on brilliant ideas without the muscle to run them at scale. The gap between a great idea and a great event is exactly where we live. Every angle covered. No blind spot.
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

import { Link } from 'react-router-dom';
import { CAREERS, TALENT_PARTNERS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import PageMeta from '../components/PageMeta.jsx';
import DecathlonBanner from '../components/DecathlonBanner.jsx';
import WhatsAppCta from '../components/WhatsAppCta.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)'];

function CapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const ICONS = [CapIcon, BriefcaseIcon];

export default function Talent() {
  return (
    <>
      <PageMeta
        title="Sports Jobs, Internships and Placements"
        description="Browse sports jobs and internships with KORE 360. We don't just point you at a job board, we represent you and match you to real openings with brands working in and around sport."
        path="/talent"
      />
      <PageHero
        id="talent-hero-title"
        eyebrow="TALENT"
        title="Your talent management partner"
        intro="KORE 360 doesn't just point you at a job board. We represent you, matching you to real internships and placements with brands already working in and around sport, and staying in your corner once you're in the door."
        image="/talent/hero-desktop.webp" imageMobile="/talent/hero-mobile.webp" width="1600" height="1065"
        alt="The KORE 360 event crew gathered together on the outfield of a stadium"
        actions={<WhatsAppCta source="talent_hero" text="Hi KORE 360, I'm interested in internships and jobs through KORE 360 Talent." />}
      />
      <nav className="tl-paths" aria-label="Talent routes">
        <a href="#candidates" className="tl-path"><span className="tl-path-for">For candidates</span><span className="tl-path-name">Internships &amp; jobs</span></a>
        <a href="#recruitment" className="tl-path"><span className="tl-path-for">For candidates</span><span className="tl-path-name">Live recruitment drives</span></a>
        <Link to="/events#service-athlete-artist" className="tl-path"><span className="tl-path-for">For event organisers</span><span className="tl-path-name">Book athletes &amp; artists</span></Link>
      </nav>

      <section id="candidates" className="tl-section" aria-labelledby="tl-candidates">
        <div className="tl-head">
          <div className="hx-eyebrow">FOR CANDIDATES</div>
          <h2 id="tl-candidates" className="league-h2">Internships &amp; jobs</h2>
          <p className="league-lede">Apply once and we match you to openings across teams, agencies, leagues and events. Internships are for getting your foot in; jobs are vetted full-time roles.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px', marginBottom: '20px' }}>
          {CAREERS.map((k, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <Reveal key={i} delay={i} className="card-hover" style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '14px', padding: '30px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${color}`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon />
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', color, marginBottom: '16px' }}>{k.tag}</div>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '30px', letterSpacing: '-0.01em', marginBottom: '12px' }}>{k.role}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 26px', flex: 1, textAlign: 'justify' }}>{k.desc}</p>
                <a href={k.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-orange)', padding: '13px 22px', borderRadius: '8px' }}>{k.cta} →</a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="recruitment" className="tl-section" aria-labelledby="tl-recruitment">
        <div className="tl-head">
          <div className="hx-eyebrow">RECRUITMENT &amp; PARTNER OPPORTUNITIES</div>
          <h2 id="tl-recruitment" className="league-h2">Live recruitment drives</h2>
          <p className="league-lede">Roles we&apos;re sourcing for directly on behalf of partner brands. Applications go to the partner&apos;s hiring team through KORE 360.</p>
        </div>
        <DecathlonBanner />
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 32px 64px' }}>
        <Reveal>
          <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '18px', textAlign: 'center' }}>WHERE OUR TALENT HAS LANDED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {TALENT_PARTNERS.map((p) => (
              <div
                key={p}
                style={{
                  fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
                  color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.18)',
                  borderRadius: '999px', padding: '12px 24px', display: 'inline-block',
                }}
              >
                {p}
              </div>
            ))}
            <div
              style={{
                fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
                color: 'var(--text-muted)', border: '1px dashed rgba(var(--border-rgb),0.18)',
                borderRadius: '999px', padding: '12px 24px', display: 'inline-block',
              }}
            >
              + more partners
            </div>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-faint)', textAlign: 'center', maxWidth: '560px', margin: '20px auto 0' }}>
            A sample of the brands our talent has interned and placed with through KORE 360's network.
          </p>
        </Reveal>
      </div>

      <section className="tl-booking" aria-labelledby="tl-booking">
        <div className="tl-booking-inner">
          <div>
            <div className="hx-eyebrow">FOR EVENT ORGANISERS</div>
            <h2 id="tl-booking" className="league-h2" style={{ fontSize: 'clamp(26px,3.4vw,40px)', margin: '0 0 10px' }}>Booking athletes or artists?</h2>
            <p className="league-lede">Appearances, performances and hosts for your event are handled by our events team.</p>
          </div>
          <Link to="/events#service-athlete-artist" className="hx-btn hx-btn--primary">Athlete &amp; Artist Management →</Link>
        </div>
      </section>
    </>
  );
}

import { LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import Eyebrow from '../components/Eyebrow.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';

const ORBIT = ['Events', 'Sponsorship', 'Production', 'Hospitality', 'Education', 'Talent'];

const PROPERTIES = [
  'IPL',
  'Legends League Cricket — India & Doha',
  'Indian Street Premier League',
  'Entertainers Cricket League',
  'Khelo India',
];

const pillStyle = {
  fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em',
  color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.18)',
  borderRadius: '999px', padding: '12px 24px', display: 'inline-block',
};

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="KORE360 is a home for everyone who lives the game — events, sponsorship, production, hospitality, education and talent, built on real ground experience from the IPL, Legends League Cricket, ISPL, ECL and Khelo India."
        path="/about"
      />
      <PageHeader
        eyebrow="ABOUT US"
        title="The game is bigger than the game."
        intro="Behind every match that moves millions, there's a world most people never see — the people who build the stage, run the ground, move the players, and make sure the whole thing holds together. KORE360 lives in that world."
      />

      <section style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px', textAlign: 'center' }}>
          <Eyebrow>WHAT WE DO</Eyebrow>
          <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.98, fontSize: 'clamp(30px,4.4vw,52px)', margin: '0 auto 22px', maxWidth: '820px' }}>
            We cover the full span of sport and live events
          </Reveal>
          <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 28px' }}>
            Events, sponsorship, production and hospitality, with education and talent built on the same ground experience.
          </p>
          <p style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 14px' }}>
            One connected orbit, not a menu of services.
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 40px' }}>
            You don't come to us for one thing — you come because we handle the whole ground.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {ORBIT.map((item) => (
              <span key={item} style={pillStyle}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px' }}>
          <Reveal style={{ background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '56px 40px', textAlign: 'center' }}>
            <p style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: 'clamp(26px,3.6vw,42px)', margin: 0, maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              We're not an agency.{' '}
              <span style={{ backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                We're a home for everyone who lives the game.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
          <Eyebrow color="var(--kore-magenta-text, var(--kore-orange-text))">THE PERSON BEHIND IT</Eyebrow>
          <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.98, fontSize: 'clamp(30px,4.4vw,52px)', margin: '0 0 6px' }}>
            Krish Lalwani
          </Reveal>
          <div style={{ fontSize: '14px', color: 'var(--text-faint)', letterSpacing: '0.04em', marginBottom: '36px' }}>FOUNDER, KORE360</div>

          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '48px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--text)', margin: '0 0 20px', textAlign: 'justify' }}>
                KORE360 is built on real time on the ground. Krish Lalwani has spent five years running venue, operations and logistics across some of the biggest cricket properties in the country and beyond. Not from a desk. On the outfield, in the control room, at the load-in gate.
              </p>
              <p style={{ fontSize: '16.5px', lineHeight: 1.65, fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: '2px solid var(--kore-orange)', paddingLeft: '18px', margin: '32px 0 0' }}>
                That's the engine KORE360 runs on: someone who has actually done the job, accountable for every brief that comes through the door.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '14px' }}>ON THE GROUND AT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PROPERTIES.map((p) => (
                  <div key={p} style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '10px', padding: '12px 16px' }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
          <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, fontSize: 'clamp(30px,4.6vw,54px)', margin: '0 0 32px' }}>
            Have something to build? Let's talk.
          </Reveal>
          <a
            href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="btn-accent"
            style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}
          >
            Let's talk →
          </a>
          <p style={{ marginTop: '40px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
            Beyond every angle.
          </p>
        </div>
      </section>
    </>
  );
}

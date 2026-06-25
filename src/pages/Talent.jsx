import { CAREERS, TALENT_PARTNERS, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';

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
      <PageHeader
        eyebrow="TALENT"
        title="Your talent management partner"
        intro="KORE 360 doesn't just point you at a job board — we represent you. That means matching you to real internships and placements with brands already working in and around sport, and staying in your corner once you're in the door."
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 32px 0' }}>
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
                <a href={k.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '13px 22px', borderRadius: '8px' }}>{k.cta} →</a>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 56px' }}>
        <Reveal className="card-hover" style={{ position: 'relative', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '16px', padding: '36px', display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-1px', left: '24px', background: 'var(--kore-gradient)', color: '#000000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 9px', borderRadius: '0 0 6px 6px' }}>
            NOW HIRING
          </div>
          <div style={{ maxWidth: '620px', marginTop: '10px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--kore-orange-text)', marginBottom: '10px' }}>PARTNER OPPORTUNITY</div>
            <div style={{ fontWeight: 800, fontSize: '26px', letterSpacing: '-0.01em', marginBottom: '10px' }}>Decathlon is hiring — apply through KORE 360</div>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>
              Through our tie-up with Decathlon, we're sourcing candidates directly for their open roles. Fill out the recruitment form to be considered — it goes straight to Decathlon's hiring team via KORE 360.
            </p>
          </div>
          <a href={LINKS.decathlonForm} target="_blank" rel="noreferrer" className="btn-accent" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '14px 24px', borderRadius: '8px' }}>
            Apply to Decathlon →
          </a>
        </Reveal>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 96px' }}>
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
    </>
  );
}

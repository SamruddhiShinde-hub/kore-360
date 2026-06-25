import { MANAGEMENT_SERVICES, LINKS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)'];

function HandshakeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h4l3-3 3 3 3-3 3 3h4" />
      <path d="M9 9 6.5 6.5a1.5 1.5 0 0 0-2.4 1.8" />
      <path d="M15 9l2.5-2.5a1.5 1.5 0 0 1 2.4 1.8" />
      <path d="M9 12.5 11 14.5a1.5 1.5 0 0 0 2.1 0l.4-.4" />
    </svg>
  );
}
function ConciergeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M12 13V8" />
      <circle cx="12" cy="6" r="1.5" />
    </svg>
  );
}

const ICONS = [HandshakeIcon, ConciergeIcon];

export default function Management() {
  return (
    <>
      <PageHeader
        eyebrow="MANAGEMENT"
        title="Sponsorships and hospitality, handled"
        intro="Beyond placing people, KORE 360 manages the commercial and on-ground side of sport — sourcing sponsorship partners and running the hospitality experience that keeps them coming back."
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          {MANAGEMENT_SERVICES.map((m, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <Reveal key={m.tag} delay={i} className="card-hover" style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '16px', padding: '34px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', border: `1px solid ${color}`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
                  <Icon />
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', color, marginBottom: '14px' }}>{m.tag}</div>
                <div style={{ fontWeight: 800, fontSize: '25px', letterSpacing: '-0.01em', marginBottom: '12px' }}>{m.title}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 22px', textAlign: 'justify' }}>{m.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
                  {m.points.map((p) => (
                    <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '14.5px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
                      <span style={{ color, fontWeight: 900, flex: 'none' }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
                <a href={LINKS.event} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '13px 22px', borderRadius: '8px' }}>Get in touch →</a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}

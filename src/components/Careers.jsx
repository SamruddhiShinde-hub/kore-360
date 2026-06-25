import { CAREERS, HERO } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';
import DecathlonBanner from './DecathlonBanner.jsx';

const CARD_COLORS = ['var(--kore-orange-text)', 'var(--kore-magenta-text)'];

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const ICONS = [CapIcon, BriefcaseIcon];

export default function Careers() {
  return (
    <section id="careers" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-magenta-text)">03 — CAREERS</Eyebrow>
        <h2 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,64px)', margin: '0 0 14px' }}>
          Get hired in sports
        </h2>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 0 32px', textAlign: 'justify' }}>
          Pick your track, fill the form, and you're in front of the right people.
        </p>

        <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {HERO.stats.map((s, i) => (
            <div key={s.label}>
              <div style={{ fontWeight: 900, fontSize: '26px', color: i === 0 ? 'var(--kore-magenta)' : i === 2 ? 'var(--kore-orange-text)' : 'var(--text)' }}>{s.value}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                {i === 0 ? 'Years guiding careers in sport' : i === 1 ? '1:1 calls taken' : 'People placed in sport'}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <DecathlonBanner />
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
                <a href={k.href} target="_blank" rel="noreferrer" className="btn-tertiary" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#000000', background: 'var(--kore-orange)', padding: '13px 22px', borderRadius: '8px' }}>{k.cta} →</a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

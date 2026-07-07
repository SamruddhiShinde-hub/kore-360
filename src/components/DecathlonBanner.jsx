import { LINKS } from '../data.js';
import Reveal from './Reveal.jsx';

export default function DecathlonBanner() {
  return (
    <Reveal className="card-hover" style={{ position: 'relative', background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.09)', borderRadius: '16px', padding: '36px', display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-1px', left: '24px', background: 'var(--kore-gradient)', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 9px', borderRadius: '0 0 6px 6px' }}>
        NOW HIRING
      </div>
      <div style={{ maxWidth: '620px', marginTop: '10px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--kore-orange-text)', marginBottom: '10px' }}>PARTNER OPPORTUNITY</div>
        <div style={{ fontWeight: 800, fontSize: '26px', letterSpacing: '-0.01em', marginBottom: '10px' }}>Decathlon is hiring, apply through KORE 360</div>
        <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>
          Through our tie-up with Decathlon, we're sourcing candidates directly for their open roles. Fill out the recruitment form to be considered, and it goes straight to Decathlon's hiring team via KORE 360.
        </p>
      </div>
      <a href={LINKS.decathlonForm} target="_blank" rel="noreferrer" className="btn-accent" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '14px 24px', borderRadius: '8px' }}>
        Apply to Decathlon →
      </a>
    </Reveal>
  );
}

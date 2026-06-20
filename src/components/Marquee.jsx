import { MARQUEE } from '../data.js';

export default function Marquee() {
  const line = MARQUEE.join('\u00A0\u00A0✺\u00A0\u00A0') + '\u00A0\u00A0✺\u00A0\u00A0';
  return (
    <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)', padding: '16px 0' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'koreMarquee 32s linear infinite', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', fontSize: '18px', color: 'var(--text-muted)' }}>
        <span style={{ paddingRight: '28px' }}>{line}</span>
        <span style={{ paddingRight: '28px' }}>{line}</span>
      </div>
    </div>
  );
}

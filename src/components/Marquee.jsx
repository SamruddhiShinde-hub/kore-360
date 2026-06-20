import { MARQUEE } from '../data.js';

export default function Marquee() {
  return (
    <div style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)', padding: '28px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-faint)', marginBottom: '14px', textAlign: 'center' }}>EXPLORE BY INTEREST</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {MARQUEE.map((word) => (
            <a
              key={word}
              href="#courses"
              className="role-pill"
              style={{
                fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em',
                color: 'var(--text-muted)', border: '1px solid rgba(var(--border-rgb),0.16)',
                borderRadius: '999px', padding: '8px 16px', display: 'inline-block',
              }}
            >
              {word}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

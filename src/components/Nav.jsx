import { LINKS } from '../data.js';

const navLinks = [
  { label: 'Sessions', href: '#sessions' },
  { label: 'Courses', href: '#courses' },
  { label: 'Careers', href: '#careers' },
  { label: 'Events', href: '#events' },
];

export default function Nav() {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 60, backdropFilter: 'blur(12px)',
        background: 'rgba(11,16,12,0.82)', borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: '1200px', margin: '0 auto', padding: '14px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eef2ee' }}>
          <span style={{ width: '20px', height: '20px', border: '3px solid var(--accent)', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '20px', letterSpacing: '-0.01em' }}>
            KORE&nbsp;<span style={{ color: 'var(--accent)' }}>360</span>
          </span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontSize: '14px', fontWeight: 600, color: '#9aa89c' }}>
              {l.label}
            </a>
          ))}
          <a
            href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent"
            style={{ fontSize: '14px', fontWeight: 700, color: '#07150c', background: 'var(--accent)', padding: '10px 16px', borderRadius: '7px' }}
          >
            Book a 1:1 call · ₹1,499
          </a>
        </nav>
      </div>
    </header>
  );
}

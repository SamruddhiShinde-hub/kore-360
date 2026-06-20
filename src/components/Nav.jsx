import { useState } from 'react';
import { LINKS } from '../data.js';

const navLinks = [
  { label: 'Sessions', href: '#sessions' },
  { label: 'Courses', href: '#courses' },
  { label: 'Careers', href: '#careers' },
  { label: 'Events', href: '#events' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60,
        background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: '1200px', margin: '0 auto', padding: '14px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}
      >
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FFFFFF' }}>
          <span style={{ width: '20px', height: '20px', border: '3px solid var(--kore-pink)', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '-0.01em' }}>
            KORE&nbsp;<span className="text-gradient">360</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontSize: '14px', fontWeight: 600, color: '#A0A0A0' }}>
              {l.label}
            </a>
          ))}
          <a
            href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent"
            style={{ fontSize: '14px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '10px 16px', borderRadius: '7px' }}
          >
            Book a 1:1 call · ₹1,499
          </a>
        </nav>

        {/* Mobile right side: hamburger + CTA button */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '4px', color: '#FFFFFF',
            }}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <a
            href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent"
            style={{ fontSize: '13px', fontWeight: 700, color: '#000000', background: 'var(--kore-gradient)', padding: '9px 12px', borderRadius: '7px', whiteSpace: 'nowrap' }}
          >
            Book a 1:1 call · ₹1,499
          </a>
        </div>
      </div>

      {/* Mobile dropdown — links only, no CTA */}
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            background: 'rgba(0,0,0,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 32px 24px',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href} href={l.href} className="nav-link"
              onClick={close}
              style={{ fontSize: '16px', fontWeight: 600, color: '#A0A0A0' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

import { useState, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Education', to: '/education' },
  { label: 'Management', to: '/management' },
  { label: 'Talent', to: '/talent' },
];

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('kore-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* localStorage unavailable */ }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function SunIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('kore-theme', theme); } catch { /* localStorage unavailable */ }
  }, [theme]);

  const close = () => setOpen(false);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const themeToggleButton = (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      role="switch"
      aria-checked={theme === 'light'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'relative', flex: 'none', width: '46px', height: '25px', borderRadius: '999px',
        background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.32)',
        cursor: 'pointer', padding: '2px', display: 'inline-flex', alignItems: 'center',
      }}
    >
      <span style={{ position: 'absolute', left: '6px', display: 'flex', color: 'rgba(255,255,255,0.65)' }}>
        <MoonIcon size={13} />
      </span>
      <span style={{ position: 'absolute', right: '6px', display: 'flex', color: 'rgba(255,255,255,0.65)' }}>
        <SunIcon size={13} />
      </span>
      <span
        style={{
          position: 'relative', zIndex: 1, width: '19px', height: '19px', borderRadius: '50%',
          background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.45)',
          transform: theme === 'light' ? 'translateX(21px)' : 'translateX(0)',
          transition: 'transform .2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0A',
        }}
      >
        {theme === 'light' ? <SunIcon size={12} /> : <MoonIcon size={12} />}
      </span>
    </button>
  );

  return (
    <header
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.32) 65%, rgba(0,0,0,0) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
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
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)' }}
        >
          <img src={logo} alt="Kore 360 Logo" width="102" height="64" style={{ height: '64px', width: '102px', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link-bar" style={{ fontSize: '14px', fontWeight: 600, color: location.pathname === l.to ? '#FFFFFF' : 'rgba(255,255,255,0.85)' }}>
              {l.label}
            </Link>
          ))}
          {themeToggleButton}
          <a
            href="/#courses" className="btn-accent"
            style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '10px 16px', borderRadius: '7px' }}
          >
            See all courses
          </a>
        </nav>

        {/* Mobile right side: theme toggle + hamburger + CTA button */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '6px' }}>
          {themeToggleButton}
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
            href="/#courses" className="btn-accent"
            style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '9px 12px', borderRadius: '7px', whiteSpace: 'nowrap' }}
          >
            See all courses
          </a>
        </div>
      </div>

      {/* Mobile dropdown — links only, no CTA */}
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            background: `rgba(var(--surface-rgb),0.97)`,
            borderTop: '1px solid rgba(var(--border-rgb),0.08)',
            padding: '16px 32px 24px',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.to} to={l.to} className="nav-link"
              onClick={close}
              style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-muted)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

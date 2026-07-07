import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const close = () => setOpen(false);

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kore-theme-v2', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        // No gradient, completely transparent as in the image
      }}
    >
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <Link to="/education" className="nav-link-bar" onClick={close} style={{ fontSize: '24px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.05em' }}>Education</Link>
          <Link to="/management" className="nav-link-bar" onClick={close} style={{ fontSize: '24px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.05em' }}>Management</Link>
          <Link to="/talent" className="nav-link-bar" onClick={close} style={{ fontSize: '24px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.05em' }}>Talent</Link>
          <Link to="#about-us" className="nav-link-bar" onClick={close} style={{ fontSize: '24px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.05em' }}>About Us</Link>
        </div>
      )}

      <div
        className="nav-container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 60
        }}
      >
        <Link to="/" className="nav-mobile-logo" style={{ display: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src={logo} alt="Kore 360 Logo" width="76" height="48" style={{ height: '48px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '120px', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', letterSpacing: '0.08em' }}>
          <Link to="/education" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Education</Link>
          <Link to="/management" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Management</Link>

          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="nav-logo" aria-label="Home">
            <img src={logo} alt="Kore 360 Logo" width="76" height="48" style={{ height: '48px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
          </Link>

          <Link to="/talent" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Talent</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="#about-us" className="nav-link-bar" style={{ color: '#FFFFFF' }}>About Us</Link>
            <button
              onClick={toggleTheme}
              style={{
                position: 'relative',
                background: theme === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                width: '60px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '4px',
                boxSizing: 'border-box',
                transition: 'background 0.3s ease'
              }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div style={{
                position: 'absolute',
                left: theme === 'light' ? '4px' : '32px',
                width: '22px',
                height: '22px',
                background: theme === 'light' ? '#FFFFFF' : '#1A1A1A',
                borderRadius: '50%',
                transition: 'left 0.3s ease, background 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {theme === 'light' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '20px', position: 'absolute', right: '24px' }}>
          <button
            onClick={toggleTheme}
            style={{
              position: 'relative',
              background: theme === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              width: '60px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '4px',
              boxSizing: 'border-box',
              transition: 'background 0.3s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div style={{
              position: 'absolute',
              left: theme === 'light' ? '4px' : '32px',
              width: '22px',
              height: '22px',
              background: theme === 'light' ? '#FFFFFF' : '#1A1A1A',
              borderRadius: '50%',
              transition: 'left 0.3s ease, background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {theme === 'light' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </div>
          </button>
          
          <button 
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF' }}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const close = () => setOpen(false);

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
          <img src={logo} alt="Kore 360 Logo" style={{ height: '48px', display: 'block', filter: 'brightness(0) invert(1)' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '120px', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', letterSpacing: '0.08em' }}>
          <Link to="/education" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Education</Link>
          <Link to="/management" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Management</Link>

          <Link
            to="/"
            style={{ margin: '0 80px', display: 'flex', alignItems: 'center' }}
          >
            <img src={logo} alt="Kore 360 Logo" style={{ height: '64px', display: 'block', filter: 'brightness(0) invert(1)' }} />
          </Link>

          <Link to="/talent" className="nav-link-bar" style={{ color: '#FFFFFF' }}>Talent</Link>
          <Link to="#about-us" className="nav-link-bar" style={{ color: '#FFFFFF' }}>About Us</Link>
        </nav>

        {/* Mobile controls */}
        <div className="nav-mobile-controls" style={{ display: 'none', position: 'absolute', right: '24px' }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF' }}
          >
            {open ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}


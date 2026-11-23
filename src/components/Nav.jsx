import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/Final - white logo-14.png';
import EventEnquiryModal from './EventEnquiryModal.jsx';
import { track } from '../lib/analytics.js';

const LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/work', label: 'Work' },
  { to: '/education', label: 'Education' },
  { to: '/talent', label: 'Talent' },
  { to: '/about', label: 'About' },
];

const linkClass = (base) => ({ isActive }) => `${base}${isActive ? ' is-active' : ''}`;

// Transparent bar over each page's dark hero/header. On phones, Work and
// Events stay in the bar itself (no menu needed to reach them); everything
// else is one tap away in the menu.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { html.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const openEnquiry = useCallback(() => {
    setOpen(false);
    setEnquiryOpen(true);
    track('event_enquiry_opened', { lead_type: 'event', service: '', source: 'nav' });
  }, []);
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  return (
    <header className="kn">
      <div className="kn-bar">
        <Link to="/" className="kn-logo" aria-label="KORE 360 home" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="KORE 360" width="115" height="110" />
        </Link>

        <nav className="kn-links" aria-label="Main">
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} className={linkClass('kn-link')}>{l.label}</NavLink>)}
        </nav>
        <button type="button" className="kn-cta" onClick={openEnquiry} aria-haspopup="dialog">Enquire</button>

        <div className="kn-mobile">
          <NavLink to="/work" className={linkClass('kn-pill')}>Work</NavLink>
          <NavLink to="/events" className={linkClass('kn-pill')}>Events</NavLink>
          <button type="button" className="kn-burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="kn-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="kn-menu" className="kn-menu">
          <nav aria-label="Menu">
            {LINKS.map((l) => <NavLink key={l.to} to={l.to} className={linkClass('kn-menu-link')}>{l.label}</NavLink>)}
            <NavLink to="/contact" className={linkClass('kn-menu-link kn-menu-link--small')}>Contact</NavLink>
          </nav>
          <button type="button" className="hx-btn hx-btn--primary kn-menu-cta" onClick={openEnquiry} aria-haspopup="dialog">Tell Us About Your Event</button>
        </div>
      )}

      <EventEnquiryModal open={enquiryOpen} onClose={closeEnquiry} />
    </header>
  );
}

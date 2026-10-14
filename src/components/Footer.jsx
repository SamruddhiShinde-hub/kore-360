import { Link } from 'react-router-dom';
import { LINKS } from '../data.js';
import logo from '../assets/Final - white logo-14.png';
import { openConnectPopup } from './ConnectPopup.jsx';

// Services without their own page link to the homepage services section.
const footerGroups = [
  {
    title: 'EVENTS',
    links: [
      { label: 'Sports & League Management', to: '/events' },
      { label: 'Corporate Events', to: '/#services' },
      { label: 'Brand Activations', to: '/#services' },
      { label: 'Production', to: '/#services' },
      { label: 'Hospitality & Logistics', to: '/#services' },
      { label: 'Sponsorships', to: '/#services' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Work', to: '/#work' },
      { label: 'Contact', onClick: openConnectPopup },
      { label: 'Blog', to: '/blogs' },
    ],
  },
  {
    title: 'EDUCATION',
    links: [
      { label: 'Education Overview', to: '/education' },
      { label: 'Career Guidance', to: '/education/clarity-call' },
      { label: 'Learning Resources', to: '/education/ebook' },
    ],
  },
  {
    title: 'TALENT',
    links: [
      { label: 'Talent Services', to: '/talent' },
      { label: 'Opportunities', to: '/talent' },
    ],
  },
];

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21 4.4 16.5A8.5 8.5 0 1 1 8 19.5Z" />
      <path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.5 1-1v-1l-2-1-1 1a4 4 0 0 1-3-3l1-1-1-2H8c-.5 0-.5.5-.5 1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const socialIcons = [
  { label: 'Email', href: `mailto:${LINKS.email}`, Icon: MailIcon },
  { label: 'WhatsApp', href: LINKS.whatsapp, Icon: WhatsappIcon },
  { label: 'Instagram', href: LINKS.instagram, Icon: InstagramIcon },
];

const linkStyle = { fontSize: '14.5px', color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' };

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#FFFFFF', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 32px 48px', display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: '40px' }}>
        <div>
          <img src={logo} alt="KORE 360" width="104" height="100" loading="lazy" style={{ height: '100px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', marginBottom: '18px' }} />
          <div style={{ fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '10px' }}>Beyond Every Angle.</div>
          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: '300px', margin: '0 0 20px' }}>
            Integrated sports, events, education and talent solutions — bringing strategy, people and execution together.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', marginBottom: '20px' }}>
            <a href={`mailto:${LINKS.email}`} className="foot-link" style={{ color: 'rgba(255,255,255,0.75)' }}>{LINKS.email}</a>
            <a href={LINKS.phoneTel} className="foot-link" style={{ color: 'rgba(255,255,255,0.75)' }}>{LINKS.phone}</a>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {socialIcons.map(({ label, href, Icon }) => (
              <a
                key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="foot-icon-link"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        {footerGroups.map((g) => (
          <nav key={g.title} aria-label={`${g.title.toLowerCase()} links`}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{g.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', alignItems: 'flex-start' }}>
              {g.links.map((l) => (l.to
                ? <Link key={l.label} to={l.to} className="foot-link" style={linkStyle}>{l.label}</Link>
                : <button key={l.label} type="button" onClick={l.onClick} className="foot-link" style={linkStyle}>{l.label}</button>
              ))}
            </div>
          </nav>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>
          <span>© 2026 KORE 360. All rights reserved.</span>
          <span>One Stop. One Brief. Every Angle.</span>
        </div>
      </div>
    </footer>
  );
}

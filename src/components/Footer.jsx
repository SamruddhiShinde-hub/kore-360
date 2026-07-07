import { Link } from 'react-router-dom';
import { LINKS } from '../data.js';
import logo from '../assets/logo.png';
import mainHeroBg from '../assets/main-hero-background.webp';

const exploreLinks = [
  { label: 'Education', to: '/education' },
  { label: 'Management', to: '/management' },
  { label: 'Talent Acquisition', to: '/talent' },
];

const connectLinks = [
  { label: 'Instagram', href: LINKS.instagram, external: true },
  { label: 'Book a 1:1', href: LINKS.bookCall, external: true },
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

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', color: '#FFFFFF' }}>
      <img src={mainHeroBg} alt="Footer Background" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src={logo} alt="Kore 360 Logo" width="102" height="64" style={{ height: '64px', width: '102px', display: 'block', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '320px', margin: '0 0 20px', textAlign: 'justify' }}><strong style={{ color: '#FFFFFF' }}>Careers in sports management</strong>, built with <em style={{ whiteSpace: 'nowrap' }}>Krish Lalwani</em>. Education, Management and Talent, all in one place.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialIcons.map(({ label, href, Icon }) => (
                <a
                  key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="foot-icon-link"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>EXPLORE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', alignItems: 'flex-start' }}>
              {exploreLinks.map((l) => (
                <Link key={l.label} to={l.to} className="foot-link" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.8)' }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>CONNECT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', alignItems: 'flex-start' }}>
              {connectLinks.map((l) => (
                <a key={l.label} href={l.href} className="foot-link" target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined} style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.8)' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '12.5px', color: 'rgba(255,255,255,0.8)' }}>
            <span>© 2026 Kore 360. All rights reserved.</span>
            <span style={{ }}>Sports management · careers · events</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { LINKS } from '../data.js';
import logo from '../assets/logo.png';

const exploreLinks = [
  { label: 'Education', to: '/education' },
  { label: 'Management', to: '/management' },
  { label: 'Talent', to: '/talent' },
];

const connectLinks = [
  { label: 'Instagram', href: LINKS.instagram, external: true },
  { label: 'Book a 1:1', href: LINKS.bookCall, external: true },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)' }}>
      <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src={logo} alt="Kore 360 Logo" style={{ height: '64px', width: 'auto', display: 'block' }} />
          </div>
          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '320px', margin: 0, textAlign: 'justify' }}>Careers in sports management — built with Krish Lalwani. Education, management and talent, all in one place.</p>
        </div>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '16px' }}>EXPLORE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {exploreLinks.map((l) => (
              <Link key={l.label} to={l.to} className="foot-link" style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '16px' }}>CONNECT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {connectLinks.map((l) => (
              <a key={l.label} href={l.href} className="foot-link" target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined} style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(var(--border-rgb),0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
          <span>© 2026 Kore 360. All rights reserved.</span>
          <span style={{ }}>Sports management · careers · events</span>
        </div>
      </div>
    </footer>
  );
}

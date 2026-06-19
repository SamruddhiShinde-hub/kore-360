import { LINKS } from '../data.js';

const exploreLinks = [
  { label: 'Sessions', href: '#sessions' },
  { label: 'Courses', href: '#courses' },
  { label: 'Careers', href: '#careers' },
  { label: 'Events', href: '#events' },
];

const connectLinks = [
  { label: 'Instagram', href: LINKS.instagram, external: true },
  { label: 'Book a 1:1', href: '#sessions' },
  { label: 'Events', href: '#events' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0e1510' }}>
      <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ width: '20px', height: '20px', border: '3px solid var(--accent)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '20px' }}>KORE&nbsp;<span style={{ color: 'var(--accent)' }}>360</span></span>
          </div>
          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#8a9890', maxWidth: '320px', margin: 0 }}>Careers in sports management — built with Krish Lalwani. Sessions, courses, jobs and events, all in one place.</p>
        </div>
        <div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#5d6b60', marginBottom: '16px' }}>EXPLORE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {exploreLinks.map((l) => (
              <a key={l.label} href={l.href} className="foot-link" style={{ fontSize: '14.5px', color: '#b9c4bb' }}>{l.label}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', letterSpacing: '0.12em', color: '#5d6b60', marginBottom: '16px' }}>CONNECT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {connectLinks.map((l) => (
              <a key={l.label} href={l.href} className="foot-link" target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined} style={{ fontSize: '14.5px', color: '#b9c4bb' }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '12.5px', color: '#6f7d72' }}>
          <span>© 2026 Kore 360. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono',monospace" }}>Sports management · careers · events</span>
        </div>
      </div>
    </footer>
  );
}

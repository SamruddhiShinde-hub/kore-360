import { EVENT_TYPES, LINKS, IMAGES } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Events() {
  return (
    <section id="events" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0e1510' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '92px 32px' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: '56px', alignItems: 'center' }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: '16px' }}>04 — EVENTS</div>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.92, fontSize: 'clamp(34px,4.8vw,64px)', margin: '0 0 18px' }}>Book Krish for your event</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.55, color: '#a9b5ab', maxWidth: '520px', margin: '0 0 28px' }}>Keynotes, panels, campus sessions and brand appearances on careers and the business of sport. Tell us the date — we'll handle the rest.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {EVENT_TYPES.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15.5px', color: '#cdd6cf' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flex: 'none' }} />
                  {e}
                </div>
              ))}
            </div>
            <a href={LINKS.event} target="_blank" rel="noreferrer" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#07150c', background: 'var(--accent)', padding: '15px 26px', borderRadius: '8px' }}>Connect for an event →</a>
          </Reveal>
          <Reveal delay={1} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)' }}>
            <img src={IMAGES.events} alt="Cricket match" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

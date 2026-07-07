import { BRANDS } from '../data.js';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

export default function BrandLogos() {
  return (
    <section style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)', background: 'var(--surface)', padding: '64px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow color="var(--kore-orange-text)">OUR NETWORK</Eyebrow>
          </div>
          <h2 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(28px,4vw,44px)', margin: '0 0 8px' }}>
            Brands &amp; leagues we&apos;ve worked with
          </h2>
          <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>From the BCCI to India&apos;s biggest leagues, brands KORE 360 has worked alongside.</p>
        </Reveal>
      </div>

      <div className="brand-marquee" style={{ marginTop: '40px' }}>
        <div className="brand-marquee-track">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <div key={i} className="brand-tile" style={{ width: '180px', height: '100px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', padding: '16px' }}>
              <img src={b.logo} alt={b.name} loading="lazy" decoding="async" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

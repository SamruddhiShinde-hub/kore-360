import { useState } from 'react';
import { FAQS } from '../data.js';
import Reveal from './Reveal.jsx';
import Eyebrow from './Eyebrow.jsx';

function ChevronIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flex: 'none' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.08)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '92px 32px' }}>
        <Eyebrow color="var(--kore-magenta-text)">FAQ</Eyebrow>
        <Reveal as="h2" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(36px,5vw,56px)', margin: '0 0 14px' }}>
          Questions, answered
        </Reveal>
        <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 44px', textAlign: 'justify' }}>
          Still unsure? Here's what people usually ask before booking.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={f.q} delay={i} style={{ borderTop: i === 0 ? '1px solid rgba(var(--border-rgb),0.1)' : 'none', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', padding: '22px 0', cursor: 'pointer', textAlign: 'left', color: 'var(--text)', fontFamily: 'inherit' }}
                >
                  <span style={{ fontSize: '16.5px', fontWeight: 700 }}>{f.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 22px', maxWidth: '700px', textAlign: 'justify' }}>{f.a}</p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { LINKS } from '../data.js';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.4) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80,
        background: 'rgba(var(--surface-rgb),0.97)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(var(--border-rgb),0.14)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '16px', flexWrap: 'wrap',
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>Ready to explore a career in sports management?</div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <a
          href={LINKS.bookCall} target="_blank" rel="noreferrer" className="btn-accent"
          style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '9px 16px', borderRadius: '7px', whiteSpace: 'nowrap' }}
        >
          Book a clarity call
        </a>
        <a
          href="#courses" className="btn-outline"
          style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.25)', padding: '9px 16px', borderRadius: '7px', whiteSpace: 'nowrap' }}
        >
          Browse courses
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '20px', padding: '2px 6px', lineHeight: 1 }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

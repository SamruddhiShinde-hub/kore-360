import { useEffect, useState } from 'react';
import { WEB3FORMS_ACCESS_KEY } from '../data.js';

const SHOW_DELAY_MS = 8000;

export default function ConnectPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let alreadyHandled = false;
    try {
      alreadyHandled = sessionStorage.getItem('kore-connect-popup-seen') === '1';
    } catch { /* storage unavailable */ }
    if (alreadyHandled) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    try { sessionStorage.setItem('kore-connect-popup-seen', '1'); } catch { /* storage unavailable */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = e.target;
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'New connect request from KORE 360 website',
      from_name: 'KORE 360 website',
      name: form.name.value,
      whatsapp: form.whatsapp.value,
      message: form.reason.value,
    };
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        try { sessionStorage.setItem('kore-connect-popup-seen', '1'); } catch { /* storage unavailable */ }
      } else {
        setStatus('error');
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Connect with KORE 360"
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '420px', background: 'var(--surface)',
          border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '32px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '20px', lineHeight: 1, padding: '4px' }}
        >
          ×
        </button>

        {status === 'sent' ? (
          <>
            <div style={{ fontWeight: 900, fontSize: '22px', marginBottom: '10px' }}>Got it, thanks!</div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>
              We'll get back to you on WhatsApp shortly.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-0.01em', marginBottom: '8px' }}>Let's connect</div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 22px', textAlign: 'justify' }}>
              Leave your details and we'll reach out on WhatsApp.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                name="name" type="text" required placeholder="Your name"
                style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
              />
              <input
                name="whatsapp" type="tel" required placeholder="WhatsApp number, with country code"
                style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
              />
              <textarea
                name="reason" required rows={3} placeholder="What would you like to connect about? e.g. course guidance, a speaking request, a partnership idea"
                style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)', resize: 'vertical' }}
              />
              {status === 'error' && (
                <div style={{ fontSize: '13px', color: 'var(--kore-orange-text)' }}>{error}</div>
              )}
              <button
                type="submit" disabled={status === 'sending'} className="btn-accent"
                style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '13px 22px', borderRadius: '8px', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

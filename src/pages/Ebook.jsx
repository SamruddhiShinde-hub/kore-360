import { useState } from 'react';
import { SESSIONS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageMeta from '../components/PageMeta.jsx';

const EBOOK = SESSIONS.find((s) => s.sessionId === 'ebook');
const ACCENT = 'var(--kore-orange-text)';
const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };

export default function Ebook() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | redirecting
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('redirecting');
    try {
      const orderRes = await fetch('/api/create-ebook-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: name, userEmail: email }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Could not start order.');

      const linkRes = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdId: orderData.holdId }),
      });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error || 'Could not start payment.');

      window.location.href = linkData.url;
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  const d = EBOOK.details;

  return (
    <>
      <PageMeta title="Behind the Field — E-book" description={EBOOK.desc} path="/ebook" />

      <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1a0410 0%, #120303 55%, #000000 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
          <Reveal>
            <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>E-BOOK</div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(30px,4.6vw,52px)', color: '#FFFFFF', margin: '0 0 18px' }}>
              Behind the Field
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0, textAlign: 'justify' }}>{EBOOK.desc}</p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 130px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: '48px', alignItems: 'start' }} className="grid-2col">
        <div>
          <div style={labelStyle}>FORMAT</div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text)', margin: '0 0 24px' }}>{d.format}</p>

          <div style={labelStyle}>WHO IT'S FOR</div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text)', margin: '0 0 28px' }}>{d.whoFor}</p>

          <div style={labelStyle}>WHAT'S INSIDE</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {d.includes.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '15px', lineHeight: 1.5, color: 'var(--text)' }}>
                <span style={{ color: ACCENT, fontWeight: 900, flex: 'none' }}>✓</span>{item}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: `2px solid ${ACCENT}`, paddingLeft: '14px', margin: 0 }}>{d.outcome}</p>
        </div>

        <div className="desktop-sticky-card" style={{ position: 'sticky', top: '24px' }}>
          <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: 900, fontSize: '28px', marginBottom: '4px' }}>{EBOOK.price}</div>
            <input
              type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
            />
            <input
              type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: '14.5px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb),0.2)', background: 'transparent', color: 'var(--text)' }}
            />

            <div className="sticky-cta-mobile">
              {errorMsg && <div style={{ fontSize: '13px', color: 'var(--kore-orange-text)', marginBottom: '8px' }}>{errorMsg}</div>}
              <button
                type="submit" disabled={status === 'redirecting'} className="btn-accent"
                style={{ width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '14px 22px', borderRadius: '8px', cursor: status === 'redirecting' ? 'default' : 'pointer', opacity: status === 'redirecting' ? 0.7 : 1 }}
              >
                {status === 'redirecting' ? 'Taking you to payment…' : `${EBOOK.cta} — ${EBOOK.price}`}
              </button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-faint)', margin: 0 }}>The e-book PDF is sent to this email right after payment.</p>
          </form>
        </div>
      </div>
    </>
  );
}

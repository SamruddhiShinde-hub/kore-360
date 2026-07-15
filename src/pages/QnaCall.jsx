import { useState } from 'react';
import { SESSIONS } from '../data.js';
import Reveal from '../components/Reveal.jsx';
import PageMeta from '../components/PageMeta.jsx';
import BookingModal from '../components/BookingModal.jsx';
import SlotPicker from '../components/SlotPicker.jsx';

const QNA = SESSIONS.find((s) => s.sessionId === 'qna');
const ACCENT = 'var(--kore-orange-text)';
const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '8px' };

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.45a2 2 0 0 1 2.11-.45c.85.32 1.73.54 2.63.66A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function QnaCall() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const d = QNA.details;

  return (
    <>
      <PageMeta title="1:1 Q&A Call with Krish" description={QNA.desc} path="/qa-call" />

      <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1a0410 0%, #120303 55%, #000000 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 32px 64px' }}>
          <Reveal>
            <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontWeight: 700, backgroundImage: 'var(--kore-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '20px' }}>Q&amp;A CALL</div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, fontSize: 'clamp(30px,4.6vw,52px)', color: '#FFFFFF', margin: '0 0 18px' }}>
              1:1 Q&amp;A with Krish
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: 0, textAlign: 'justify' }}>{QNA.desc}</p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><ClockIcon /> 10 mins</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}><PhoneIcon /> Audio call</div>
        </div>

        <div style={{ fontWeight: 900, fontSize: '28px', color: 'var(--text)' }}>{QNA.price}</div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 32px 96px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: '48px', alignItems: 'start' }} className="grid-2col">
        <div>
          <div style={labelStyle}>WHO IT'S FOR</div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text)', margin: '0 0 28px', textAlign: 'justify' }}>{d.whoFor}</p>

          <div style={labelStyle}>WHAT YOU GET</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {d.includes.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '15px', lineHeight: 1.5, color: 'var(--text)' }}>
                <span style={{ color: ACCENT, fontWeight: 900, flex: 'none' }}>✓</span>{item}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: `2px solid ${ACCENT}`, paddingLeft: '14px', margin: 0 }}>{d.outcome}</p>
        </div>

        <SlotPicker
          sessionId="qna"
          onConfirm={(slot) => { setSelectedSlot(slot); setShowModal(true); }}
        />
      </div>

      {showModal && (
        <BookingModal
          sessionId="qna"
          sessionName={QNA.name}
          price={QNA.price}
          initialSlot={selectedSlot}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

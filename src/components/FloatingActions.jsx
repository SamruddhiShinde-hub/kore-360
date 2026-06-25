import { LINKS } from '../data.js';

function PhoneIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-1.45-.72-2.4-1.29-3.36-2.93-.25-.44.25-.41.72-1.36.08-.17.04-.31-.04-.43-.08-.12-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.34-.01-.53-.01-.18 0-.47.07-.72.32-.25.25-.94.92-.94 2.24 0 1.32.96 2.6 1.1 2.78.14.17 1.9 2.9 4.6 3.95 2.27.89 2.73.72 3.23.67.5-.04 1.6-.65 1.83-1.29.22-.63.22-1.17.16-1.29-.07-.12-.25-.19-.5-.31z" />
    </svg>
  );
}

const fabBase = {
  position: 'fixed', bottom: 'calc(22px + env(safe-area-inset-bottom, 0px))',
  width: '54px', height: '54px', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 90, boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
};

export default function FloatingActions() {
  return (
    <>
      <a
        href={LINKS.phoneTel}
        aria-label={`Call ${LINKS.phone}`}
        className="fab-call"
        style={{ ...fabBase, left: '20px', background: '#25D366', color: '#FFFFFF' }}
      >
        <PhoneIcon />
      </a>
      <a
        href={LINKS.whatsapp}
        target="_blank" rel="noreferrer"
        aria-label={`Message ${LINKS.phone} on WhatsApp`}
        style={{ ...fabBase, right: '20px', background: '#25D366', color: '#FFFFFF' }}
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}

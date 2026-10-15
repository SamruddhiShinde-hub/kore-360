import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, saveConsent, onOpenCookieSettings } from '../lib/consent.js';

const CATEGORIES = [
  { id: 'necessary', name: 'Strictly Necessary Cookies', desc: 'These cookies and storage technologies support essential website functionality, security, payment processing and your privacy preferences.', locked: true },
  { id: 'analytics', name: 'Analytics Cookies', desc: 'Help us understand website performance and how visitors use our pages.' },
  { id: 'marketing', name: 'Marketing & Advertising Cookies', desc: 'Help us measure advertising campaigns and understand the effectiveness of our marketing.' },
  { id: 'functional', name: 'Functional Cookies', desc: 'Support optional website features and preferences that improve your browsing experience.' },
];

const ALL_ON = { analytics: true, marketing: true, functional: true };
const ALL_OFF = { analytics: false, marketing: false, functional: false };

function ShieldIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Preferences({ initial, onSave, onClose }) {
  const [choice, setChoice] = useState(initial);
  const dialogRef = useRef(null);

  useEffect(() => {
    const prevFocus = document.activeElement;
    dialogRef.current?.querySelector('button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Keep keyboard focus inside the dialog while it's open.
      const items = dialogRef.current.querySelectorAll('button, a[href]');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="ck-overlay" onClick={onClose}>
      <div
        ref={dialogRef} className="ck-dialog" role="dialog" aria-modal="true" aria-labelledby="ck-pref-title" aria-describedby="ck-pref-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ck-close" onClick={onClose} aria-label="Close cookie preferences without saving">×</button>
        <h2 id="ck-pref-title" className="ck-title">Manage your cookie preferences</h2>
        <p id="ck-pref-desc" className="ck-text">Choose which optional cookies KORE 360 can use. You can change your preferences at any time.</p>

        <ul className="ck-cats">
          {CATEGORIES.map((c) => {
            const on = c.locked || choice[c.id];
            return (
              <li key={c.id} className="ck-cat">
                <div className="ck-cat-head">
                  <span id={`ck-cat-${c.id}`} className="ck-cat-name">{c.name}</span>
                  {c.locked ? (
                    <span className="ck-always">Always Active</span>
                  ) : (
                    <button
                      type="button" role="switch" aria-checked={on} aria-labelledby={`ck-cat-${c.id}`}
                      className={`ck-switch ${on ? 'is-on' : ''}`}
                      onClick={() => setChoice((s) => ({ ...s, [c.id]: !s[c.id] }))}
                    >
                      <span className="ck-switch-knob" aria-hidden="true" />
                      <span className="ck-switch-label" aria-hidden="true">{on ? 'On' : 'Off'}</span>
                    </button>
                  )}
                </div>
                <p className="ck-cat-desc">{c.desc}</p>
              </li>
            );
          })}
        </ul>

        <div className="ck-actions ck-actions--pref">
          <button type="button" className="ck-btn ck-btn--primary" onClick={() => onSave(choice)}>Save Preferences</button>
          <button type="button" className="ck-btn" onClick={() => onSave(ALL_ON)}>Accept All</button>
          <button type="button" className="ck-btn" onClick={() => onSave(ALL_OFF)}>Reject Optional</button>
        </div>
        <p className="ck-links">
          <Link to="/cookie-policy" onClick={onClose}>Cookie Policy</Link>
          <Link to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function CookieConsent({ hideBanner = false }) {
  const [consent, setConsent] = useState(() => getConsent());
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => onOpenCookieSettings(() => setPrefsOpen(true)), []);

  const save = (choice) => {
    setConsent(saveConsent(choice));
    setPrefsOpen(false);
  };

  return (
    <>
      {!consent && !prefsOpen && !hideBanner && (
        <section className="ck-banner" role="region" aria-labelledby="ck-banner-title">
          <div className="ck-banner-icon"><ShieldIcon /></div>
          <div className="ck-banner-body">
            <h2 id="ck-banner-title" className="ck-title ck-title--banner">Your privacy matters.</h2>
            <p className="ck-text">
              We use essential cookies to keep our website working. With your permission, we'd also like to use analytics and marketing cookies to understand how visitors use our website and improve our services.
            </p>
            <p className="ck-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </p>
          </div>
          <div className="ck-actions">
            <button type="button" className="ck-btn ck-btn--primary" onClick={() => save(ALL_ON)}>Accept All</button>
            <button type="button" className="ck-btn" onClick={() => save(ALL_OFF)}>Reject Optional</button>
            <button type="button" className="ck-btn ck-btn--text" onClick={() => setPrefsOpen(true)} aria-haspopup="dialog">Customize</button>
          </div>
        </section>
      )}
      {prefsOpen && (
        <Preferences initial={consent ? { ...ALL_OFF, ...consent } : ALL_OFF} onSave={save} onClose={() => setPrefsOpen(false)} />
      )}
    </>
  );
}

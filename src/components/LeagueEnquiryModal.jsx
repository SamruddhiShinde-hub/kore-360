import { useEffect, useId, useRef, useState } from 'react';
import { LEAGUE_ENQUIRY_OPTIONS } from '../data.js';
import { track } from '../lib/analytics.js';
import { getUtm } from '../lib/attribution.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Same rules as ConnectPopup: digits plus the usual separators, optional
// leading + for the country code.
const PHONE_VALID_REGEX = /^\+?[0-9][0-9\s\-()]{6,19}$/;

const EMPTY = {
  fullName: '', organization: '', email: '', phone: '', eventType: '', stage: '',
  location: '', timeline: '', support: '', project: '', website: '',
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function validate(v) {
  const errors = {};
  if (!v.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!v.email.trim()) errors.email = 'Please enter your work email.';
  else if (!EMAIL_REGEX.test(v.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@company.com.';
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) errors.phone = 'Please enter a contact number.';
  else if (!PHONE_VALID_REGEX.test(v.phone.trim()) || digits.length < 7 || digits.length > 15) errors.phone = 'Please enter a valid number, with country code, e.g. +91 98765 43210.';
  if (!v.eventType) errors.eventType = 'Please choose a type of event.';
  if (!v.stage) errors.stage = 'Please choose your current stage.';
  if (!v.support) errors.support = 'Please choose the support you need.';
  return errors;
}

// Order matters: the first invalid field in this list gets focus on submit.
const FIELD_ORDER = ['fullName', 'email', 'phone', 'eventType', 'stage', 'support'];

export default function LeagueEnquiryModal({ open, onClose }) {
  const uid = useId();
  const panelRef = useRef(null);
  const submittingRef = useRef(false);
  // Form state lives here even while the modal is closed, so an accidental
  // backdrop click or Escape doesn't throw away a half-written enquiry.
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');

  const id = (name) => `${uid}-${name}`;

  // Scroll lock + focus management + keyboard handling while open.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const panel = panelRef.current;
    panel?.querySelector('input')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!panel.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [open, onClose]);

  // The submit button unmounts on success — move focus to the confirmation
  // so screen readers announce it and Tab stays inside the dialog.
  useEffect(() => {
    if (status === 'sent') panelRef.current?.querySelector('h2')?.focus();
  }, [status]);

  // A finished enquiry shouldn't greet the next opener with "thank you".
  useEffect(() => {
    if (!open && status === 'sent') {
      setValues(EMPTY);
      setStatus('idle');
    }
  }, [open, status]);

  const set = (name) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const found = validate(values);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((f) => found[f]);
    if (firstBad) {
      panelRef.current?.querySelector(`[data-field="${firstBad}"]`)?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/submit-league-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, pageUrl: window.location.href.split('#')[0], utm: getUtm() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        if (data.fields) {
          const mapped = {};
          Object.keys(data.fields).forEach((f) => { mapped[f] = 'Please check this field.'; });
          setErrors(mapped);
        }
        throw new Error(data.error || "We couldn't send your enquiry just now. Please try again.");
      }
      setStatus('sent');
      track('league_enquiry_submitted', { lead_type: 'league_management', lead_category: 'b2b_events', event_type: values.eventType, league_stage: values.stage, support_type: values.support });
    } catch (err) {
      setStatus('error');
      setServerError(err.message || "We couldn't send your enquiry just now. Please try again.");
      track('league_enquiry_failed', { lead_type: 'league_management' });
    } finally {
      submittingRef.current = false;
    }
  };

  if (!open) return null;

  const fieldProps = (name, extra = {}) => ({
    id: id(name),
    name,
    'data-field': name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? id(`${name}-error`) : undefined,
    className: 'league-input',
    ...extra,
  });

  // Plain render helpers, not components — a component defined inside
  // render is a new type every render, which would remount the radios and
  // drop keyboard focus mid-selection.
  const renderError = (name) => (errors[name] ? <div id={id(`${name}-error`)} className="league-field-error">{errors[name]}</div> : null);

  const renderLabel = (name, children, required) => (
    <label htmlFor={id(name)} className="league-label">
      {children}{required ? <span aria-hidden="true" style={{ color: 'var(--kore-orange-text)' }}> *</span> : <span className="league-optional"> (optional)</span>}
    </label>
  );

  const renderChoice = (name, legend, options) => (
    <fieldset className="league-fieldset" aria-describedby={errors[name] ? id(`${name}-error`) : undefined}>
      <legend className="league-label">{legend}<span aria-hidden="true" style={{ color: 'var(--kore-orange-text)' }}> *</span></legend>
      <div className="league-choices">
        {options.map((opt, i) => (
          <label key={opt} className={`league-choice ${values[name] === opt ? 'is-selected' : ''}`}>
            <input
              type="radio" name={name} value={opt} checked={values[name] === opt} onChange={set(name)}
              data-field={i === 0 ? name : undefined}
              aria-invalid={errors[name] ? 'true' : 'false'}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {renderError(name)}
    </fieldset>
  );

  return (
    <div className="league-modal-overlay" onClick={onClose} data-lenis-prevent>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id('title')}
        aria-describedby={id('intro')}
        className="league-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} aria-label="Close enquiry form" className="league-modal-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        {status === 'sent' ? (
          <div role="status" style={{ padding: '24px 0 8px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--kore-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h2 id={id('title')} tabIndex={-1} style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05, fontSize: 'clamp(24px,4vw,30px)', margin: '0 0 12px' }}>
              Thank you. Your enquiry is with us.
            </h2>
            <p id={id('intro')} style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 26px' }}>
              Our team will review your league requirements and get in touch to discuss the next steps.
            </p>
            <button type="button" onClick={onClose} className="btn-outline" style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: 'var(--text)', background: 'transparent', border: '1px solid rgba(var(--border-rgb),0.3)', padding: '12px 22px', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="league-eyebrow" style={{ marginBottom: '12px' }}>SPORTS & LEAGUE MANAGEMENT</div>
            <h2 id={id('title')} tabIndex={-1} style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05, fontSize: 'clamp(24px,4vw,30px)', margin: '0 0 10px', paddingRight: '36px' }}>
              Tell us about your league
            </h2>
            <p id={id('intro')} style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 26px' }}>
              Share a few details about your project and our team will take the conversation forward.
            </p>

            <form onSubmit={handleSubmit} noValidate className="league-form">
              <div className="league-form-grid">
                <div>
                  {renderLabel('fullName', 'Full name', true)}
                  <input {...fieldProps('fullName', { type: 'text', autoComplete: 'name', required: true })} />
                  {renderError('fullName')}
                </div>
                <div>
                  {renderLabel('organization', 'Organization / league name')}
                  <input {...fieldProps('organization', { type: 'text', autoComplete: 'organization' })} />
                </div>
                <div>
                  {renderLabel('email', 'Work email', true)}
                  <input {...fieldProps('email', { type: 'email', autoComplete: 'email', inputMode: 'email', required: true })} />
                  {renderError('email')}
                </div>
                <div>
                  {renderLabel('phone', 'Contact number', true)}
                  <input {...fieldProps('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 98765 43210', required: true })} />
                  {renderError('phone')}
                </div>
                <div>
                  {renderLabel('eventType', 'Type of event', true)}
                  <select {...fieldProps('eventType', { required: true })}>
                    <option value="" disabled>Select a type of event</option>
                    {LEAGUE_ENQUIRY_OPTIONS.eventType.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {renderError('eventType')}
                </div>
                <div>
                  {renderLabel('location', 'Event location')}
                  <input {...fieldProps('location', { type: 'text', placeholder: 'City / Country' })} />
                </div>
              </div>

              {renderChoice('stage', 'Current stage', LEAGUE_ENQUIRY_OPTIONS.stage)}

              <div>
                {renderLabel('timeline', 'Expected timeline')}
                <select {...fieldProps('timeline')}>
                  <option value="">Select a timeline</option>
                  {LEAGUE_ENQUIRY_OPTIONS.timeline.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {renderChoice('support', 'What support are you looking for?', LEAGUE_ENQUIRY_OPTIONS.support)}

              <div>
                {renderLabel('project', 'Tell us about your project')}
                <textarea {...fieldProps('project', { rows: 4, maxLength: 3000, placeholder: 'Tell us about the league format, teams, venues, proposed dates or any specific requirements.' })} style={{ resize: 'vertical' }} />
              </div>

              {/* Honeypot — off-screen and out of the tab order; people never fill it. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor={id('website')}>Website</label>
                <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
              </div>

              {status === 'error' && (
                <div role="alert" className="league-server-error">{serverError}</div>
              )}

              <button
                type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="btn-accent"
                style={{ fontFamily: 'inherit', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', border: 'none', padding: '15px 24px', borderRadius: '8px', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1, width: '100%' }}
              >
                {status === 'sending' ? 'Sending…' : 'Submit League Enquiry →'}
              </button>
              <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-faint)', margin: 0, textAlign: 'center' }}>
                Fields marked * are required. We only use these details to respond to your enquiry.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

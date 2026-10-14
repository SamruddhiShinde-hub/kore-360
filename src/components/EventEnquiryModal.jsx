import { useEffect, useId, useRef, useState } from 'react';
import { EVENT_ENQUIRY_OPTIONS } from '../data.js';
import { track } from '../lib/analytics.js';
import { getUtm } from '../lib/attribution.js';

// General (non-league) event enquiry. Same look, focus handling and backend
// as LeagueEnquiryModal — it posts to /api/submit-league-enquiry with
// form: 'event', which stores it in the "Event Enquiries" sheet tab.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_VALID_REGEX = /^\+?[0-9][0-9\s\-()]{6,19}$/;

const EMPTY = {
  fullName: '', organization: '', email: '', phone: '', eventType: '',
  location: '', timeline: '', budget: '', services: [], project: '', website: '',
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
  if (!v.services.length) errors.services = 'Please choose at least one service.';
  return errors;
}

const FIELD_ORDER = ['fullName', 'email', 'phone', 'eventType', 'services'];

export default function EventEnquiryModal({ open, onClose, initialService }) {
  const uid = useId();
  const panelRef = useRef(null);
  const submittingRef = useRef(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');

  const id = (name) => `${uid}-${name}`;

  // A service CTA ("Enquire about Production") pre-ticks that service.
  useEffect(() => {
    if (open && initialService) {
      setValues((v) => (v.services.includes(initialService) ? v : { ...v, services: [...v.services, initialService] }));
    }
  }, [open, initialService]);

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

  useEffect(() => {
    if (status === 'sent') panelRef.current?.querySelector('h2')?.focus();
  }, [status]);

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

  const toggleService = (service) => {
    setValues((v) => ({ ...v, services: v.services.includes(service) ? v.services.filter((s) => s !== service) : [...v.services, service] }));
    if (errors.services) setErrors((err) => ({ ...err, services: undefined }));
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
        body: JSON.stringify({ ...values, form: 'event', pageUrl: window.location.href.split('#')[0], utm: getUtm() }),
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
      track('event_enquiry_submitted', { lead_type: 'event', lead_category: 'b2b_events', event_type: values.eventType, services: values.services.join(', ') });
    } catch (err) {
      setStatus('error');
      setServerError(err.message || "We couldn't send your enquiry just now. Please try again.");
      track('event_enquiry_failed', { lead_type: 'event' });
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

  const renderError = (name) => (errors[name] ? <div id={id(`${name}-error`)} className="league-field-error">{errors[name]}</div> : null);

  const renderLabel = (name, children, required) => (
    <label htmlFor={id(name)} className="league-label">
      {children}{required ? <span aria-hidden="true" style={{ color: 'var(--kore-orange-text)' }}> *</span> : <span className="league-optional"> (optional)</span>}
    </label>
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
              Our team will review your event requirements and get in touch to discuss the next steps.
            </p>
            <button type="button" onClick={onClose} className="btn-outline" style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, color: 'var(--text)', background: 'transparent', border: '1px solid rgba(var(--border-rgb),0.3)', padding: '12px 22px', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="league-eyebrow" style={{ marginBottom: '12px' }}>EVENT ENQUIRY</div>
            <h2 id={id('title')} tabIndex={-1} style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05, fontSize: 'clamp(24px,4vw,30px)', margin: '0 0 10px', paddingRight: '36px' }}>
              Tell us about your event
            </h2>
            <p id={id('intro')} style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 26px' }}>
              Share a few details about what you're planning and our team will take the conversation forward.
            </p>

            <form onSubmit={handleSubmit} noValidate className="league-form">
              <div className="league-form-grid">
                <div>
                  {renderLabel('fullName', 'Full name', true)}
                  <input {...fieldProps('fullName', { type: 'text', autoComplete: 'name', required: true })} />
                  {renderError('fullName')}
                </div>
                <div>
                  {renderLabel('organization', 'Organization')}
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
                    {EVENT_ENQUIRY_OPTIONS.eventType.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {renderError('eventType')}
                </div>
                <div>
                  {renderLabel('location', 'Event location')}
                  <input {...fieldProps('location', { type: 'text', placeholder: 'City / Country' })} />
                </div>
                <div>
                  {renderLabel('timeline', 'Expected timeline')}
                  <select {...fieldProps('timeline')}>
                    <option value="">Select a timeline</option>
                    {EVENT_ENQUIRY_OPTIONS.timeline.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  {renderLabel('budget', 'Expected budget range')}
                  <select {...fieldProps('budget')}>
                    <option value="">Select a range</option>
                    {EVENT_ENQUIRY_OPTIONS.budget.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <fieldset className="league-fieldset" aria-describedby={errors.services ? id('services-error') : undefined}>
                <legend className="league-label">Services required<span aria-hidden="true" style={{ color: 'var(--kore-orange-text)' }}> *</span></legend>
                <div className="league-choices">
                  {EVENT_ENQUIRY_OPTIONS.services.map((opt, i) => {
                    const checked = values.services.includes(opt);
                    return (
                      <label key={opt} className={`league-choice ${checked ? 'is-selected' : ''}`}>
                        <input
                          type="checkbox" name="services" value={opt} checked={checked} onChange={() => toggleService(opt)}
                          data-field={i === 0 ? 'services' : undefined}
                          aria-invalid={errors.services ? 'true' : 'false'}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
                {renderError('services')}
              </fieldset>

              <div>
                {renderLabel('project', 'Tell us about your project')}
                <textarea {...fieldProps('project', { rows: 4, maxLength: 3000, placeholder: 'Dates, audience size, venue, format or any specific requirements.' })} style={{ resize: 'vertical' }} />
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
                {status === 'sending' ? 'Sending…' : 'Submit Event Enquiry →'}
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

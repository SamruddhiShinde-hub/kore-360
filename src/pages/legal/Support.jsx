import { useState } from 'react';
import { Link } from 'react-router-dom';
import LegalPageLayout from '../../components/LegalPageLayout.jsx';
import EventEnquiryModal from '../../components/EventEnquiryModal.jsx';
import { openConnectPopup } from '../../components/ConnectPopup.jsx';
import { BUSINESS, OPERATIONS } from '../../legal/config.js';
import { track } from '../../lib/analytics.js';

const mailto = (subject) => `mailto:${BUSINESS.supportEmail}?subject=${encodeURIComponent(subject)}`;

/* ============================================================ CONTACT */
export function Contact() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = () => {
    setEnquiryOpen(true);
    track('event_enquiry_opened', { lead_type: 'event', service: '', source: 'contact' });
  };

  const paths = [
    {
      id: 'events', title: 'Events enquiries',
      desc: 'Corporate events, sports leagues, brand activations and partnerships.',
      action: <button type="button" className="hx-btn hx-btn--primary" onClick={openEnquiry} aria-haspopup="dialog">Tell us about your event</button>,
    },
    {
      id: 'education', title: 'Education support',
      desc: 'E-book access, paid calls, webinars, courses and billing questions. Include the email you used at checkout and your payment reference.',
      action: <a className="hx-btn hx-btn--ghost-dark" href={mailto('Education support')}>Email education support</a>,
    },
  ];

  return (
    <LegalPageLayout
      title="Contact & Support" eyebrow="SUPPORT" path="/contact" isPolicy={false} showToc={false}
      description="Contact KORE 360 for event enquiries, education support, privacy requests and grievances."
      intro="Pick the route that fits your question so it reaches the right place."
    >
      <div className="lg-cards">
        {paths.map((p) => (
          <section key={p.id} className="lg-card" aria-labelledby={`ct-${p.id}`}>
            <h2 id={`ct-${p.id}`}>{p.title}</h2>
            <p>{p.desc}</p>
            {p.action}
          </section>
        ))}
      </div>

      <section className="lg-section" aria-labelledby="ct-details">
        <h2 id="ct-details">Contact details</h2>
        <ul className="lg-plain">
          <li><strong>{BUSINESS.legalName || BUSINESS.brandName}</strong>{BUSINESS.legalName && ` (${BUSINESS.brandName})`}</li>
          <li>Email: <a href={`mailto:${BUSINESS.supportEmail}`}>{BUSINESS.supportEmail}</a></li>
          <li>Phone / WhatsApp: <a href={BUSINESS.phoneTel}>{BUSINESS.phone}</a></li>
          {BUSINESS.supportHours && <li>Support hours: {BUSINESS.supportHours}</li>}
          {(BUSINESS.supportAddress || BUSINESS.registeredAddress) && <li>Address: {BUSINESS.supportAddress || BUSINESS.registeredAddress}</li>}
          {BUSINESS.gstin && <li>GSTIN: {BUSINESS.gstin}</li>}
        </ul>
        <p>Prefer a quick chat? <button type="button" className="lg-linkbtn" onClick={openConnectPopup}>Leave your WhatsApp number</button> and we'll get back to you. Payments are processed by {OPERATIONS.paymentGateway}; for education orders, see the <Link to="/education/faq">Education FAQs</Link> first — the answer may already be there.</p>
      </section>

      <EventEnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </LegalPageLayout>
  );
}

/* ============================================================ EDUCATION FAQ */
const FAQS = [
  { q: 'What is KORE 360 Education?', a: <>The education side of KORE 360. It shares practical knowledge of the sports and events industry through e-books, paid 1:1 career-guidance calls, webinars and learning resources. See the <Link to="/education">Education overview</Link>.</> },
  { q: 'What will I receive after buying the e-book?', a: <>An email containing a personal link to read <em>Behind the Field</em> in your browser. The e-book is {OPERATIONS.ebookFormat}.</> },
  { q: 'How do I access my e-book?', a: <>Open the link in the email we send after your payment is confirmed. It works in any modern browser without an app. You can use the same link to come back to the e-book later. The link is personal to you, so please don't share it. More in the <Link to="/digital-delivery-policy">Digital Product Delivery Policy</Link>.</> },
  { q: "What if I don't receive the access email?", a: <>Check your spam and promotions folders and the inbox you used at checkout. If it's still missing, email <a href={mailto('E-book access')}>{BUSINESS.supportEmail}</a> with your name, checkout email and payment reference, and we'll re-send it.</> },
  { q: 'What happens during a 1:1 Clarity Call?', a: <>A 30-minute video call on Google Meet at the time you booked. It covers your background and a route into the industry that fits it, and ends with a short action plan. Once payment is confirmed, you get a Google Calendar invitation with the Meet link.</> },
  { q: 'Does a consultation guarantee a sports-industry job?', a: <>No. Our e-books, calls and webinars give you guidance and industry knowledge. They don't guarantee a job, internship, admission or placement. See our <Link to="/terms-and-conditions#education-disclaimer">Terms</Link> and <Link to="/disclaimer">Disclaimer</Link>.</> },
  { q: 'Can I reschedule my consultation?', a: <>Contact us as early as you can before the session at <a href={mailto('Reschedule request')}>{BUSINESS.supportEmail}</a> and we'll do our best to find another slot. See the <Link to="/refund-policy#sessions">Cancellation &amp; Refund Policy</Link>.</> },
  { q: 'What happens if KORE 360 cancels a session?', a: <>You can choose a new slot or a refund for that session. See the <Link to="/refund-policy#sessions">Cancellation &amp; Refund Policy</Link>.</> },
  { q: 'Will webinars be recorded?', a: <>Unless the webinar page says a recording is included, webinars are live-only and a recording isn't guaranteed.</> },
  { q: 'How do I contact support?', a: <>Email <a href={mailto('Education support')}>{BUSINESS.supportEmail}</a>, or see <Link to="/contact">Contact &amp; Support</Link> for all the options.</> },
  { q: 'What is the refund policy?', a: <>It depends on the product. The <Link to="/refund-policy">Cancellation &amp; Refund Policy</Link> covers e-books, sessions, webinars, courses and payment problems separately.</> },
  { q: 'Does KORE 360 directly hire candidates for listed opportunities?', a: <>Not usually. Many opportunities we share come from other organisations, and those organisations decide who is hired. If KORE 360 is the recruiter for a role, we'll say so clearly. See the <Link to="/disclaimer#jobs">Disclaimer</Link>.</> },
];

export function EducationFaq() {
  const [open, setOpen] = useState(0);
  return (
    <LegalPageLayout
      title="Education FAQs" eyebrow="HELP" path="/education/faq" isPolicy={false} showToc={false}
      description="Answers about KORE 360 e-book access, 1:1 Clarity Calls, webinars, rescheduling, refunds and support."
    >
      <div className="lg-faq">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="lg-faq-item">
              <h2 className="lg-faq-q">
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span><span aria-hidden="true" className="lg-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
              </h2>
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen} className="lg-faq-a"><p>{f.a}</p></div>
            </div>
          );
        })}
      </div>
    </LegalPageLayout>
  );
}

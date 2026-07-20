import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { LINKS, SESSIONS } from '../data.js';
import { track, priceToNumber } from '../lib/analytics.js';

const COPY = {
  ebook: {
    title: 'Payment received',
    intro: "Your e-book is on its way — check your email for the PDF, it can take a couple of minutes to arrive.",
    followUp: "If you don't see it within 15 minutes, check your spam folder or reach out and we'll sort it out.",
  },
  session: {
    title: 'Payment received',
    // Gmail/Calendar flags first-time invites from a sender it hasn't seen
    // the recipient interact with before as "unknown sender" and may not
    // auto-add them to the calendar — adding the sender to contacts is the
    // only real fix for that (nothing on our end can override it).
    intro: 'Your slot is confirmed. A calendar invite with the Google Meet link is on its way to your email — it can take a couple of minutes to arrive.',
    followUp: `If you don't see the invite within 15 minutes, check your spam folder. Gmail may also flag it as coming from an unknown sender the first time — add ${LINKS.email} to your contacts so it comes through cleanly. Reach out if it still doesn't show up and we'll sort it out.`,
  },
};

export default function BookingConfirmed() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const holdId = searchParams.get('holdId');
  const copy = COPY[type] || COPY.session;

  useEffect(() => {
    // Razorpay appends its own status param to this callback URL — only
    // count it as revenue when the payment actually went through, so an
    // abandoned or cancelled attempt landing here doesn't inflate GA4.
    const paid = searchParams.get('razorpay_payment_link_status') === 'paid';
    if (!paid || !holdId) return;
    const session = SESSIONS.find((s) => s.sessionId === type);
    if (!session) return;
    track('purchase', {
      transaction_id: holdId, // same holdId on a refresh = GA4 dedupes it, no double-counted sale
      currency: 'INR',
      value: priceToNumber(session.price),
      items: [{ item_id: session.sessionId, item_name: session.name, item_category: 'session', price: priceToNumber(session.price) }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageMeta title="Payment Confirmed" description="Your KORE 360 purchase is confirmed." path="/booking-confirmed" />
      <PageHeader eyebrow="CONFIRMED" title={copy.title} intro={copy.intro} />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '72px 32px 96px', textAlign: 'center' }}>
        <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 32px' }}>
          {copy.followUp}
        </p>
        <Link to="/" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>
          Back to home
        </Link>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';

export default function BookingConfirmed() {
  return (
    <>
      <PageMeta title="Booking Confirmed" description="Your KORE 360 session booking is confirmed." path="/booking-confirmed" />
      <PageHeader
        eyebrow="BOOKING"
        title="Payment received"
        intro="Your slot is confirmed. A calendar invite with the Google Meet link is on its way to your email — it can take a couple of minutes to arrive."
      />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '72px 32px 96px', textAlign: 'center' }}>
        <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 32px' }}>
          If you don't see the invite within 15 minutes, check your spam folder or reach out and we'll sort it out.
        </p>
        <Link to="/" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px' }}>
          Back to home
        </Link>
      </div>
    </>
  );
}

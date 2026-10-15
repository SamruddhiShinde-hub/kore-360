import { Link } from 'react-router-dom';
import { OPERATIONS } from '../legal/config.js';

// Pre-payment disclosures + the unticked terms acknowledgement shown above
// every "Continue to payment" button. The checkbox is enforced here in the
// browser only (native `required`) — Razorpay's hosted page has no
// equivalent, and acceptance isn't recorded server-side. Links open in a
// new tab so the buyer doesn't lose their place in the form/modal.
const DELIVERY = {
  ebook: 'You’ll receive an email with a personal link to read the e-book online (not a downloadable file) once payment is confirmed.',
  session: 'You’ll receive a Google Calendar invitation with a Google Meet link once payment is confirmed.',
};

export default function CheckoutConsent({ kind, checked, onChange }) {
  return (
    <>
      <p className="co-note">
        {DELIVERY[kind]} Payment is processed securely by {OPERATIONS.paymentGateway}. See our{' '}
        <Link to="/digital-delivery-policy" target="_blank" rel="noopener">Delivery Policy</Link> and{' '}
        <Link to="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</Link>. Questions?{' '}
        <Link to="/contact" target="_blank" rel="noopener">Contact support</Link>.
      </p>
      <label className="co-consent">
        <input type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>
          I have read and agree to the{' '}
          <Link to="/terms-and-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</Link>{' '}
          and acknowledge the applicable{' '}
          <Link to="/refund-policy" target="_blank" rel="noopener">Cancellation &amp; Refund Policy</Link>.
        </span>
      </label>
    </>
  );
}

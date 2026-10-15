import { LINKS } from '../data.js';

// ============================================================
//  Legal & business information — single source of truth for
//  every policy page, the footer and the contact page.
//
//  `null` means "not yet confirmed by KORE 360". Pages check
//  these and fall back to wording that stays true without them
//  — never fill one in with a guess or sample value. Every
//  policy is a DRAFT until `approved` below is flipped to true
//  by KORE 360 after legal review.
// ============================================================
export const BUSINESS = {
  brandName: 'KORE 360',
  legalName: null, // registered legal business name
  entityType: null, // e.g. sole proprietorship / LLP / private limited company
  registeredAddress: null,
  supportAddress: null, // only if different from registeredAddress
  supportEmail: LINKS.email, // already published in the site footer
  privacyEmail: LINKS.email, // swap for a dedicated privacy inbox once one exists
  phone: LINKS.phone, // already published in the site footer
  phoneTel: LINKS.phoneTel,
  supportHours: null, // e.g. 'Mon–Fri, 10:00–18:00 IST'
  gstin: null,
  jurisdiction: 'India',
  jurisdictionCity: null, // courts named in the dispute-resolution clause
  grievanceOfficer: {
    name: null,
    designation: null,
    email: null,
    phone: null,
  },
};

// Verified from the codebase (api/create-payment-link.js, api/_lib/ebook.js,
// api/razorpay-webhook.js) — update here if the integrations change.
export const OPERATIONS = {
  paymentGateway: 'Razorpay',
  paymentMethod: 'Razorpay-hosted payment links',
  ebookDelivery: 'An email, sent once Razorpay confirms the payment, containing a personal link to read the e-book in your browser',
  ebookFormat: 'read online in the KORE 360 reader (watermarked with the buyer’s name and email; not a downloadable file)',
  sessionDelivery: 'A Google Calendar invitation with a Google Meet link, sent to the email address used at booking once payment is confirmed',
};

// Business rules that must come from KORE 360, not from this codebase.
// While null, the refund/delivery pages say the rule is being finalised and
// that requests are reviewed individually.
export const RULES = {
  ebookRefund: null,
  sessionCancellation: null,
  sessionRescheduleNotice: null, // e.g. '24 hours' — do not invent
  sessionNoShow: null,
  webinarRefund: null,
  webinarRecording: null,
  courseRefund: null,
  refundProcessingPeriod: null,
  deliveryTimeframe: null,
  dataRetention: null,
  grievanceAcknowledgement: null, // e.g. 'within 48 hours' once the team can commit to it
  grievanceResolution: null,
};

export const POLICY_LAST_UPDATED = '15 October 2026';

export const POLICY_STATUS = {
  approved: false, // flip to true only after owner + legal adviser sign-off
  effectiveDate: null,
};

export const POLICY_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cancellation & Refund Policy', to: '/refund-policy' },
  { label: 'Digital Product Delivery Policy', to: '/digital-delivery-policy' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Disclaimer', to: '/disclaimer' },
  { label: 'Grievance Redressal', to: '/grievance-redressal' },
];

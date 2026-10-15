import { Link } from 'react-router-dom';
import LegalPageLayout from '../../components/LegalPageLayout.jsx';
import { BUSINESS, OPERATIONS, RULES } from '../../legal/config.js';
import { openCookieSettings } from '../../lib/consent.js';

// Policy copy is a DRAFT pending approval by KORE 360 and its legal adviser
// (see POLICY_STATUS in src/legal/config.js). Anything business-specific
// that hasn't been confirmed is read from config and, while null, replaced
// with wording that stays accurate without it — never a guessed value.

const Email = ({ addr = BUSINESS.supportEmail }) => <a href={`mailto:${addr}`}>{addr}</a>;

function Operator() {
  const name = BUSINESS.legalName ? `${BUSINESS.legalName}${BUSINESS.entityType ? `, a ${BUSINESS.entityType}` : ''}, which operates under the brand KORE 360` : 'KORE 360';
  return (
    <>
      {name}
      {BUSINESS.registeredAddress && <>, with its registered address at {BUSINESS.registeredAddress}</>}
      {BUSINESS.gstin && <> (GSTIN {BUSINESS.gstin})</>}
    </>
  );
}

function CookieSettingsLink({ children = 'Cookie Settings' }) {
  return <button type="button" className="lg-linkbtn" onClick={openCookieSettings}>{children}</button>;
}

// Rule text from config, or an honest "reviewed individually" fallback.
function Rule({ value, children }) {
  return value ? <p>{value}</p> : <p>{children}</p>;
}

const STATUTORY = (
  <p>Nothing in this policy limits any right you have under applicable Indian consumer protection law that cannot be excluded by agreement.</p>
);

/* ============================================================ PRIVACY */
export function PrivacyPolicy() {
  const sections = [
    { id: 'introduction', title: '1. Introduction', body: (
      <>
        <p>This Privacy Policy explains how <Operator /> (“KORE 360”, “we”, “us”) collects, uses and protects personal information when you use kore360.in, buy our education products, book a session or send us an enquiry.</p>
        <p>KORE 360 decides why and how this information is processed and is responsible for it.</p>
      </>
    ) },
    { id: 'collect', title: '2. Information we collect', body: (
      <>
        <p><strong>Information you give us</strong></p>
        <ul>
          <li><strong>Purchases and bookings</strong> (e-book, 1:1 Clarity Call, webinars): your name, email address and phone number, the product or session, the time slot you picked and the status of your order.</li>
          <li><strong>Payment details from Razorpay:</strong> when you pay, Razorpay tells us whether the payment succeeded, its reference and the contact number you confirmed at checkout. We do not receive or store your card, UPI or bank account details.</li>
          <li><strong>Event and league enquiries:</strong> your name, organisation, email, phone, and the details you share about your event (type, location, timeline, budget, services needed and project description).</li>
          <li><strong>“Connect with us” form:</strong> your name, WhatsApp number and the reason you're getting in touch.</li>
          <li><strong>Correspondence:</strong> anything you send us by email, WhatsApp or phone.</li>
        </ul>
        <p><strong>Information collected automatically</strong> (only with your consent)</p>
        <ul>
          <li><strong>Analytics:</strong> pages visited, interactions, approximate location, device and browser information and cookie identifiers, collected by Google Analytics and Microsoft Clarity. Clarity can record how pages are used (clicks, scrolling and mouse movement) to help us find usability problems.</li>
          <li><strong>Campaign attribution:</strong> if you arrive from a link carrying campaign tags (UTM parameters) and allow marketing cookies, we store those tags for your visit and attach them to any enquiry you submit.</li>
        </ul>
        <p>The e-book reader adds your name and email as a watermark on each page you view, using the details from your purchase.</p>
      </>
    ) },
    { id: 'use', title: '3. Why we use it', body: (
      <ul>
        <li>To process purchases and deliver digital products.</li>
        <li>To schedule consultations and webinars and send calendar invitations and joining links.</li>
        <li>To send purchase and booking confirmations.</li>
        <li>To provide customer support and answer enquiries, including event and partnership enquiries.</li>
        <li>To keep the website and our products secure and prevent misuse (for example, the e-book watermark discourages unauthorised sharing).</li>
        <li>To understand and improve the website — only with your analytics consent.</li>
        <li>To measure where enquiries come from — only with your marketing consent.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
    ) },
    { id: 'payments', title: '4. Payments', body: (
      <p>Payments are processed by {OPERATIONS.paymentGateway} on its own secure, hosted payment page. You enter your card, UPI or banking details directly with {OPERATIONS.paymentGateway}, not on kore360.in. We receive the payment outcome, amount, payment reference and the contact number confirmed during checkout. {OPERATIONS.paymentGateway}'s handling of your data is governed by its own privacy policy.</p>
    ) },
    { id: 'providers', title: '5. Service providers we use', body: (
      <>
        <p>We share information with these providers only as needed for them to provide their service to us:</p>
        <ul>
          <li><strong>Razorpay</strong> — payment processing.</li>
          <li><strong>Google Workspace</strong> (Gmail, Google Calendar, Google Meet, Google Sheets) — sending emails, calendar invitations and video calls, and keeping our order, booking and enquiry records.</li>
          <li><strong>Vercel</strong> — website hosting and the secure storage the e-book is served from.</li>
          <li><strong>Web3Forms</strong> — delivers messages from the “Connect with us” form to our inbox.</li>
          <li><strong>Google Analytics</strong> (via Google Tag Manager) and <strong>Microsoft Clarity</strong> — website analytics, only with your consent.</li>
          <li><strong>Google Fonts</strong> — serves the website's typeface; your browser requests the font files from Google.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </>
    ) },
    { id: 'cookies', title: '6. Cookies and similar technologies', body: (
      <p>We use strictly necessary storage to run the website and remember your privacy choice. Analytics, marketing and functional cookies are used only if you allow them. See our <Link to="/cookie-policy">Cookie Policy</Link> for details, and change your choice at any time in <CookieSettingsLink />.</p>
    ) },
    { id: 'retention', title: '7. How long we keep information', body: (
      <Rule value={RULES.dataRetention}>
        We keep personal information only as long as we need it for the purposes above. Order and payment records are kept for as long as tax and accounting law requires. Enquiries and support correspondence are kept while they remain relevant to the conversation or business relationship. You can ask us to delete information we no longer need (see section 9).
      </Rule>
    ) },
    { id: 'security', title: '8. Security', body: (
      <p>We use reasonable safeguards to protect personal information: access to our records is restricted, payment details are handled by {OPERATIONS.paymentGateway} rather than by us, e-book links are signed so they can't be altered, and the website is served over HTTPS. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
    ) },
    { id: 'rights', title: '9. Your choices and requests', body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what personal information we hold about you;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>delete information we no longer need, subject to records we must keep by law;</li>
          <li>stop using information you previously consented to us using (withdrawing consent doesn't affect anything already done on the basis of that consent);</li>
          <li>help with a privacy concern or complaint.</li>
        </ul>
        <p>To make a request, email <Email addr={BUSINESS.privacyEmail} /> with the subject “Privacy request”, from the email address you used with us where possible. Tell us what you'd like us to do. We may ask you to confirm your identity before sharing or changing any information, and we'll tell you if a legal obligation stops us from completing all or part of a request.</p>
        <p>You can withdraw cookie consent yourself at any time in <CookieSettingsLink />.</p>
      </>
    ) },
    { id: 'international', title: '10. Processing outside India', body: (
      <p>Some of our service providers (including Google, Microsoft, Vercel and Web3Forms) may process or store information on servers located outside India. Where this happens, the information is handled under those providers' own terms and safeguards.</p>
    ) },
    { id: 'children', title: "11. Children's information", body: (
      <p>Our education products are intended for students, graduates and professionals planning a career in sports. If you are under 18, please involve a parent or lawful guardian before sharing personal information or making a purchase. If you believe a child has given us personal information without that involvement, contact us and we will review it.</p>
    ) },
    { id: 'contact', title: '12. Contact', body: (
      <p>For privacy questions or requests, email <Email addr={BUSINESS.privacyEmail} />. For complaints, see <Link to="/grievance-redressal">Grievance Redressal</Link>.</p>
    ) },
    { id: 'updates', title: '13. Changes to this policy', body: (
      <p>We may update this policy as our services or the law change — including as obligations under India's Digital Personal Data Protection Act, 2023 and its Rules come into force. The “Last updated” date at the top shows the latest version. Where a change materially affects how we use information you've already given us, we'll take reasonable steps to let you know.</p>
    ) },
  ];
  return <LegalPageLayout title="Privacy Policy" path="/privacy-policy" description="How KORE 360 collects, uses and protects personal information across purchases, bookings, enquiries and website analytics." sections={sections} />;
}

/* ============================================================ TERMS */
export function Terms() {
  const sections = [
    { id: 'acceptance', title: '1. About these terms', body: (
      <p>These Terms &amp; Conditions apply to your use of kore360.in and to any purchase or booking you make through it. The website is operated by <Operator />. By using the website or buying from us, you agree to these terms, together with our <Link to="/privacy-policy">Privacy Policy</Link>, <Link to="/refund-policy">Cancellation &amp; Refund Policy</Link> and <Link to="/digital-delivery-policy">Digital Product Delivery Policy</Link>.</p>
    ) },
    { id: 'use', title: '2. Using the website', body: (
      <p>You may use the website for lawful, personal or business purposes. If you are under 18, please involve a parent or lawful guardian before buying or booking anything. Details you give us when buying or booking must be accurate — we use them to deliver what you've bought.</p>
    ) },
    { id: 'services', title: '3. What we offer', body: (
      <>
        <p>KORE 360 has three areas of work:</p>
        <ul>
          <li><strong>Events</strong> — sports and league management, corporate events, production, hospitality, sponsorship and event operations. These are delivered under separate proposals and agreements; service descriptions on the website are indicative only.</li>
          <li><strong>Education</strong> — digital e-books, paid 1:1 career-guidance sessions, webinars and, where offered, courses.</li>
          <li><strong>Talent</strong> — recruitment support, workforce solutions and career-opportunity enquiries.</li>
        </ul>
      </>
    ) },
    { id: 'ebooks', title: '4. E-book purchases', body: (
      <p>After {OPERATIONS.paymentGateway} confirms your payment, we email you a personal link to read the e-book. The e-book is {OPERATIONS.ebookFormat}. See the <Link to="/digital-delivery-policy">Digital Product Delivery Policy</Link>.</p>
    ) },
    { id: 'sessions', title: '5. 1:1 consultations', body: (
      <p>When you book a paid session you choose an available time slot, which is held for 15 minutes while you complete payment. Once payment is confirmed you receive {OPERATIONS.sessionDelivery.charAt(0).toLowerCase() + OPERATIONS.sessionDelivery.slice(1)}. Sessions take place online at the booked time (Indian Standard Time).</p>
    ) },
    { id: 'webinars', title: '6. Webinars', body: (
      <p>Webinars are live online sessions held at the advertised date and time. Joining details are sent to the email used at booking once payment is confirmed. Webinar-specific details (format, duration, any bonus material) are shown on the webinar page at the time of booking.</p>
    ) },
    { id: 'courses', title: '7. Online courses', body: (
      <p>Where an online course is offered, its content, format and any access period will be described on its page before purchase, and those details form part of these terms.</p>
    ) },
    { id: 'pricing', title: '8. Prices and payment', body: (
      <p>Prices are shown in Indian Rupees (₹) on the relevant page and in the booking window before you pay; the amount charged is the amount shown on the {OPERATIONS.paymentGateway} payment page. Payments are processed by {OPERATIONS.paymentGateway} under its own terms. Promotional prices and coupon codes apply only as stated and only while valid.</p>
    ) },
    { id: 'confirmation', title: '9. Order confirmation', body: (
      <p>Your order is confirmed only when {OPERATIONS.paymentGateway} confirms the payment to us. {OPERATIONS.paymentGateway} may also email you its own payment receipt. Keep these emails — they're your purchase record.</p>
    ) },
    { id: 'delivery', title: '10. Delivery and access', body: (
      <p>Digital products and session details are delivered by email, as set out in the <Link to="/digital-delivery-policy">Digital Product Delivery Policy</Link>. If something doesn't arrive, contact us at <Email />.</p>
    ) },
    { id: 'cancellation', title: '11. Cancellation and rescheduling', body: (
      <p>Cancellation, rescheduling and refunds are covered product by product in the <Link to="/refund-policy">Cancellation &amp; Refund Policy</Link>.</p>
    ) },
    { id: 'ip', title: '12. Intellectual property', body: (
      <p>The website and all KORE 360 content — including e-books, session materials, webinar content, text, graphics, logos and videos — belong to KORE 360 or its licensors and are protected by law.</p>
    ) },
    { id: 'licence', title: '13. Your licence to digital material', body: (
      <p>When you buy a digital product you get a personal, non-transferable, non-exclusive licence to access and use it for your own learning. The licence is linked to the name and email address you used at purchase.</p>
    ) },
    { id: 'restrictions', title: '14. Sharing and resale', body: (
      <p>You may not copy, share, distribute, resell, publish, record or otherwise make our digital products or session content available to others, or remove the watermark from them, without our written permission.</p>
    ) },
    { id: 'education-disclaimer', title: '15. Education and career outcomes', body: (
      <>
        <p>KORE 360's educational resources, career guidance and consultation services provide information, industry knowledge and professional direction.</p>
        <p><strong>Buying an e-book, booking a consultation or attending a webinar does not guarantee a job, internship, admission, sponsorship or placement.</strong> Outcomes depend on many factors outside our control, including your own applications and the decisions of employers and institutions.</p>
      </>
    ) },
    { id: 'third-party', title: '16. Third-party websites and opportunities', body: (
      <p>We may link to or share opportunities from other organisations. Unless we expressly say we're acting as the recruiter, KORE 360 is not the hiring organisation and does not decide who is selected. Third-party websites and opportunities have their own terms and privacy practices, which we don't control.</p>
    ) },
    { id: 'conduct', title: '17. Acceptable use', body: (
      <p>Please don't misuse the website or our services — for example by attempting to access systems or content you aren't entitled to, interfering with the website's operation, submitting false information, or behaving abusively towards our team during sessions or in correspondence. We may decline or end a service where this happens, subject to any refund you are entitled to by law.</p>
    ) },
    { id: 'availability', title: '18. Changes to services', body: (
      <p>We may update, pause or withdraw products, sessions or website features. This won't affect anything you have already paid for without the remedies described in the <Link to="/refund-policy">Cancellation &amp; Refund Policy</Link>.</p>
    ) },
    { id: 'liability', title: '19. Limitation of liability', body: (
      <>
        <p>We provide our services with reasonable care and skill. To the extent permitted by law, KORE 360 is not liable for indirect or consequential losses (such as loss of opportunity or income) arising from use of the website or our education services, and our total liability for a purchase is limited to the amount you paid for it.</p>
        <p>This does not exclude or limit any liability that cannot be excluded or limited under applicable law, including your rights under the Consumer Protection Act, 2019.</p>
      </>
    ) },
    { id: 'law', title: '20. Governing law and disputes', body: (
      <p>These terms are governed by the laws of {BUSINESS.jurisdiction}. If something goes wrong, please contact us first so we can try to resolve it. {BUSINESS.jurisdictionCity ? <>Subject to your statutory rights, disputes are subject to the jurisdiction of the courts at {BUSINESS.jurisdictionCity}.</> : <>This does not affect your right to approach a consumer commission or court that has jurisdiction under applicable law.</>}</p>
    ) },
    { id: 'support', title: '21. Support and grievances', body: (
      <p>For help, email <Email /> or see <Link to="/contact">Contact &amp; Support</Link>. For formal complaints, see <Link to="/grievance-redressal">Grievance Redressal</Link>.</p>
    ) },
    { id: 'changes', title: '22. Changes to these terms', body: (
      <p>We may update these terms from time to time. The version shown when you make a purchase applies to that purchase.</p>
    ) },
  ];
  return <LegalPageLayout title="Terms & Conditions" path="/terms-and-conditions" description="The terms that apply to using kore360.in and to buying KORE 360 e-books, consultations, webinars and courses." sections={sections} />;
}

/* ============================================================ REFUNDS */
export function RefundPolicy() {
  const contact = <>email <Email /> with your name, the email used at purchase and your payment reference</>;
  const sections = [
    { id: 'overview', title: 'How this policy works', body: (
      <>
        <p>Cancellation and refund terms differ by product, so each is covered separately below. To raise any request, {contact}.</p>
        {STATUTORY}
      </>
    ) },
    { id: 'ebooks', title: 'A. Digital e-books', body: (
      <>
        <p><strong>Access:</strong> once payment is confirmed, we email a personal link to read the e-book in your browser. See the <Link to="/digital-delivery-policy">Digital Product Delivery Policy</Link>.</p>
        <p><strong>Not received, or link not working:</strong> check your spam or promotions folder, then contact us. We'll investigate and re-send working access.</p>
        <p><strong>Charged twice, or charged the wrong amount:</strong> contact us with both payment references. Where a duplicate or incorrect charge is confirmed, we'll arrange a refund of the excess.</p>
        <p><strong>Not delivered:</strong> if we cannot deliver access to an e-book you paid for, you're entitled to a refund.</p>
        <p><strong>Other refund requests:</strong></p>
        <Rule value={RULES.ebookRefund}>Other requests (for example, after the e-book has been successfully delivered and opened) are reviewed individually while our detailed rules are being finalised.</Rule>
      </>
    ) },
    { id: 'sessions', title: 'B. 1:1 guidance sessions', body: (
      <>
        <p><strong>Rescheduling or cancelling:</strong> contact us as early as possible before your session.</p>
        <Rule value={RULES.sessionCancellation}>We'll do our best to move your session to another available slot. Notice periods and refund eligibility for customer cancellations are being finalised; until they're published, each request is reviewed individually.</Rule>
        {RULES.sessionRescheduleNotice && <p>Reschedule requests need at least {RULES.sessionRescheduleNotice}' notice.</p>}
        <p><strong>Late arrival or no-show:</strong></p>
        <Rule value={RULES.sessionNoShow}>Sessions run for their booked length from the scheduled start time. If you can't attend, please tell us before the session starts so we can try to help.</Rule>
        <p><strong>If KORE 360 cancels, or can't deliver the session:</strong> you can choose a new slot or a refund for the session.</p>
        <p><strong>Technical problems:</strong> if a session is materially disrupted by a technical problem on our side, we'll offer to complete or rearrange it.</p>
      </>
    ) },
    { id: 'webinars', title: 'C. Webinars', body: (
      <>
        <p><strong>If we cancel or change the date:</strong> we'll tell you by email. If you can't make a new date, you can ask for a refund.</p>
        <p><strong>Access problems:</strong> contact us before or during the webinar so we can help you join.</p>
        <p><strong>Recordings:</strong></p>
        <Rule value={RULES.webinarRecording}>Unless the webinar page says a recording is included, webinars are live-only and a recording isn't guaranteed.</Rule>
        <p><strong>If you can't attend, or other requests:</strong></p>
        <Rule value={RULES.webinarRefund}>Requests are reviewed individually while our detailed rules are being finalised.</Rule>
      </>
    ) },
    { id: 'courses', title: 'D. Online courses', body: (
      <>
        <p>Where an online course is offered:</p>
        <ul>
          <li><strong>Access problems or duplicate payments</strong> are handled as for e-books (section A).</li>
          <li><strong>If we cancel a course</strong> you've paid for, or it's materially different from how it was described, you can ask for a refund.</li>
        </ul>
        <Rule value={RULES.courseRefund}>Other refund requests are reviewed individually. Any course-specific terms will be shown on the course page before purchase.</Rule>
      </>
    ) },
    { id: 'payments', title: 'E. Payment problems and processing', body: (
      <>
        <p><strong>Failed payments:</strong> if money left your account but your payment failed, {OPERATIONS.paymentGateway} and your bank normally reverse it automatically. If it doesn't come back, contact us with the payment reference.</p>
        <p><strong>How refunds are paid:</strong> approved refunds go back to the original payment method through {OPERATIONS.paymentGateway}.</p>
        <Rule value={RULES.refundProcessingPeriod && `Refunds are initiated within ${RULES.refundProcessingPeriod} of approval.`}>We'll confirm by email when a refund has been initiated. After that, how long it takes to show in your account depends on {OPERATIONS.paymentGateway} and your bank.</Rule>
        <p><strong>Chargebacks:</strong> please contact us first — most problems can be fixed faster directly. Raising a dispute with your bank remains your right.</p>
      </>
    ) },
  ];
  return <LegalPageLayout title="Cancellation & Refund Policy" path="/refund-policy" description="Cancellation, rescheduling and refund terms for KORE 360 e-books, 1:1 sessions, webinars and courses." sections={sections} />;
}

/* ============================================================ DELIVERY */
export function DeliveryPolicy() {
  const sections = [
    { id: 'products', title: '1. What we deliver digitally', body: (
      <ul>
        <li><strong>E-books</strong> — read online in our secure reader.</li>
        <li><strong>1:1 guidance sessions</strong> — live video calls on Google Meet.</li>
        <li><strong>Webinars</strong> — live online sessions on Google Meet.</li>
        <li><strong>Online courses</strong> — where offered, delivery is described on the course page.</li>
      </ul>
    ) },
    { id: 'ebooks', title: '2. E-books', body: (
      <>
        <p><strong>How you receive it:</strong> {OPERATIONS.ebookDelivery}.</p>
        <p><strong>Format:</strong> the e-book is {OPERATIONS.ebookFormat}. It opens in your browser — no app needed.</p>
        <p><strong>When:</strong> the email is sent automatically once {OPERATIONS.paymentGateway} confirms your payment to us. {RULES.deliveryTimeframe ? <>This usually happens {RULES.deliveryTimeframe}.</> : <>This normally happens shortly after payment, but delays at the payment provider or email service can occur.</>}</p>
        <p><strong>Using the link again:</strong> your link isn't set to expire, and you can use it to come back to the e-book. It's personal to you — please don't share it.</p>
      </>
    ) },
    { id: 'sessions', title: '3. 1:1 sessions and webinars', body: (
      <>
        <p><strong>Booking confirmation:</strong> {OPERATIONS.sessionDelivery}. {OPERATIONS.paymentGateway} may also email you its own payment receipt.</p>
        <p><strong>Webinars</strong> work the same way. Webinar bookings that include a bonus e-book receive a separate email with the reader link.</p>
        <p>All times are Indian Standard Time (IST).</p>
      </>
    ) },
    { id: 'missing', title: '4. If something hasn’t arrived', body: (
      <ol>
        <li>Check your spam, junk or promotions folder, and that you're looking in the inbox you used at checkout.</li>
        <li>Check your bank or UPI app to confirm the payment went through.</li>
        <li>Email <Email /> with your name, the email used at checkout and the payment reference.</li>
      </ol>
    ) },
    { id: 'resolution', title: '5. How we resolve delivery problems', body: (
      <p>We'll check the payment and re-send your access or session details. If we can't deliver a product or session you've paid for, you can ask for a refund under our <Link to="/refund-policy">Cancellation &amp; Refund Policy</Link>.</p>
    ) },
  ];
  return <LegalPageLayout title="Digital Product Delivery Policy" path="/digital-delivery-policy" description="How KORE 360 delivers e-books, session confirmations and webinar links, and what to do if something doesn't arrive." sections={sections} />;
}

/* ============================================================ COOKIES */
const COOKIE_ROWS = {
  necessary: [
    ['kore-consent', 'KORE 360', 'Remembers your cookie choices', 'First-party (local storage)', 'Until you change it or clear your browser data'],
    ['Payment page cookies', 'Razorpay', 'Security and fraud prevention on the hosted payment page (set on Razorpay’s own domain)', 'Third-party', 'Set by Razorpay'],
  ],
  analytics: [
    ['_ga', 'Google Analytics', 'Distinguishes visitors', 'First-party cookie', '2 years'],
    ['_ga_GQWC25TSBB', 'Google Analytics', 'Keeps session state', 'First-party cookie', '2 years'],
    ['_clck', 'Microsoft Clarity', 'Identifies a returning visitor', 'First-party cookie', '1 year'],
    ['_clsk', 'Microsoft Clarity', 'Groups page views into one session', 'First-party cookie', '1 day'],
    ['CLID, MUID', 'Microsoft Clarity', 'Identifies the visitor across Clarity sites', 'Third-party cookies', 'Up to about 1 year'],
  ],
  marketing: [
    ['kore-utm', 'KORE 360', 'Remembers which campaign link brought you here, so enquiries can be attributed to it', 'First-party (session storage)', 'Until you close the tab'],
  ],
  functional: [
    ['kore-connect-popup-seen', 'KORE 360', 'Stops the “Connect with us” popup reappearing during your visit', 'First-party (session storage)', 'Until you close the tab'],
  ],
};

function CookieTable({ rows }) {
  return (
    <div className="lg-table-wrap">
      <table className="lg-table">
        <thead><tr><th scope="col">Name</th><th scope="col">Provider</th><th scope="col">Purpose</th><th scope="col">Type</th><th scope="col">Duration</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th scope="row" key={i}>{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function CookiePolicy() {
  const sections = [
    { id: 'what', title: '1. What this covers', body: (
      <p>Cookies are small files a website stores in your browser; local and session storage are similar browser technologies. This policy lists the ones kore360.in uses, grouped by purpose. Optional categories are off until you turn them on, and you can change your choice at any time in <CookieSettingsLink />.</p>
    ) },
    { id: 'necessary', title: '2. Strictly necessary — always active', body: (
      <>
        <p>Needed for the website to work and to remember your privacy choice. These can't be switched off in Cookie Settings.</p>
        <CookieTable rows={COOKIE_ROWS.necessary} />
      </>
    ) },
    { id: 'analytics', title: '3. Analytics — optional, off by default', body: (
      <>
        <p>Help us understand how the website performs and how visitors use it. Google Tag Manager, which loads Google Analytics and Microsoft Clarity, is not loaded at all unless you turn this category on.</p>
        <CookieTable rows={COOKIE_ROWS.analytics} />
      </>
    ) },
    { id: 'marketing', title: '4. Marketing & advertising — optional, off by default', body: (
      <>
        <p>Help us understand which campaigns bring visitors and enquiries. We don't currently run advertising pixels (such as Meta Pixel or Google Ads tags). If we add any, they'll be listed here and will only run with this consent.</p>
        <CookieTable rows={COOKIE_ROWS.marketing} />
      </>
    ) },
    { id: 'functional', title: '5. Functional — optional, off by default', body: (
      <>
        <p>Remember optional preferences between visits. Without this consent the features still work, but your choices are forgotten when you reload the page.</p>
        <CookieTable rows={COOKIE_ROWS.functional} />
      </>
    ) },
    { id: 'manage', title: '6. Changing or withdrawing consent', body: (
      <>
        <p>Open <CookieSettingsLink /> (also linked in the website footer) at any time. When you switch a category off, we stop the related technology from then on and delete the first-party cookies and storage listed for it.</p>
        <p>We can't delete cookies set on another company's domain (such as Microsoft Clarity's CLID and MUID) — you can remove those in your browser settings. Data already sent to analytics providers before you withdrew consent is held under their own retention settings.</p>
        <p>Google Fonts serves our typeface; loading it shares your IP address and browser information with Google, but it doesn't set cookies.</p>
      </>
    ) },
  ];
  return <LegalPageLayout title="Cookie Policy" path="/cookie-policy" description="The cookies and similar technologies kore360.in uses, why, and how to change your choices." sections={sections} />;
}

/* ============================================================ DISCLAIMER */
export function Disclaimer() {
  const sections = [
    { id: 'education', title: 'Educational information', body: (
      <p>Our e-books, webinars, blog articles and other learning resources are for information and education. They reflect our experience of the sports and events industry and are not a promise of any particular career outcome.</p>
    ) },
    { id: 'jobs', title: 'Job and internship listings', body: (
      <p>Opportunities we share may come from third-party organisations. Unless we expressly say otherwise, KORE 360 is not the recruiter or hiring manager for those listings. Eligibility, selection and hiring decisions stay with the employer concerned.</p>
    ) },
    { id: 'consultations', title: 'Consultations', body: (
      <p>Guidance in 1:1 sessions is based on the information you share with us. It does not guarantee admission, an internship, a job, a placement or any other result.</p>
    ) },
    { id: 'links', title: 'Third-party links', body: (
      <p>The website links to other platforms (for example Instagram, WhatsApp, Google Forms and Razorpay). They have their own terms and privacy practices, which we don't control.</p>
    ) },
    { id: 'events', title: 'Events and commercial services', body: (
      <p>Descriptions of our events, league and commercial services are indicative. The actual scope, responsibilities and deliverables of any engagement are set out in a formal proposal or agreement.</p>
    ) },
    { id: 'rights', title: 'Your rights', body: STATUTORY },
  ];
  return <LegalPageLayout title="Disclaimer" path="/disclaimer" description="The scope and limits of KORE 360's educational content, consultations, shared opportunities and service descriptions." sections={sections} showToc={false} />;
}

/* ============================================================ GRIEVANCE */
export function Grievance() {
  const go = BUSINESS.grievanceOfficer;
  const sections = [
    { id: 'who', title: 'Who handles complaints', body: (
      <>
        <p>Complaints about purchases, bookings, delivery, refunds or how we've handled your personal information are handled by <Operator />.</p>
        {go.name ? (
          <ul className="lg-plain">
            <li><strong>Grievance Officer:</strong> {go.name}{go.designation && `, ${go.designation}`}</li>
            <li><strong>Email:</strong> <Email addr={go.email || BUSINESS.supportEmail} /></li>
            {go.phone && <li><strong>Phone:</strong> {go.phone}</li>}
            {BUSINESS.registeredAddress && <li><strong>Address:</strong> {BUSINESS.registeredAddress}</li>}
          </ul>
        ) : (
          <p>Send complaints to <Email /> with the subject line “Grievance”. Details of our designated Grievance Officer will be published on this page.</p>
        )}
      </>
    ) },
    { id: 'how', title: 'How to make a complaint', body: (
      <>
        <p>Please include:</p>
        <ul>
          <li>your full name and the email or phone number you used with us;</li>
          <li>the product, session or service concerned;</li>
          <li>your payment reference or order date, if relevant;</li>
          <li>what went wrong and what you'd like us to do;</li>
          <li>any screenshots or emails that help explain the issue.</li>
        </ul>
      </>
    ) },
    { id: 'timelines', title: 'What happens next', body: (
      <>
        {RULES.grievanceAcknowledgement && RULES.grievanceResolution ? (
          <p>We acknowledge complaints {RULES.grievanceAcknowledgement} and aim to resolve them {RULES.grievanceResolution}.</p>
        ) : (
          <p>We'll confirm we've received your complaint and keep you updated until it's resolved.</p>
        )}
        <p>If we need more information, we'll ask. For privacy-related complaints we may need to confirm your identity first.</p>
      </>
    ) },
    { id: 'escalation', title: 'If you are not satisfied', body: (
      <p>If you're not satisfied with our response, you can contact the National Consumer Helpline (dial 1915 or visit consumerhelpline.gov.in) or approach the consumer commission that has jurisdiction under the Consumer Protection Act, 2019.</p>
    ) },
  ];
  return <LegalPageLayout title="Grievance Redressal" path="/grievance-redressal" description="How to raise a complaint with KORE 360 about a purchase, booking, refund or personal information." sections={sections} showToc={false} />;
}

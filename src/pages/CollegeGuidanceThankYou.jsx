import PageMeta from '../components/PageMeta.jsx';
import logo from '../assets/logo.png';

// Landing page for the college-guidance link in Krish's email. The visitor
// has already done the one thing we asked, so this is display-only: no form,
// no CTA, no tracking beyond the standard page_view PageMeta sends. Loading
// or refreshing it never creates a lead — the lead is captured upstream by
// the email's tracking link, not here.
export default function CollegeGuidanceThankYou() {
  return (
    <>
      <PageMeta
        fullTitle="Thanks for your interest | KORE 360"
        description="Someone from the admissions team at a suitable sports management college will reach out to you."
        path="/education/college-guidance/thank-you"
        noindex
      />
      <section className="cg-thanks">
        <div className="cg-thanks-note">
          <img src={logo} alt="KORE 360" width="272" height="170" className="cg-thanks-logo" />
          <h1 className="cg-thanks-title">Thanks for your interest!</h1>
          <p className="cg-thanks-body">
            I’ll have someone from the admissions team at a suitable sports management college reach out to you.
          </p>
          <p className="cg-thanks-sign">
            <strong>Krish Lalwani</strong>
            <br />
            Founder, KORE 360
          </p>
        </div>
      </section>
    </>
  );
}

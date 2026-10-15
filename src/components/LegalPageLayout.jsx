import { Link } from 'react-router-dom';
import PageMeta from './PageMeta.jsx';
import { POLICY_LAST_UPDATED, POLICY_STATUS, POLICY_LINKS, BUSINESS } from '../legal/config.js';

// Shared shell for every policy/support page: always-dark header (so the
// nav's white links stay legible), a theme-aware reading surface, an
// optional table of contents, and the same contact + related-policy footer.
// `sections` is [{ id, title, body }]; body is JSX.
export default function LegalPageLayout({ title, description, path, eyebrow = 'LEGAL', intro, sections, children, showToc = true, isPolicy = true }) {
  return (
    <div className="lg">
      <PageMeta title={title} description={description} path={path} />
      <header className="lg-head">
        <div className="lg-shell">
          <div className="lg-eyebrow">{eyebrow}</div>
          <h1 className="lg-title">{title}</h1>
          {isPolicy && (
            <p className="lg-meta">
              Last updated: {POLICY_LAST_UPDATED}
              {POLICY_STATUS.effectiveDate && <> · Effective: {POLICY_STATUS.effectiveDate}</>}
            </p>
          )}
          {intro && <p className="lg-intro">{intro}</p>}
        </div>
      </header>

      <div className="lg-shell lg-body">
        {isPolicy && !POLICY_STATUS.approved && (
          <p className="lg-draft" role="note">
            <strong>Draft policy.</strong> This page is being finalised by KORE 360 and is subject to change. If anything here is unclear, please contact us before making a purchase.
          </p>
        )}

        {showToc && sections?.length > 2 && (
          <nav className="lg-toc" aria-label="On this page">
            <div className="lg-toc-title">On this page</div>
            <ol>
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ol>
          </nav>
        )}

        {sections?.map((s) => (
          <section key={s.id} id={s.id} className="lg-section" aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`}>{s.title}</h2>
            {s.body}
          </section>
        ))}

        {children}

        <aside className="lg-foot" aria-label="Contact and related policies">
          <div>
            <div className="lg-foot-title">Questions?</div>
            <p>
              Email <a href={`mailto:${BUSINESS.supportEmail}`}>{BUSINESS.supportEmail}</a>
              {' '}or visit <Link to="/contact">Contact &amp; Support</Link>.
            </p>
          </div>
          <div>
            <div className="lg-foot-title">Related</div>
            <ul>
              {POLICY_LINKS.filter((l) => l.to !== path).map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

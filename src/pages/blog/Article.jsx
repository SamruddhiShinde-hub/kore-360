import { Fragment } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Reveal from '../../components/Reveal.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import PageMeta from '../../components/PageMeta.jsx';
import { BLOG_POSTS } from '../../blogData.js';
import { ARTICLES } from './articles.js';

// Renders the data-driven posts in articles.js at /blogs/:slug, styled to
// match the hand-written posts beside it. Unknown slugs go back to /blogs.
const SITE_URL = 'https://kore360.in';
const AUTHOR = 'KORE 360 Editorial Team';

const pStyle = { fontSize: '17px', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 22px' };
const h2Style = { fontWeight: 800, fontSize: 'clamp(22px,2.8vw,28px)', letterSpacing: '-0.01em', margin: '44px 0 18px' };
const h3Style = { fontWeight: 800, fontSize: '19px', lineHeight: 1.35, margin: '28px 0 10px' };
const listStyle = { ...pStyle, paddingLeft: '22px' };
const liStyle = { marginBottom: '8px' };

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  ));
}

function renderBody(body) {
  return body.split(/\n{2,}/).map((block, i) => {
    const lines = block.split('\n');
    if (block.startsWith('## ')) return <h2 key={i} style={h2Style}>{inline(block.slice(3))}</h2>;
    if (block.startsWith('### ')) return <h3 key={i} style={h3Style}>{inline(block.slice(4))}</h3>;
    if (lines.every((l) => l.startsWith('- '))) {
      return <ul key={i} style={listStyle}>{lines.map((l, j) => <li key={j} style={liStyle}>{inline(l.slice(2))}</li>)}</ul>;
    }
    if (lines.every((l) => /^\d+\. /.test(l))) {
      return <ol key={i} style={listStyle}>{lines.map((l, j) => <li key={j} style={liStyle}>{inline(l.replace(/^\d+\. /, ''))}</li>)}</ol>;
    }
    return <p key={i} style={pStyle}>{inline(block)}</p>;
  });
}

const ctaBox = { marginTop: '52px', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '40px 34px', textAlign: 'center' };
const btn = { display: 'inline-flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', background: 'var(--kore-gradient)', padding: '15px 26px', borderRadius: '8px', textDecoration: 'none' };
const btnGhost = { ...btn, background: 'transparent', color: 'var(--text)', border: '1px solid rgba(var(--border-rgb),0.3)' };

function Cta({ kind }) {
  if (kind === 'careers') {
    return (
      <Reveal style={ctaBox}>
        <p style={{ fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(22px,3vw,30px)', margin: '0 0 18px' }}>Find your route into sport.</p>
        <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 28px' }}>
          Start with the Behind the Field e-book, or book a 1:1 clarity call to discuss your background and possible next steps.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/education/ebook" className="btn-accent" style={btn}>Get the e-book →</Link>
          <Link to="/education/clarity-call" style={btnGhost}>Book a clarity call</Link>
        </div>
        <p style={{ fontSize: '12.5px', color: 'var(--text-faint)', margin: '22px 0 0' }}>
          These are educational guidance products. They do not guarantee admissions, internships, jobs or placement.
        </p>
      </Reveal>
    );
  }
  return (
    <Reveal style={ctaBox}>
      <p style={{ fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(22px,3vw,30px)', margin: '0 0 18px' }}>Have an event brief?</p>
      <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 28px' }}>
        Share your location, tentative dates, participant count and format with KORE 360, and we'll look at the scope with you.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/contact" className="btn-accent" style={btn}>Tell us about your event →</Link>
        <Link to="/events" style={btnGhost}>Explore KORE 360 Events</Link>
      </div>
    </Reveal>
  );
}

export default function Article() {
  const { slug } = useParams();
  const article = ARTICLES[slug];
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!article || !post) return <Navigate to="/blogs" replace />;

  const path = `/blogs/${slug}`;
  const url = `${SITE_URL}${path}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: post.cover.startsWith('/') ? `${SITE_URL}${post.cover}` : `${SITE_URL}/og-image.jpg`,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: AUTHOR, url: `${SITE_URL}/about` },
      publisher: { '@type': 'Organization', name: 'KORE 360', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      keywords: article.keywords,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  ];
  const related = article.related.map((s) => BLOG_POSTS.find((p) => p.slug === s)).filter(Boolean);
  const dateLabel = new Date(`${post.date}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <PageMeta key={slug} fullTitle={article.seoTitle} description={article.description} path={path} type="article" jsonLd={jsonLd} />
      <PageHeader eyebrow="BLOG" title={article.title} intro={post.subtitle} bgImage={post.cover} bgImageMobile={post.cover} />

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 32px 40px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/blogs" style={{ color: 'var(--text-faint)' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{article.title}</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '13.5px', color: 'var(--text-faint)', marginBottom: '32px', paddingBottom: '28px', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
          <span style={{ fontWeight: 700, color: 'var(--text)' }}>{AUTHOR}</span>
          <span>·</span>
          <time dateTime={post.date}>{dateLabel}</time>
        </div>

        <figure style={{ margin: '0 0 36px' }}>
          <img src={post.cover} alt={post.coverAlt} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
        </figure>

        <div>{renderBody(article.body)}</div>

        <Cta kind={article.kind} />

        {related.length > 0 && (
          <nav aria-label="Related articles" style={{ marginTop: '44px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--text-faint)', marginBottom: '14px' }}>KEEP READING</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {related.map((r) => (
                <li key={r.slug}><Link to={`/blogs/${r.slug}`} style={{ fontWeight: 700, color: 'var(--kore-orange-text)' }}>{r.title} →</Link></li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </>
  );
}

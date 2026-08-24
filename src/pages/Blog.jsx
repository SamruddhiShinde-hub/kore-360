import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';

export default function Blog() {
  return (
    <>
      <PageMeta
        title="Blog"
        description="Ground-level stories on how sport is actually run — match days, events and careers, written by the people who've run it, not watched it."
        path="/blog"
      />
      <PageHeader
        eyebrow="BLOG"
        title="Stories from the ground"
        intro="What actually happens behind the matches, events and careers we talk about — written by the people who've run it, not watched it from the stands."
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {BLOG_POSTS.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i}
              as={Link}
              to={`/blog/${post.slug}`}
              className="card-hover"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', padding: '28px 30px' }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-faint)', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {new Date(`${post.date}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h2 style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.01em', margin: '0 0 8px' }}>{post.title}</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 14px' }}>{post.excerpt}</p>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--kore-orange-text)' }}>Read the story →</span>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

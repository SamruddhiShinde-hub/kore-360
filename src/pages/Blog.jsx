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
        path="/blogs"
      />
      <PageHeader
        eyebrow="BLOG"
        title="Stories from the ground"
        intro="What actually happens behind the matches, events and careers we talk about — written by the people who've run it, not watched it from the stands."
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '28px' }}>
          {BLOG_POSTS.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i}
              as={Link}
              to={`/blogs/${post.slug}`}
              className="card-hover"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', overflow: 'hidden' }}
            >
              {post.cover && (
                <img src={post.cover} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ padding: '22px 24px' }}>
                <h2 style={{ fontWeight: 800, fontSize: '19px', lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>{post.title}</h2>
                <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>
                  {post.author} · {new Date(`${post.date}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

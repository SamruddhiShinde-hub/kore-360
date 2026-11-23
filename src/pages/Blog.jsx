import { Link, useSearchParams } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData.js';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageMeta from '../components/PageMeta.jsx';

const TOPICS = [
  { id: 'events', label: 'Planning events' },
  { id: 'careers', label: 'Sports careers' },
];

export default function Blog() {
  const [params] = useSearchParams();
  const topic = TOPICS.find((t) => t.id === params.get('topic'));
  const posts = topic ? BLOG_POSTS.filter((p) => p.topic === topic.id) : BLOG_POSTS;

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px 96px' }}>
        <nav className="wk-filters bl-topics" aria-label="Filter articles by topic">
          <Link to="/blogs" className={`wk-filter${!topic ? ' is-active' : ''}`} aria-current={!topic ? 'page' : undefined} preventScrollReset>All articles</Link>
          {TOPICS.map((t) => (
            <Link key={t.id} to={`/blogs?topic=${t.id}`} className={`wk-filter${topic?.id === t.id ? ' is-active' : ''}`} aria-current={topic?.id === t.id ? 'page' : undefined} preventScrollReset>{t.label}</Link>
          ))}
        </nav>

        {topic?.id === 'events' && (
          <div className="bl-events-note">
            <p>Planning an event? See what KORE 360 delivers, from décor and production to league operations.</p>
            <div className="bl-events-links">
              <Link to="/events#services" className="hx-link">Event services <span aria-hidden="true" className="hx-arrow">→</span></Link>
              <Link to="/work" className="hx-link">Our work <span aria-hidden="true" className="hx-arrow">→</span></Link>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '28px' }}>
          {posts.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i % 3}
              as={Link}
              to={`/blogs/${post.slug}`}
              className="card-hover"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(var(--border-rgb),0.035)', border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: '16px', overflow: 'hidden' }}
            >
              {post.cover && (
                <img src={post.cover} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ padding: '22px 24px' }}>
                <div className="bl-topic-tag">{TOPICS.find((t) => t.id === post.topic)?.label}</div>
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

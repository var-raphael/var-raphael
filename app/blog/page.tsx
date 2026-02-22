import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata = { title: 'Blog — Raphael Samuel' };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #0e0d0c;
          --bg2:       #141310;
          --cream:     #e8e0d0;
          --cream-dim: rgba(232,224,208,0.55);
          --cream-xs:  rgba(232,224,208,0.2);
          --indigo:    #6366f1;
          --border:    rgba(232,224,208,0.08);
          --border-md: rgba(232,224,208,0.14);
        }

        body {
          background: var(--bg);
          color: var(--cream);
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 48px;
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'DM Mono', monospace; font-size: 13px;
          letter-spacing: 0.12em; color: var(--cream-dim); text-decoration: none;
        }
        .nav-logo span { color: var(--indigo); }
        .nav-back {
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.08em; color: var(--cream-dim);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-back:hover { color: var(--cream); }

        .page { max-width: 720px; margin: 0 auto; padding: 80px 40px 120px; }

        .eyebrow {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--indigo); margin-bottom: 12px;
        }
        .page-title {
          font-family: 'Playfair Display', serif; font-size: clamp(40px, 6vw, 60px);
          font-weight: 800; color: var(--cream); letter-spacing: -0.03em;
          line-height: 1; margin-bottom: 16px;
        }
        .page-sub {
          font-size: 15px; font-weight: 300; color: var(--cream-dim);
          line-height: 1.7; margin-bottom: 64px;
        }

        .post-list { display: flex; flex-direction: column; }
        .post-item {
          display: flex; align-items: flex-start; gap: 24px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: all 0.2s;
        }
        .post-item:first-child { border-top: 1px solid var(--border); }
        .post-item:hover .post-title { color: var(--indigo); }
        .post-item:hover .post-arrow { transform: translateX(6px); color: var(--indigo); }

        .post-date {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--cream-xs); letter-spacing: 0.08em;
          min-width: 96px; padding-top: 5px;
        }
        .post-body { flex: 1; }
        .post-title {
          font-family: 'Playfair Display', serif; font-size: 22px;
          font-weight: 700; color: var(--cream); letter-spacing: -0.02em;
          margin-bottom: 8px; line-height: 1.3; transition: color 0.2s;
        }
        .post-excerpt {
          font-size: 14px; font-weight: 300; color: var(--cream-dim);
          line-height: 1.7; margin-bottom: 14px;
        }
        .post-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .post-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
          color: #a5b4fc; border-radius: 3px; padding: 3px 8px;
        }
        .post-arrow {
          font-size: 18px; color: var(--cream-xs);
          transition: all 0.2s; padding-top: 4px;
        }

        .empty {
          font-family: 'DM Mono', monospace; font-size: 13px;
          color: var(--cream-xs); padding: 48px 0;
        }

        footer {
          border-top: 1px solid var(--border);
          padding: 24px 48px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--cream-xs); letter-spacing: 0.06em;
        }

        @media (max-width: 600px) {
          .nav { padding: 16px 20px; }
          .page { padding: 48px 20px 80px; }
          .post-item { flex-direction: column; gap: 8px; }
          .post-date { min-width: unset; }
          footer { padding: 20px; }
        }
      `}</style>

      <nav className="nav">
        <Link href="/" className="nav-logo">var<span>-</span>raphael</Link>
        <Link href="/" className="nav-back">← Back home</Link>
      </nav>

      <main className="page">
        <p className="eyebrow">Writing</p>
        <h1 className="page-title">The Blog</h1>
        <p className="page-sub">
          Thoughts on backend architecture, TypeScript, databases, and whatever I'm currently breaking.
        </p>

        <div className="post-list">
          {posts.length === 0 ? (
            <p className="empty">No posts yet — check back soon.</p>
          ) : (
            posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-item">
                <span className="post-date">{post.date}</span>
                <div className="post-body">
                  <div className="post-title">{post.title}</div>
                  <p className="post-excerpt">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map((t) => <span key={t} className="post-tag">{t}</span>)}
                    </div>
                  )}
                </div>
                <span className="post-arrow">→</span>
              </Link>
            ))
          )}
        </div>
      </main>

      <footer>© 2026 Raphael Samuel</footer>
    </>
  );
}

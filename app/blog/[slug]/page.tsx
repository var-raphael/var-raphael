import Link from 'next/link';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return { title: `${post.title} — Raphael Samuel` };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #0e0d0c;
          --cream:     #e8e0d0;
          --cream-dim: rgba(232,224,208,0.55);
          --cream-xs:  rgba(232,224,208,0.2);
          --indigo:    #6366f1;
          --border:    rgba(232,224,208,0.08);
          --border-md: rgba(232,224,208,0.14);
        }

        body {
          background: var(--bg); color: var(--cream);
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 48px; border-bottom: 1px solid var(--border);
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

        .article { max-width: 680px; margin: 0 auto; padding: 72px 40px 120px; }

        /* Header */
        .post-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .post-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
          color: #a5b4fc; border-radius: 3px; padding: 3px 8px;
        }
        .post-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px); font-weight: 800;
          color: var(--cream); letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 20px;
        }
        .post-meta {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.1em; color: var(--cream-xs);
          margin-bottom: 56px; padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
        }

        /* Prose */
        .prose { font-size: 16px; font-weight: 300; line-height: 1.85; color: var(--cream-dim); }
        .prose h2 {
          font-family: 'Playfair Display', serif; font-size: 26px;
          font-weight: 700; color: var(--cream); letter-spacing: -0.02em;
          margin: 48px 0 16px; line-height: 1.2;
        }
        .prose h3 {
          font-family: 'Outfit', sans-serif; font-size: 18px;
          font-weight: 600; color: var(--cream);
          margin: 36px 0 12px;
        }
        .prose p { margin-bottom: 24px; }
        .prose a { color: var(--indigo); text-decoration: underline; text-underline-offset: 3px; }
        .prose strong { color: var(--cream); font-weight: 600; }
        .prose em { font-style: italic; }
        .prose ul, .prose ol {
          margin: 0 0 24px 24px; display: flex; flex-direction: column; gap: 8px;
        }
        .prose li { color: var(--cream-dim); }
        .prose pre {
          background: #141310; border: 1px solid var(--border-md);
          border-radius: 10px; padding: 24px 28px; overflow-x: auto;
          margin: 0 0 28px; font-family: 'DM Mono', monospace;
          font-size: 13px; line-height: 1.7; color: #a5b4fc;
        }
        .prose code {
          font-family: 'DM Mono', monospace; font-size: 13px;
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
          color: #a5b4fc; border-radius: 4px; padding: 2px 7px;
        }
        .prose pre code {
          background: none; border: none; padding: 0; color: inherit;
        }
        .prose blockquote {
          border-left: 2px solid var(--indigo);
          margin: 0 0 24px; padding: 4px 0 4px 24px;
          color: var(--cream-dim); font-style: italic;
        }
        .prose hr {
          border: none; border-top: 1px solid var(--border);
          margin: 48px 0;
        }

        /* Footer */
        .post-footer {
          margin-top: 72px; padding-top: 40px;
          border-top: 1px solid var(--border);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
        }
        .back-link {
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.08em; color: var(--cream-dim);
          text-decoration: none; transition: color 0.2s;
        }
        .back-link:hover { color: var(--indigo); }

        footer {
          border-top: 1px solid var(--border); padding: 24px 48px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--cream-xs); letter-spacing: 0.06em;
        }

        @media (max-width: 600px) {
          .nav { padding: 16px 20px; }
          .article { padding: 48px 20px 80px; }
          footer { padding: 20px; }
        }
      `}</style>

      <nav className="nav">
        <Link href="/" className="nav-logo">var<span>-</span>raphael</Link>
        <Link href="/blog" className="nav-back">← All posts</Link>
      </nav>

      <article className="article">
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((t) => <span key={t} className="post-tag">{t}</span>)}
          </div>
        )}
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">{post.date}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <div className="post-footer">
          <Link href="/blog" className="back-link">← Back to all posts</Link>
          <Link href="/#contact" className="back-link">Get in touch →</Link>
        </div>
      </article>

      <footer>© 2026 Raphael Samuel</footer>
    </>
  );
}

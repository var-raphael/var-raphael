'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import type { PostMeta } from '@/lib/posts';
import {
  TECH_ICONS, STACK,
  PROJECTS, JEWELRY_COLLECTIONS,
} from './data';

function track(event: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).phantom?.track) {
    (window as any).phantom.track(event, props ?? {});
  }
}

function TechTag({ label }: { label: string }) {
  const icon = TECH_ICONS[label];
  const needsInvert = label === 'Next.js' || label === 'Three.js' || label === 'Framer Motion' || label === 'WebGL' || label === 'Ethereum' || label === 'HTMX';
  return (
    <span className="tech-tag">
      {icon && <img src={icon} alt={label} style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0, filter: needsInvert ? 'invert(1)' : undefined }} />}
      {label}
    </span>
  );
}

function CyclingImage({ images, alt, style }: { images: string[]; alt: string; style?: React.CSSProperties }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % images.length); setFading(false); }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      <img src={images[idx]} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease' }} />
    </div>
  );
}

function JewelryCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [displayed, setDisplayed] = useState(0);

  const go = (dir: 'prev' | 'next') => {
    if (animating) return;
    const next = dir === 'next' ? (current + 1) % JEWELRY_COLLECTIONS.length : (current - 1 + JEWELRY_COLLECTIONS.length) % JEWELRY_COLLECTIONS.length;
    setDirection(dir === 'next' ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => { setCurrent(next); setDisplayed(next); setAnimating(false); }, 280);
  };
  const goTo = (i: number) => {
    if (animating || i === current) return;
    setDirection(i > current ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setDisplayed(i); setAnimating(false); }, 280);
  };

  const item = JEWELRY_COLLECTIONS[displayed];
  const slideOut: React.CSSProperties = animating
    ? { transform: direction === 'right' ? 'translateX(-24px)' : 'translateX(24px)', opacity: 0, transition: 'transform 0.28s ease, opacity 0.24s ease' }
    : { transform: 'translateX(0)', opacity: 1, transition: 'transform 0.28s ease, opacity 0.24s ease' };

  return (
    <div className="carousel-grid">
      <div className="carousel-image-panel" style={slideOut}>
        <CyclingImage images={item.images} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div className="carousel-counter">
          <span>{String(current + 1).padStart(2, '0')}</span>
          <span style={{ opacity: 0.35 }}>/</span>
          <span style={{ opacity: 0.35 }}>{String(JEWELRY_COLLECTIONS.length).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="carousel-info-panel">
        <div style={slideOut}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {item.tags.map(t => <TechTag key={t} label={t} />)}
          </div>
          <h3 className="carousel-title">{item.name}</h3>
          <p className="carousel-desc">{item.desc}</p>
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <a href={item.live} target="_blank" rel="noreferrer" onClick={() => track('jewelry_view_site_clicked', { collection: item.name })} className="btn-gold-fill">View Site ↗</a>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['prev', 'next'] as const).map(dir => (
                <button key={dir} onClick={() => go(dir)} className="carousel-nav-btn" aria-label={dir}>{dir === 'prev' ? '←' : '→'}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {JEWELRY_COLLECTIONS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="carousel-dot" data-active={i === current} aria-label={`Go to ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

const NAV_LINKS: [string, string][] = [['#about', 'About'], ['#projects', 'Projects'], ['#frontend', 'Frontend'], ['#why', 'Why Me'], ['#blog', 'Blog']];

const WHY_ME = [
  { title: 'I ship, not just code', body: 'Quorel and VarsityLine are live, self-built startups, from schema to UI to the infrastructure keeping them running. These are not tutorial projects. They are products I designed, deployed, and maintain.' },
  { title: 'I think before I type', body: 'Years of working with limited resources taught me to design logic before writing a line. I map edge cases and question assumptions early, so things ship less buggy from the start.' },
  { title: 'I fix real problems', body: 'Running Quorel and VarsityLine means I am the one who gets paged when something breaks, whether it is a scraping layer, a payment webhook, or a data pipeline going stale. I own problems until they are fixed.' },
  { title: 'I learn at uncommon speed', body: 'I picked up TypeScript and Go in 2022 simultaneously while already knowing PHP and JavaScript, and was building real projects in both within weeks.' },
  { title: 'I work remotely by default', body: 'I have been self-directed for years with no classroom, no bootcamp, no one looking over my shoulder. Remote work is the environment I have always operated in.' },
  { title: 'I contribute beyond my role', body: 'I mentor students and teach free coding classes online. A team that hires me gets someone who adds energy to the room, not just code to the repo.' },
];

export default function Portfolio({ posts }: { posts: PostMeta[] }) {
  useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; color: #eee; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }

        .gold-text { color: #FFD700; }
        .eyebrow { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #FFD700; margin-bottom: 12px; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.2) 20%, rgba(255,215,0,0.2) 80%, transparent); margin: 0 40px; }
        .section-inner { max-width: 1160px; margin: 0 auto; padding: 0 48px; }

        .nav-link { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; letter-spacing: 0.04em; }
        .nav-link:hover { color: #FFD700; }

        /* Square-edge buttons, no rounding anywhere */
        .btn-gold-fill { display: inline-flex; align-items: center; background: #FFD700; color: #000; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; padding: 12px 24px; border-radius: 0; text-decoration: none; transition: all 0.15s; border: 1px solid #FFD700; cursor: pointer; }
        .btn-gold-fill:hover { background: #000; color: #FFD700; }
        .btn-gold-outline { display: inline-block; border: 1px solid #FFD700; color: #FFD700; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; padding: 11px 22px; border-radius: 0; text-decoration: none; transition: all 0.15s; background: transparent; }
        .btn-gold-outline:hover { background: #FFD700; color: #000; }

        .tech-tag { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 0; font-size: 10px; font-family: 'DM Mono', monospace; font-weight: 500; border: 1px solid rgba(255,215,0,0.35); background: rgba(255,215,0,0.05); color: #FFD700; line-height: 1.6; }

        .stat-line { font-family: 'DM Mono', monospace; font-size: 11px; color: #FFD700; letter-spacing: 0.02em; margin-bottom: 14px; line-height: 1.6; }

        /* Projects grid — 2 columns on desktop */
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .project-card { background: #0a0a0a; border: 1px solid rgba(255,215,0,0.15); border-radius: 0; overflow: hidden; display: flex; flex-direction: column; transition: all 0.2s ease; }
        .project-card:hover { border-color: rgba(255,215,0,0.5); }
        .project-card-media { height: 200px; background: #050505; flex-shrink: 0; }
        .project-card-body { padding: 26px 28px; display: flex; flex-direction: column; flex: 1; border-top: 1px solid rgba(255,215,0,0.1); }



        .ring-card { display: grid; grid-template-columns: 5fr 7fr; background: #0a0a0a; border: 1px solid rgba(255,215,0,0.15); border-radius: 0; overflow: hidden; }
        .ring-visual { position: relative; min-height: 300px; border-right: 1px solid rgba(255,215,0,0.15); background: #050505; overflow: hidden; }
        .ring-badge { position: absolute; top: 16px; left: 16px; font-family: 'DM Mono', monospace; font-size: 10px; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; border-radius: 0; padding: 4px 10px; letter-spacing: 0.1em; text-transform: uppercase; }

        .carousel-grid { display: grid; grid-template-columns: 1fr 1fr; background: #0a0a0a; border: 1px solid rgba(255,215,0,0.15); border-radius: 0; overflow: hidden; }
        .carousel-image-panel { position: relative; min-height: 260px; border-right: 1px solid rgba(255,215,0,0.15); background: #050505; overflow: hidden; }
        .carousel-info-panel { padding: 32px 36px; display: flex; flex-direction: column; justify-content: space-between; min-height: 240px; }
        .carousel-counter { position: absolute; bottom: 14px; left: 14px; display: flex; align-items: baseline; gap: 3px; background: rgba(0,0,0,0.75); border: 1px solid rgba(255,215,0,0.3); border-radius: 0; padding: 5px 11px; font-family: 'DM Mono', monospace; font-size: 11px; color: #FFD700; }
        .carousel-title { font-family: 'Playfair Display', serif; font-size: clamp(17px, 2vw, 22px); font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 9px; }
        .carousel-desc { font-size: 12.5px; font-weight: 300; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .carousel-nav-btn { width: 36px; height: 36px; border-radius: 0; border: 1px solid rgba(255,215,0,0.4); background: transparent; color: #FFD700; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .carousel-nav-btn:hover { background: #FFD700; color: #000; }
        .carousel-dot { height: 6px; width: 6px; border-radius: 0; border: none; padding: 0; cursor: pointer; background: rgba(255,255,255,0.2); transition: all 0.2s; }
        .carousel-dot[data-active="true"] { width: 22px; background: #FFD700; }

        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
        .why-card { background: #0a0a0a; border: 1px solid rgba(255,215,0,0.12); border-radius: 0; padding: 24px 26px; transition: all 0.15s; }
        .why-card:hover { border-color: rgba(255,215,0,0.4); }
        .why-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .why-body { font-size: 12.5px; font-weight: 300; color: rgba(255,255,255,0.45); line-height: 1.7; }

        .blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        .blog-row { display: block; background: #0a0a0a; border: 1px solid rgba(255,215,0,0.12); border-radius: 0; padding: 22px 24px; text-decoration: none; transition: all 0.15s; }
        .blog-row:hover { border-color: rgba(255,215,0,0.4); }
        .blog-row:hover .blog-title { color: #FFD700; }
        .blog-date { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.06em; }
        .blog-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.01em; margin: 6px 0 8px; line-height: 1.3; transition: color 0.2s; }
        .blog-excerpt { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.4); line-height: 1.6; }

        .hero-email { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.45); text-decoration: none; letter-spacing: 0.04em; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 1px; transition: color 0.2s; }
        .hero-email:hover { color: #FFD700; border-bottom-color: #FFD700; }

        .contact-row { display: flex; align-items: flex-start; gap: 56px; }
        .contact-links-row { display: flex; gap: 10px; flex-wrap: wrap; }

        /* Hero: left-aligned, photo + text side by side */
        .hero-grid { display: grid; grid-template-columns: 260px 1fr; gap: 56px; align-items: center; }
        .hero-photo { width: 100%; aspect-ratio: 1; border: 1px solid rgba(255,215,0,0.3); border-radius: 0; overflow: hidden; background: #0a0a0a; }

        .nav-desktop-links { display: flex; align-items: center; gap: 26px; }
        .nav-hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; background: transparent; border: none; cursor: pointer; padding: 4px; }
        .nav-hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.7); }
        .nav-mobile-menu { display: none; position: fixed; top: 57px; left: 0; right: 0; background: rgba(0,0,0,0.98); border-bottom: 1px solid rgba(255,215,0,0.15); padding: 20px 24px; flex-direction: column; gap: 4px; z-index: 99; }
        .nav-mobile-menu.open { display: flex; }
        .nav-mobile-link { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.6); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); letter-spacing: 0.04em; }
        .nav-mobile-link:last-child { border-bottom: none; }

        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr; }
          .ring-card { grid-template-columns: 1fr; }
          .ring-visual { border-right: none !important; border-bottom: 1px solid rgba(255,215,0,0.15) !important; }
          .carousel-grid { grid-template-columns: 1fr; }
          .carousel-image-panel { border-right: none; border-bottom: 1px solid rgba(255,215,0,0.15); }
          .carousel-info-panel { padding: 26px 22px; }
          .contact-row { flex-direction: column; gap: 28px; align-items: center; text-align: center; }
          .contact-links-row { justify-content: center; }
          .about-inner-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 28px !important; }
          .hero-photo { width: 160px; margin: 0 auto; }
          .section-inner { padding: 0 28px; }
          .nav-desktop-links { display: none; }
          .nav-hamburger { display: flex; }
          .btn-gold-fill { padding: 9px 14px; font-size: 10px; }
        }
        @media (max-width: 680px) {
          .section-inner { padding: 0 20px; }
          .divider { margin: 0 20px; }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2 }}>

        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 18px 48px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,215,0,0.12)' }}>
          <a href="#" onClick={() => track('nav_logo_clicked')} style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>var-raphael</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div className="nav-desktop-links">
              {NAV_LINKS.map(([href, label]) => (
                <a key={href} href={href} className="nav-link" onClick={() => track('nav_link_clicked', { label, device: 'desktop' })}>{label}</a>
              ))}
            </div>
            <a href="/cv.pdf" download onClick={() => track('cv_downloaded')} className="btn-gold-fill">
              <span className="cv-btn-label">Download CV</span>
            </a>
            <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </nav>

        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-mobile-link" onClick={() => { setMenuOpen(false); track('nav_link_clicked', { label, device: 'mobile' }); }}>{label}</a>
          ))}
        </div>

        {/* Hero — left-aligned, photo left / text right */}
        <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 24px 64px' }}>
          <div className="section-inner" style={{ width: '100%' }}>
            <div className="hero-grid">
              <div className="hero-photo">
                <img src="/portfolio-images/img/avatar.jpg" alt="Raphael Samuel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                  <span>Full-Stack Engineer</span>
                  <span style={{ display: 'block', width: 40, height: 1, background: '#FFD700' }} />
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(46px, 7vw, 84px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff', marginBottom: 8 }}>
                  Raphael <em style={{ fontStyle: 'italic', color: '#FFD700' }}>Samuel</em>
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em', marginTop: 18, marginBottom: 28, maxWidth: 520 }}>
                  Building products end to end. Two of my own, plus client work.
                </p>
                <div className="contact-links-row" style={{ marginBottom: 40 }}>
                  <a href="mailto:samuelraphael925@gmail.com" onClick={() => track('email_clicked', { source: 'hero' })} className="btn-gold-fill">samuelraphael925@gmail.com</a>
                  {[['https://www.linkedin.com/in/samuel-raphael-7679313a2', 'LinkedIn'], ['https://x.com/PhantomDev001', 'X']].map(([href, label]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" onClick={() => track('social_clicked', { platform: label })} className="btn-gold-outline">{label}</a>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
                  {[{ val: '6', unit: '+', label: 'Years Coding' }, { val: '3', unit: '', label: 'Live Products' }, { val: '2', unit: '', label: 'Startups Founded' }].map(({ val, unit, label }) => (
                    <div key={label}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {val}<span className="gold-text">{unit}</span>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginTop: 7, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* About */}
        <section id="about" style={{ padding: '80px 0' }}>
          <div className="section-inner">
            <div className="about-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow">About</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }}>
                  A quick intro.
                </h2>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: 16 }}>
                  Six years of writing Python, Go, TypeScript, and Next.js, most of it spent on two questions: does this hold up once real people depend on it, and who fixes it at 2am when it doesn't. Quorel and VarsityLine are both still answering yes.
                </p>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: 32 }}>
                  I built both of those solo, schema to UI to the infrastructure keeping them online. The rest of what's here is client work and side projects.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Primary Stack', pills: ['Python', 'Go', 'TypeScript', 'Next.js'] },
                  { label: 'Databases', pills: ['PostgreSQL', 'MySQL'] },
                  { label: 'Currently', pills: ['Open to remote roles worldwide'] },
                  { label: 'Location', pills: ['Nigeria', 'UTC+1'] },
                  { label: 'Response time', pills: ['Within 24 hours'] },
                ].map(({ label, pills }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 16 }}>
                    <div style={{ minWidth: 140, flexShrink: 0 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {pills.map(p => (
                        <span key={p} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '3px 10px' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Projects — 2-column grid */}
        <section id="projects" style={{ padding: '80px 0' }}>
          <div className="section-inner">
            <p className="eyebrow">Selected Work</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 28, lineHeight: 1.1 }}>Projects</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {STACK.map(s => <TechTag key={s} label={s} />)}
            </div>

            <div className="projects-grid">
              {PROJECTS.map(p => (
                <div key={p.title} className="project-card">
                  <div className="project-card-media">
                    {p.images.length > 0 ? (
                      <CyclingImage images={p.images} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,215,0,0.25)', letterSpacing: '0.1em' }}>[ infra project ]</span>
                      </div>
                    )}
                  </div>
                  <div className="project-card-body">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {p.tags.map(t => <TechTag key={t} label={t} />)}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>{p.title}</h3>
                    <div className="stat-line">{p.stat}</div>
                    <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 22, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {p.live && p.live !== '#' && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="btn-gold-fill" onClick={() => track('project_link_clicked', { project: p.title, type: 'live' })}>View Site ↗</a>
                      )}
                      {(p as any).secondaryLive && (
                        <a href={(p as any).secondaryLive} target="_blank" rel="noreferrer" className="btn-gold-outline" onClick={() => track('project_link_clicked', { project: p.title, type: 'secondary_live' })}>{(p as any).secondaryLiveLabel || 'View More ↗'}</a>
                      )}
                      {!p.closedSource && p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn-gold-outline" onClick={() => track('project_link_clicked', { project: p.title, type: 'github' })}>GitHub</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 420 }}>
                More experimentation and older work on my GitHub if you want to dig deeper.
              </p>
              <a href="https://github.com/var-raphael" target="_blank" rel="noreferrer" onClick={() => track('github_more_projects_clicked')} className="btn-gold-outline">See more on GitHub ↗</a>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Frontend / UI */}
        <section id="frontend" style={{ padding: '80px 0' }}>
          <div className="section-inner">
            <p className="eyebrow">Frontend & UI</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 44, lineHeight: 1.1 }}>Design Work</h2>

            <div className="ring-card" style={{ marginBottom: 56 }}>
              <div className="ring-visual">
                <CyclingImage images={['/portfolio-images/img/ring-view1.jpg', '/portfolio-images/img/ring-view2.jpg']} alt="Interactive 3D Ring Viewer" style={{ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover', display: 'block' }} />
                <span className="ring-badge">3D Interactive</span>
              </div>
              <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p className="eyebrow" style={{ marginBottom: 12 }}>Featured: 3D Viewer</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(19px, 2.2vw, 25px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.2 }}>Interactive 3D Ring Viewer</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 22 }}>A real-time 3D ring viewer for jewelry e-commerce. Customers rotate, zoom and inspect rings from every angle before buying, reducing returns and building confidence.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {['360° rotation with mouse and touch', 'Real-time zoom and pan controls', 'Multiple material & finish previews', 'Embeddable in any store page'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                      <div style={{ width: 5, height: 5, background: '#FFD700', flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 26 }}>
                  {['Next.js', 'Three.js', 'TypeScript', 'Tailwind', 'WebGL'].map(t => <TechTag key={t} label={t} />)}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href="https://ring-view.vercel.app/" onClick={() => track('ring_demo_clicked')} className="btn-gold-fill">View Demo ↗</a>
                  <a href="https://github.com/var-raphael/atelier" target="_blank" rel="noreferrer" onClick={() => track('ring_github_clicked')} className="btn-gold-outline">GitHub</a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 8 }}>Landing Pages</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(19px, 2.6vw, 27px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Jewelry Store Collections</h3>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{JEWELRY_COLLECTIONS.length} premium landing pages</span>
            </div>
            <JewelryCarousel />
          </div>
        </section>

        <div className="divider" />

        {/* Why Me — back at the bottom, grid of cards */}
        <section id="why" style={{ padding: '80px 0' }}>
          <div className="section-inner">
            <p className="eyebrow">Why Work With Me</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 36, lineHeight: 1.1 }}>Not just another developer.</h2>
            <div className="why-grid">
              {WHY_ME.map(({ title, body }) => (
                <div key={title} className="why-card">
                  <div className="why-title">{title}</div>
                  <div className="why-body">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Blog — bottom, grid */}
        <section id="blog" style={{ padding: '80px 0' }}>
          <div className="section-inner">
            <p className="eyebrow">Recent Writing</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 28, lineHeight: 1.1 }}>From the Blog</h2>
            <div className="blog-grid">
              {posts.slice(0, 4).map(post => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="blog-row" onClick={() => track('blog_post_clicked', { slug: post.slug, title: post.title })}>
                  <span className="blog-date">{post.date}</span>
                  <div className="blog-title">{post.title}</div>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </a>
              ))}
            </div>
            <a href="/blog" onClick={() => track('blog_all_posts_clicked')} style={{ display: 'inline-block', marginTop: 28, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#FFD700', textDecoration: 'none', borderBottom: '1px solid rgba(255,215,0,0.4)', paddingBottom: 2 }}>All posts ({posts.length}) →</a>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid rgba(255,215,0,0.12)', padding: '26px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>© 2026 Raphael Samuel / var-raphael</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>Built with Next.js + TypeScript</p>
        </footer>

      </div>
    </>
  );
}

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Lenis from 'lenis';
import type { PostMeta } from '@/lib/posts';

// ── Devicon icon map ──────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, string> = {
  'Next.js':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'PHP':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Go':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MySQL':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Docker':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Node.js':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'CSS3':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'HTML5':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'Git':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Linux':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'Three.js':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'Tailwind':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'npm':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
  'CLI':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  'GSAP':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'WebGL':       'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webgl.svg',
  'Framer Motion': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg',
};

// ── TechTag ───────────────────────────────────────────────────────────────────
function TechTag({ label, gold = false }: { label: string; gold?: boolean }) {
  const icon = TECH_ICONS[label];
  const needsInvert = label === 'Next.js' || label === 'Three.js' || label === 'Framer Motion' || label === 'WebGL';

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '3px 10px',
    borderRadius: 5,
    fontSize: 10,
    fontFamily: "'DM Mono', monospace",
    fontWeight: 500,
    border: '1px solid',
    transition: 'all 0.2s',
    lineHeight: 1.6,
    ...(gold
      ? { background: 'rgba(234,179,8,0.08)', borderColor: 'rgba(234,179,8,0.22)', color: 'rgba(234,179,8,0.75)' }
      : { background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.22)', color: 'rgba(165,180,252,0.85)' }),
  };

  return (
    <span style={style}>
      {icon && (
        <img
          src={icon}
          alt={label}
          style={{
            width: 13,
            height: 13,
            objectFit: 'contain',
            flexShrink: 0,
            filter: needsInvert ? 'invert(1)' : undefined,
          }}
        />
      )}
      {label}
    </span>
  );
}

// ── Falling canvas ────────────────────────────────────────────────────────────
const ICON_SRCS = Object.values(TECH_ICONS).slice(0, 14);
const TEXT_SYMBOLS = ['</>', '{}', '=>', 'fn()', '[]', '&&', '||', '??', 'async', 'await', 'const', 'type', 'SELECT', 'JOIN', 'POST', 'GET', 'npm', 'git', '::'];
const TEXT_COLORS = ['rgba(99,102,241,0.7)','rgba(247,223,30,0.6)','rgba(139,92,246,0.6)','rgba(52,211,153,0.55)','rgba(96,165,250,0.55)','rgba(249,115,22,0.55)','rgba(232,224,208,0.25)'];

type Particle =
  | { kind: 'icon'; x: number; y: number; speed: number; img: HTMLImageElement; size: number; opacity: number; rotation: number; rotationSpeed: number; wobble: number; wobbleSpeed: number; wobbleOffset: number }
  | { kind: 'text'; x: number; y: number; speed: number; symbol: string; color: string; size: number; opacity: number; rotation: number; rotationSpeed: number; wobble: number; wobbleSpeed: number; wobbleOffset: number };

function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const baseProps = (w: number, h: number, fromTop: boolean) => ({
    x: Math.random() * w, y: fromTop ? -50 : Math.random() * h,
    speed: 0.3 + Math.random() * 0.7, opacity: 0.2 + Math.random() * 0.35,
    rotation: Math.random() * Math.PI * 2, rotationSpeed: (Math.random() - 0.5) * 0.01,
    wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.006 + Math.random() * 0.012,
    wobbleOffset: 16 + Math.random() * 24,
  });

  const createParticle = useCallback((w: number, h: number, fromTop = false): Particle => {
    const useIcon = imagesRef.current.length > 0 && Math.random() < 0.55;
    if (useIcon) {
      const imgs = imagesRef.current;
      return { kind: 'icon', ...baseProps(w, h, fromTop), img: imgs[Math.floor(Math.random() * imgs.length)], size: 24 + Math.floor(Math.random() * 18) };
    }
    return { kind: 'text', ...baseProps(w, h, fromTop), symbol: TEXT_SYMBOLS[Math.floor(Math.random() * TEXT_SYMBOLS.length)], color: TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)], size: 11 + Math.floor(Math.random() * 13) };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const COUNT = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    particlesRef.current = Array.from({ length: COUNT }, () => createParticle(canvas.width, canvas.height));
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    ICON_SRCS.forEach(src => {
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = img.onerror = () => {
        loaded++;
        if (img.complete && img.naturalWidth > 0) images.push(img);
        if (loaded === ICON_SRCS.length) {
          imagesRef.current = images;
          particlesRef.current = particlesRef.current.map(p => Math.random() < 0.55 ? createParticle(canvas.width, canvas.height) : p);
        }
      };
      img.src = src;
    });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p, i) => {
        p.y += p.speed; p.wobble += p.wobbleSpeed; p.rotation += p.rotationSpeed;
        const xPos = p.x + Math.sin(p.wobble) * p.wobbleOffset;
        ctx.save(); ctx.translate(xPos, p.y); ctx.rotate(p.rotation); ctx.globalAlpha = p.opacity;
        if (p.kind === 'icon') { if (p.img.complete && p.img.naturalWidth > 0) ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size); }
        else { ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 5; ctx.font = `600 ${p.size}px 'DM Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.symbol, 0, 0); }
        ctx.restore();
        if (p.y > canvas.height + 60) particlesRef.current[i] = createParticle(canvas.width, canvas.height, true);
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, [createParticle]);

  return canvasRef;
}

// ── Phantomit Terminal ────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0,    text: '$ phantomit watch --on-save', type: 'cmd' },
  { delay: 700,  text: 'watching: src/', type: 'dim' },
  { delay: 1400, text: '[11:42 PM] ✎ src/auth.ts, ✚ src/middleware.ts', type: 'dim' },
  { delay: 2400, text: 'generating commit message...', type: 'thinking' },
  { delay: 3800, text: '✦ Commit message:', type: 'label' },
  { delay: 4200, text: '"feat(auth): add JWT validation middleware"', type: 'message' },
  { delay: 4900, text: '[Y] commit & push   [E] edit   [N] skip', type: 'dim' },
  { delay: 5500, text: '→ y', type: 'cmd' },
  { delay: 6000, text: '✔ committed & pushed to origin/main', type: 'success' },
];

function PhantomitTerminal() {
  const [visible, setVisible] = useState<number[]>([]);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setVisible([]);
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => { setVisible(prev => [...prev, i]); if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, line.delay);
      timers.push(t);
    });
    timers.push(setTimeout(() => setTick(t => t + 1), 9200));
    return () => timers.forEach(clearTimeout);
  }, [tick]);

  const lineColor = (type: string) => {
    if (type === 'success') return '#4ade80';
    if (type === 'message' || type === 'thinking') return '#a78bfa';
    if (type === 'label') return 'rgba(232,224,208,0.65)';
    if (type === 'dim') return 'rgba(232,224,208,0.3)';
    return '#e8e0d0';
  };

  return (
    <div style={{ background: '#0a0908', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
      <div style={{ background: '#141210', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.15)', fontSize: 10, letterSpacing: '0.06em' }}>phantomit-cli</span>
      </div>
      <div ref={ref} style={{ padding: '14px 18px', minHeight: 165, maxHeight: 205, overflowY: 'auto' }}>
        {TERMINAL_LINES.map((line, i) => visible.includes(i) && (
          <div key={i} style={{ marginBottom: 5, color: lineColor(line.type), lineHeight: 1.65 }}>
            {line.type === 'thinking'
              ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>{line.text}</span>
                  {[0,1,2].map(d => <span key={d} style={{ width: 3, height: 3, borderRadius: '50%', background: '#a78bfa', display: 'inline-block', opacity: 0.5, animation: `pulse 1s ${d*0.2}s ease-in-out infinite` }} />)}
                </span>
              : line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'phantomit',
    desc: 'CLI tool that watches your code, diffs changes, and generates professional git commit messages via Groq AI. Live on npm.',
    visual: 'terminal' as const,
    gif: '',
    live: 'https://phantomit-docs.vercel.app',
    github: 'https://github.com/var-raphael/phantomit',
    closedSource: false,
    tags: ['Node.js', 'TypeScript', 'CLI', 'npm'],
  },
  {
    title: 'PhantomTrack',
    desc: 'Privacy-first web analytics SaaS. No cookies, no signup. One script tag — instant insights. AI weekly review, 7 export formats. 10+ active users.',
    visual: 'gif' as const,
    gif: '/images/phantomtrack.gif',
    live: 'https://phantomtrack-docs.vercel.app',
    github: '',
    closedSource: true,
    tags: ['PHP', 'MySQL'],
  },
  {
    title: 'ClassFlow',
    desc: 'Assignment management platform for teachers and students. Real-time grading, file uploads, comment threads, and visual dashboards.',
    visual: 'gif' as const,
    gif: '/images/classflow.gif',
    live: 'https://myclassflow.vercel.app',
    github: 'https://github.com/var-raphael',
    closedSource: false,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Go Rate Limiter',
    desc: 'High-performance rate limiting library in Go. Handles 10k+ req/s. DDoS tested. Token bucket and sliding window algorithms.',
    visual: 'gif' as const,
    gif: '',
    live: '#',
    github: 'https://github.com/var-raphael',
    closedSource: false,
    tags: ['Go'],
  },
];

const JEWELRY_COLLECTIONS = [
  { name: 'Lumière Collection', desc: 'Premium jewelry store landing page with animated hero, elegant product showcase, and luxury checkout flow.', gif: '/images/jewelry-1.gif', live: '#', tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { name: 'Aurum Store', desc: 'Gold-themed e-commerce landing with parallax scrolling, animated product cards, and newsletter integration.', gif: '/images/jewelry-2.gif', live: '#', tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { name: 'Velvet & Stone', desc: 'Dark luxury jewelry brand page with dramatic typography, product spotlights, and seamless contact form.', gif: '/images/jewelry-3.gif', live: '#', tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { name: 'Celestine Atelier', desc: 'High-end bespoke jewelry boutique page with editorial layout, lookbook-style gallery, and appointment booking flow.', gif: '/images/jewelry-4.gif', live: '#', tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
];

const STACK = ['Next.js', 'TypeScript', 'PHP', 'PostgreSQL', 'MySQL', 'Go', 'Node.js', 'Git'];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

// ── Jewelry Carousel ──────────────────────────────────────────────────────────
function JewelryCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [displayed, setDisplayed] = useState(0); // what's actually rendered

  const go = (dir: 'prev' | 'next') => {
    if (animating) return;
    const next = dir === 'next'
      ? (current + 1) % JEWELRY_COLLECTIONS.length
      : (current - 1 + JEWELRY_COLLECTIONS.length) % JEWELRY_COLLECTIONS.length;
    setDirection(dir === 'next' ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setDisplayed(next);
      setAnimating(false);
    }, 320);
  };

  const goTo = (i: number) => {
    if (animating || i === current) return;
    setDirection(i > current ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(i);
      setDisplayed(i);
      setAnimating(false);
    }, 320);
  };

  const item = JEWELRY_COLLECTIONS[displayed];

  const slideOut: React.CSSProperties = animating ? {
    transform: direction === 'right' ? 'translateX(-32px)' : 'translateX(32px)',
    opacity: 0,
    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
  } : {
    transform: 'translateX(0)',
    opacity: 1,
    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
  };

  return (
    <div className="carousel-grid">
      {/* Image panel */}
      <div className="carousel-image-panel" style={slideOut}>
        {item.gif
          ? <img src={item.gif} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em' }}>[ gif coming soon ]</span>
            </div>
        }
        <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'baseline', gap: 3, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>{String(current + 1).padStart(2, '0')}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: '0 2px' }}>/</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{String(JEWELRY_COLLECTIONS.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Info panel */}
      <div className="carousel-info-panel">
        <div style={slideOut}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {item.tags.map(t => <TechTag key={t} label={t} />)}
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 10 }}>{item.name}</h3>
          <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(232,224,208,0.4)', lineHeight: 1.75 }}>{item.desc}</p>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <a href={item.live} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', background: '#6366f1', color: '#fff', fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', letterSpacing: '0.06em', boxShadow: '0 0 20px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
              View Site ↗
            </a>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['prev', 'next'] as const).map(dir => (
                <button key={dir} onClick={() => go(dir)} style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {dir === 'prev' ? '←' : '→'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {JEWELRY_COLLECTIONS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ height: 6, width: i === current ? 24 : 6, borderRadius: 9999, border: 'none', padding: 0, cursor: 'pointer', background: i === current ? '#6366f1' : 'rgba(255,255,255,0.18)', transition: 'all 0.25s' }} aria-label={`Go to ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Portfolio({ posts }: { posts: PostMeta[] }) {
  const canvasRef = useCanvas();
  useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0d0c; color: #e8e0d0; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }

        /* ── Nav ── */
        .nav-link { font-size: 13px; font-weight: 500; color: rgba(232,224,208,0.45); text-decoration: none; transition: color 0.2s; letter-spacing: 0.04em; }
        .nav-link:hover { color: rgba(232,224,208,0.9); }
        .btn-cv { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; color: rgba(232,224,208,0.75); background: transparent; border: 1px solid rgba(232,224,208,0.14); padding: 8px 16px; border-radius: 7px; text-decoration: none; transition: all 0.2s; }
        .btn-cv:hover { border-color: #6366f1; color: #a5b4fc; box-shadow: 0 0 14px rgba(99,102,241,0.3); }

        /* ── Buttons ── */
        .btn-primary { background: #6366f1; color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; padding: 13px 30px; border-radius: 10px; text-decoration: none; box-shadow: 0 0 32px rgba(99,102,241,0.35); transition: all 0.2s; display: inline-block; }
        .btn-primary:hover { background: #5254cc; box-shadow: 0 0 48px rgba(99,102,241,0.55); transform: translateY(-1px); }
        .btn-ghost { border: 1px solid rgba(232,224,208,0.14); color: rgba(232,224,208,0.5); font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; padding: 13px 30px; border-radius: 10px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-ghost:hover { border-color: rgba(232,224,208,0.3); color: rgba(232,224,208,0.9); }
        .btn-live { display: inline-block; background: #6366f1; color: #fff; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; padding: 9px 16px; border-radius: 7px; text-decoration: none; transition: all 0.2s; box-shadow: 0 0 18px rgba(99,102,241,0.28); }
        .btn-live:hover { box-shadow: 0 0 30px rgba(99,102,241,0.5); }
        .btn-gh { display: inline-block; border: 1px solid rgba(255,255,255,0.12); color: rgba(232,224,208,0.4); font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; padding: 9px 16px; border-radius: 7px; text-decoration: none; transition: all 0.2s; }
        .btn-gh:hover { border-color: rgba(255,255,255,0.28); color: rgba(232,224,208,0.85); }

        /* ── Layout ── */
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 0 40px; }

        /* ── Project cards — 2-col desktop grid ── */
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .project-card { background: #141310; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s; }
        .project-card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-3px); box-shadow: 0 24px 64px rgba(0,0,0,0.55); }

        /* ── Ring card — asymmetric 2-col ── */
        .ring-card { display: grid; grid-template-columns: 5fr 7fr; background: #141310; border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; overflow: hidden; transition: all 0.3s; }
        .ring-card:hover { border-color: rgba(234,179,8,0.2); box-shadow: 0 0 80px rgba(201,168,76,0.08); }

        /* ── Carousel ── */
        .carousel-grid { display: grid; grid-template-columns: 1fr 1fr; background: #141310; border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; overflow: hidden; isolation: isolate; }
        .carousel-image-panel { position: relative; min-height: 280px; border-right: 1px solid rgba(255,255,255,0.07); background: #0e0d0c; overflow: hidden; will-change: transform; }
        .carousel-info-panel { padding: 36px 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 260px; }

        /* ── Hero email ── */
        .hero-email { font-family: "DM Mono", monospace; font-size: 11px; color: rgba(232,224,208,0.35); text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s; border-bottom: 1px solid rgba(232,224,208,0.12); padding-bottom: 1px; }
        .hero-email:hover { color: rgba(165,180,252,0.85); border-bottom-color: rgba(165,180,252,0.35); }

        /* ── Blog ── */
        .blog-row { display: flex; align-items: flex-start; gap: 32px; padding: 32px 0; border-bottom: 1px solid rgba(255,255,255,0.06); text-decoration: none; transition: all 0.2s; }
        .blog-row:hover .blog-title { color: #a5b4fc; }
        .blog-row:hover .blog-arrow { transform: translateX(5px); color: #a5b4fc; }
        .blog-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: rgba(232,224,208,0.85); letter-spacing: -0.02em; margin-bottom: 7px; line-height: 1.3; transition: color 0.2s; }
        .blog-arrow { font-size: 18px; color: rgba(232,224,208,0.2); transition: all 0.2s; flex-shrink: 0; padding-top: 2px; }

        /* ── Contact ── */
        .contact-row { display: flex; align-items: flex-start; gap: 64px; }
        .contact-links-row { display: flex; gap: 12px; flex-wrap: wrap; }

        /* ── Mobile nav ── */
        .nav-desktop-links { display: flex; align-items: center; gap: 28px; }
        .nav-hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; background: transparent; border: none; cursor: pointer; padding: 4px; }
        .nav-hamburger span { display: block; width: 22px; height: 2px; background: rgba(232,224,208,0.6); border-radius: 2px; transition: all 0.2s; }
        .nav-mobile-menu { display: none; position: fixed; top: 57px; left: 0; right: 0; background: rgba(14,13,12,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 20px 24px; flex-direction: column; gap: 4px; z-index: 99; }
        .nav-mobile-menu.open { display: flex; }
        .nav-mobile-link { font-size: 15px; font-weight: 500; color: rgba(232,224,208,0.5); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); letter-spacing: 0.04em; transition: color 0.2s; }
        .nav-mobile-link:last-child { border-bottom: none; }
        .nav-mobile-link:hover { color: rgba(232,224,208,0.9); }
        .nav-mobile-cv { display: inline-block; margin-top: 8px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: rgba(232,224,208,0.75); background: transparent; border: 1px solid rgba(232,224,208,0.14); padding: 10px 18px; border-radius: 7px; text-decoration: none; transition: all 0.2s; text-align: center; }
        .nav-mobile-cv:hover { border-color: #6366f1; color: #a5b4fc; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr; }
          .ring-card { grid-template-columns: 1fr; }
          .ring-visual { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .carousel-grid { grid-template-columns: 1fr; }
          .carousel-image-panel { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .carousel-info-panel { padding: 28px 24px; }
          .contact-row { flex-direction: column; gap: 32px; align-items: center; text-align: center; }
          .contact-links-row { justify-content: center; }
          .section-inner { padding: 0 28px; }
          .nav-desktop-links { display: none; }
          .nav-hamburger { display: flex; }
        }

        @media (max-width: 680px) {
          .section-inner { padding: 0 20px; }
          .divider { margin: 0 20px; }
          .blog-row { flex-direction: column; gap: 6px; }
          .blog-date { min-width: unset !important; }
        }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, width: '100vw', height: '100vh' }} />

      {/* Glow orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: 400, height: 350, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '5%', width: 350, height: 350, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(ellipse, rgba(52,211,153,0.05) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Nav ── */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 18px 48px', background: 'rgba(14,13,12,0.75)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: '0.12em', color: 'rgba(232,224,208,0.5)', textDecoration: 'none' }}>
            rs<span style={{ color: '#6366f1' }}>.</span>dev
          </a>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {[['#projects','Projects'],['#frontend','Frontend'],['#blog','Blog'],['#contact','Contact']].map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
            <a href="/cv.pdf" download className="btn-cv">Download CV</a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {[['#projects','Projects'],['#frontend','Frontend'],['#blog','Blog'],['#contact','Contact']].map(([href, label]) => (
            <a key={href} href={href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href="/cv.pdf" download className="nav-mobile-cv" onClick={() => setMenuOpen(false)}>Download CV</a>
        </div>

        {/* ── Hero ── */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', color: '#6366f1', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: '#6366f1', opacity: 0.5 }} />
            <span>Fullstack Developer</span>
            <span style={{ display: 'block', width: 40, height: 1, background: '#6366f1', opacity: 0.5 }} />
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(58px, 10vw, 112px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', color: '#e8e0d0', marginBottom: 8 }}>
            Raphael<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Samuel</em>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 300, color: 'rgba(232,224,208,0.45)', letterSpacing: '0.02em', marginTop: 20, marginBottom: 40, maxWidth: 500 }}>
            6 years of code.{' '}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', color: '#a5b4fc', borderRadius: 4, padding: '3px 10px', margin: '0 4px' }}>18 yrs old</span>
            {' '}Building backends that scale, frontends that ship.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="/cv.pdf" download className="btn-ghost">Download CV</a>
          </div>

          {/* Availability + quick contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(74,222,128,0.85)', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 99, padding: '5px 12px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
              Available for work
            </span>
            <a href="mailto:samuelraphael925@gmail.com" className="hero-email">
              samuelraphael925@gmail.com
            </a>
          </div>

          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ val: '6', unit: '+', label: 'Years Coding' }, { val: '4', unit: '+', label: 'Live Projects' }, { val: '10', unit: '+', label: 'Active Users' }].map(({ val, unit, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: '#e8e0d0', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {val}<span style={{ color: '#6366f1' }}>{unit}</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 400, color: 'rgba(232,224,208,0.32)', marginTop: 7, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Projects ── */}
        <section id="projects" style={{ padding: '96px 0' }}>
          <div className="section-inner">
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>Selected Work</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 32, lineHeight: 1.1 }}>Projects</h2>

            {/* Stack tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 52 }}>
              {STACK.map(s => <TechTag key={s} label={s} />)}
            </div>

            <div className="projects-grid">
              {PROJECTS.map(p => (
                <div key={p.title} className="project-card">
                  {p.visual === 'terminal' ? (
                    <div style={{ padding: 16, background: '#1a1815', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <PhantomitTerminal />
                    </div>
                  ) : p.gif ? (
                    <img src={p.gif} alt={p.title} style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
                  ) : (
                    <div style={{ width: '100%', height: 210, background: 'linear-gradient(135deg, #1a1815, #0e0d0c)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em' }}>[ gif coming soon ]</span>
                    </div>
                  )}
                  <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {p.tags.map(t => <TechTag key={t} label={t} />)}
                      {p.title === 'phantomit' && (
                        <a href="https://www.npmjs.com/package/phantomit-cli" target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 5, fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 500, border: '1px solid rgba(248,113,113,0.25)', background: 'rgba(248,113,113,0.08)', color: 'rgba(248,113,113,0.75)', textDecoration: 'none', transition: 'all 0.2s' }}>
                          <img src={TECH_ICONS['npm']} style={{ width: 13, height: 13 }} alt="npm" />
                          npm ↗
                        </a>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(232,224,208,0.4)', lineHeight: 1.75, marginBottom: 22, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href={p.live === '#' ? p.github : p.live} target="_blank" rel="noreferrer" className="btn-live">
                        {p.title === 'phantomit' ? 'Docs ↗' : p.live === '#' ? 'GitHub ↗' : 'View Site ↗'}
                      </a>
                      {!p.closedSource && p.github && p.live !== '#' && <a href={p.github} target="_blank" rel="noreferrer" className="btn-gh">GitHub</a>}
                      {p.closedSource && <span style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", fontSize: 11, padding: '9px 16px', borderRadius: 7, cursor: 'default' }}>Closed Source</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── Frontend ── */}
        <section id="frontend" style={{ padding: '96px 0' }}>
          <div className="section-inner">
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>Frontend & UI</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 56, lineHeight: 1.1 }}>Design Work</h2>

            {/* Ring Viewer */}
            <div className="ring-card" style={{ marginBottom: 64 }}>
              <div className="ring-visual" style={{ position: 'relative', minHeight: 320, borderRight: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(135deg, #141008, #0a0806)', overflow: 'hidden' }}>
                {/* swap with <img src="/images/ring-viewer.gif" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
                <div style={{ width: '100%', height: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <span style={{ fontSize: 52, opacity: 0.4 }}>💍</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(234,179,8,0.25)', letterSpacing: '0.12em' }}>[ replace with gif ]</span>
                </div>
                <span style={{ position: 'absolute', top: 16, left: 16, fontFamily: "'DM Mono', monospace", fontSize: 10, background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', color: 'rgba(234,179,8,0.65)', borderRadius: 4, padding: '4px 10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>3D Interactive</span>
              </div>
              <div style={{ padding: '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(234,179,8,0.55)', marginBottom: 14 }}>Featured — 3D Viewer</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}>Interactive 3D Ring Viewer</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(232,224,208,0.4)', lineHeight: 1.8, marginBottom: 24 }}>
                  A real-time 3D ring viewer for jewelry e-commerce. Customers rotate, zoom and inspect rings from every angle before buying — reducing returns and building confidence.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
                  {['360° rotation with mouse and touch', 'Real-time zoom and pan controls', 'Multiple material & finish previews', 'Embeddable in any store page'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(232,224,208,0.38)', fontWeight: 300 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(234,179,8,0.6)', flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {['Next.js', 'Three.js', 'TypeScript', 'Tailwind'].map(t => <TechTag key={t} label={t} gold />)}
                  <TechTag label='WebGL' gold />
                </div>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', background: '#ca8a04', color: '#0a0806', fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', padding: '11px 22px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 0 24px rgba(201,168,76,0.2)', transition: 'all 0.2s', alignSelf: 'flex-start' }}>
                  View Demo ↗
                </a>
              </div>
            </div>

            {/* Jewelry Carousel */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 8 }}>Landing Pages</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em' }}>Jewelry Store Collections</h3>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(232,224,208,0.2)' }}>{JEWELRY_COLLECTIONS.length} premium landing pages</span>
            </div>
            <JewelryCarousel />
          </div>
        </section>

        <div className="divider" />

        {/* ── Blog ── */}
        <section id="blog" style={{ padding: '96px 0' }}>
          <div className="section-inner">
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>Recent Writing</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.1 }}>From the Blog</h2>
            <div>
              {posts.slice(0, 2).map(post => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="blog-row">
                  <span className="blog-date" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(232,224,208,0.22)', letterSpacing: '0.08em', minWidth: 96, paddingTop: 3, flexShrink: 0 }}>{post.date}</span>
                  <div style={{ flex: 1 }}>
                    <div className="blog-title">{post.title}</div>
                    <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(232,224,208,0.38)', lineHeight: 1.7 }}>{post.excerpt}</p>
                  </div>
                  <span className="blog-arrow">→</span>
                </a>
              ))}
            </div>
            <a href="/blog" style={{ display: 'inline-block', marginTop: 32, fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: '#6366f1', textDecoration: 'none', borderBottom: '1px solid rgba(99,102,241,0.35)', paddingBottom: 2, transition: 'all 0.2s' }}>
              All posts →
            </a>
          </div>
        </section>

        <div className="divider" />

        {/* ── Contact ── */}
        <section id="contact" style={{ padding: '96px 0' }}>
          <div className="section-inner">
            <div className="contact-row">
              <div style={{ width: 210, height: 210, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0, boxShadow: '0 0 60px rgba(99,102,241,0.12)', background: '#1a1815' }}>
                <img src="/images/avatar.png" alt="Raphael Samuel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 14 }}>Get in Touch</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'rgba(232,224,208,0.9)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
                  Let's build something worth shipping.
                </h2>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(232,224,208,0.4)', lineHeight: 1.85, marginBottom: 32, maxWidth: 420 }}>
                  Open to remote roles, freelance contracts, and interesting problems. If you have one, let's talk.
                </p>
                <div className="contact-links-row">
                  <a href="mailto:samuelraphael925@gmail.com" style={{ display: 'inline-block', background: '#6366f1', color: '#fff', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.06em', padding: '12px 22px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 0 28px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
                    samuelraphael925@gmail.com
                  </a>
                  {[['https://github.com/var-raphael','GitHub'],['https://linkedin.com/in/your-link-here','LinkedIn']].map(([href, label]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(232,224,208,0.45)', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.06em', padding: '12px 22px', borderRadius: 10, textDecoration: 'none', transition: 'all 0.2s' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '26px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(232,224,208,0.2)', letterSpacing: '0.06em' }}>© 2026 Raphael Samuel — rs.dev</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(232,224,208,0.2)', letterSpacing: '0.06em' }}>Built with Next.js + TypeScript</p>
        </footer>

      </div>
    </>
  );
}

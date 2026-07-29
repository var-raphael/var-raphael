// ── Devicon icon map ──────────────────────────────────────────────────────────
export const TECH_ICONS: Record<string, string> = {
  'Next.js':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'TypeScript':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'PHP':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Go':            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'Python':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Ethereum':      'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ethereum.svg',
  'HTMX':          'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/htmx.svg',
  'PostgreSQL':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MySQL':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Docker':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Node.js':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'CSS3':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'HTML5':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'Git':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Linux':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'Three.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'Tailwind':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'npm':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
  'CLI':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  'WebGL':         'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webgl.svg',
  'Framer Motion': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg',
  'SQLite':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  'Supabase':      'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg',
};

export const STACK = ['Python', 'Go', 'TypeScript', 'Next.js', 'Tailwind', 'MySQL', 'PostgreSQL'];

// ── Projects ──────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Quorel',
    stat: '4 live datasets · full version history · public & queryable, no login required',
    desc: 'Scraping gets you a page. It doesn\'t get you a source of truth. Quorel lets you define what data you want from any public website once, then handles the rest: schema-first AI extraction, nightly automatic refresh, and full version history on every change, nothing is ever overwritten. Every dataset ships with a native MCP server, so agents can query, filter, and clean the data conversationally without a line of scraping code.',
    images: ['/portfolio-images/img/quorel1.jpg', '/portfolio-images/img/quorel2.jpg'],
    live: 'https://quorel.vercel.app',
    github: 'https://github.com/var-raphael/quorel',
    closedSource: false,
    tags: ['Go', 'Next.js', 'TypeScript', 'MySQL'],
  },
  {
    title: 'VarsityLine',
    stat: '24 universities covered · verified cut-offs & courses · Paystack-powered alerts',
    desc: 'Nigerian students figure out admission cut-offs from group chats and outdated PDFs. VarsityLine fixes that: verified cut-off marks, courses, and screening dates for every Nigerian university, cross-checked against each school\'s own admissions office, with a "last confirmed" timestamp on every entry. Search by university, by course, or both with state and type filters, export results as a PDF, and subscribe for email or Telegram alerts on admission updates.',
    images: ['/portfolio-images/img/varsityline1.jpg', '/portfolio-images/img/varsityline2.jpg'],
    live: 'https://varsityline.vercel.app',
    github: 'https://github.com/var-raphael/varsityline',
    closedSource: false,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
  },
  {
    title: 'PhantomCrawl + PhantomClean',
    stat: '4-layer crawler · TLS fingerprinting & anti-bot evasion · paired AI-cleaning pipeline',
    desc: 'The infrastructure that makes Quorel possible. PhantomCrawl is a 4-layer web crawler built to handle TLS fingerprinting and anti-bot evasion at scale. PhantomClean sits downstream, stripping boilerplate and normalizing the mess a crawler pulls in, using AI-assisted cleaning and batch processing. Built from scratch, no scraping framework underneath.',
    images: [],
    live: '#',
    github: 'https://github.com/var-raphael/PhantomCrawl',
    closedSource: false,
    tags: ['Go', 'Python'],
  },
];

export const MORE_PROJECTS = [
  {
    title: 'Skim',
    desc: 'AI-powered PDF summarizer with real users. Tell it what you\'re looking for, get a page-by-page summary in seconds.',
    live: 'https://skim-7inx.onrender.com',
    github: 'https://github.com/var-raphael/skim',
    tags: ['Python', 'JavaScript'],
  },
  {
    title: 'Wildpalace SEO PLP',
    desc: 'Shopify app that auto-generates SEO-optimized Product Listing Pages from keyword intent.',
    live: '#',
    github: 'https://github.com/var-raphael/wildpalace-seo-plp',
    tags: ['TypeScript'],
  },
];

// ── Jewelry Collections ───────────────────────────────────────────────────────
export const JEWELRY_COLLECTIONS = [
  {
    name: 'Aqua Collection',
    desc: 'Cool-toned jewelry store with a crisp aqua palette. Showcases rings and accessories in an airy, modern layout with smooth hover transitions and a streamlined checkout experience.',
    images: ['/portfolio-images/img/ecomm-aqua1.jpg', '/portfolio-images/img/ecomm-aqua2.jpg'],
    live: 'https://phantom-demos.vercel.app/jewelry-teal',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    name: 'Coal Collection',
    desc: 'Bold, dark-mode e-commerce experience built for high-end prestige jewelry. Deep charcoal tones, dramatic product lighting, and an editorial grid that commands attention.',
    images: ['/portfolio-images/img/ecomm-coal1.jpg', '/portfolio-images/img/ecomm-coal2.jpg'],
    live: 'https://phantom-demos.vercel.app/watch-coal',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    name: 'Floral Collection',
    desc: 'Nature-inspired jewelry storefront with warm, organic aesthetics. Floral motifs woven into the layout guide customers through curated collections with an elegant, botanical feel.',
    images: ['/portfolio-images/img/ecomm-flw1.jpg', '/portfolio-images/img/ecomm-flw2.jpg'],
    live: 'https://phantom-demos.vercel.app',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    name: 'Ice Collection',
    desc: 'Glacial, ultra-clean jewelry landing page inspired by diamonds and frost. Minimal white space, sharp typography, and a sleek product showcase built to highlight icy, brilliant pieces.',
    images: ['/portfolio-images/img/ecomm-ice1.jpg', '/portfolio-images/img/ecomm-ice2.jpg'],
    live: 'https://phantom-demos.vercel.app/iced',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
];

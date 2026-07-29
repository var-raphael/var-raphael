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
    stat: '4 live datasets · MCP tool on every plan · full version history, nothing overwritten',
    desc: 'Gives your AI agent a live, versioned view of any website. Describe the fields you want in plain English, Quorel extracts them nightly and keeps every past version permanently queryable. Every dataset ships with an MCP server, so Claude or any MCP-compatible agent can query it, catch what changed since last week, and even fix bad rows itself, publishing the correction as a new, reversible version.',
    images: ['/portfolio-images/img/quorel1.jpg', '/portfolio-images/img/quorel2.jpg'],
    live: 'https://quorel.vercel.app',
    secondaryLive: 'https://quorel.vercel.app/datasets',
    secondaryLiveLabel: 'Browse Live Datasets ↗',
    github: 'https://github.com/var-raphael/quorel',
    closedSource: false,
    tags: ['Go', 'Next.js', 'TypeScript', 'MySQL'],
  },
  {
    title: 'VarsityLine',
    stat: '24 universities covered · verified cut-offs & courses · Paystack-powered alerts',
    desc: 'Nigerian students figure out admission cut-offs from group chats and outdated PDFs. VarsityLine fixes that: verified cut-off marks, courses, and screening dates for every Nigerian university, cross-checked against each school\'s own admissions office, with a "last confirmed" timestamp on every entry. Search by university, by course, or both with state and type filters, export results as a PDF, and subscribe for access to search and compare feature for decsion making.',
    images: ['/portfolio-images/img/varsityline1.jpg', '/portfolio-images/img/varsityline2.jpg'],
    live: 'https://varsityline.vercel.app',
    github: 'https://github.com/var-raphael/varsityline',
    closedSource: false,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
  },
  {
    title: 'Skim',
    stat: 'Real users · page-by-page summaries · targeted extraction, not a wall of text',
    desc: 'Uploading a 40-page PDF and getting a wall of text back isn\'t a summary, it\'s a chore. Skim lets you tell it exactly what you\'re looking for, then returns a clear, page-by-page summary in seconds, built for students and teachers who need the signal, not the whole document. Copy or download the result, and revisit past summaries anytime.',
    images: ['/portfolio-images/img/skim1.jpg', '/portfolio-images/img/skim2.jpg'],
    live: 'https://skim-7inx.onrender.com',
    github: 'https://github.com/var-raphael/skim',
    closedSource: false,
    tags: ['Python', 'JavaScript'],
  },
  {
    title: 'Wildpalace SEO PLP',
    stat: 'Shopify app · keyword-intent driven · auto-generated product listing pages',
    desc: 'Store owners waste hours hand-writing SEO copy for every product listing page, and most of it still doesn\'t rank. Wildpalace plugs into Shopify and auto-generates SEO-optimized Product Listing Pages straight from keyword intent, turning a manual content chore into something that runs itself.',
    images: ['/portfolio-images/img/wildpalace1.jpg', '/portfolio-images/img/wildpalace2.jpg'],
    live: '#',
    github: 'https://github.com/var-raphael/wildpalace-seo-plp',
    closedSource: false,
    tags: ['TypeScript', 'Next.js'],
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

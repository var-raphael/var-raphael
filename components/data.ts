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
  'Mistral':       'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/mistral-color.svg',
  'Vercel':        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg',
  'OpenAI':        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
  'Playwright':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg',
  'Claude':        'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg',
  'LangChain':     'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg',
  'Firecrawl':     'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/firecrawl-color.svg',
  'Chromium':      'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/chromium.svg',
  'Vector DB':     'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
};

export const STACK = ['Python', 'Go', 'TypeScript', 'Next.js', 'Tailwind', 'MySQL', 'PostgreSQL'];

export const TOOLS = ['Tailwind', 'Docker', 'Vercel', 'Firecrawl', 'Chromium', 'Playwright', 'Mistral', 'OpenAI', 'Claude', 'LangChain', 'Supabase', 'Vector DB'];

// ── KAIST / Claytronics ───────────────────────────────────────────────────────
// Set `live` to the real simulation URL when it's ready. '#' shows a "coming soon" label.
export const CLAYTRONICS = {
  live: '#',
};

// ── Projects ──────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Quorel',
    stat: '10 signups · 4 live datasets · 844+ records · 300+ API calls served',
    desc: 'Gives your AI agent a live, versioned view of any website. Describe the fields you want in plain English, Quorel extracts them nightly and keeps every past version permanently queryable. Every dataset ships with an MCP server, so Claude or any MCP-compatible agent can query it, catch what changed since last week, and even fix bad rows itself, publishing the correction as a new, reversible version.',
    images: ['/portfolio-images/img/quorel1.jpg', '/portfolio-images/img/quorel2.jpg'],
    live: 'https://quorel.vercel.app',
    secondaryLive: 'https://quorel.vercel.app/datasets',
    secondaryLiveLabel: 'Browse Live Datasets ↗',
    tertiaryLive: 'https://diffboard.vercel.app',
    tertiaryLiveLabel: 'See It In Use (Diffboard) ↗',
    github: 'https://github.com/var-raphael/vexaro',
    closedSource: false,
    tags: ['Go', 'Next.js', 'TypeScript', 'MySQL'],
  },
  {
    title: 'Groundtruth',
    stat: 'GitHub-verified candidate reports · scored per role · every claim sourced',
    desc: 'Every resume reads the same now, polished by the same AI tools and impossible to verify. Groundtruth skips the resume entirely: candidates connect GitHub, and it checks what they\'ve actually built, from repos and commit history to live deployed projects. Recruiters get a ranked report scored per role, where every claim traces back to a source, dead links are flagged instead of hidden, and facts are kept separate from opinions.',
    images: ['/portfolio-images/img/groundtruth1.jpg', '/portfolio-images/img/groundtruth2.jpg'],
    live: 'https://ground-truth-app.vercel.app',
    secondaryLive: 'https://ground-truth-app.vercel.app/job-report/5c75c5da-45d9-4806-8c18-010610f11400',
    secondaryLiveLabel: 'View Sample Report ↗',
    github: 'https://github.com/var-raphael/groundtruth-frontend',
    githubLabel: 'Frontend',
    secondaryGithub: 'https://github.com/var-raphael/groundtruth-backend',
    secondaryGithubLabel: 'Backend',
    closedSource: false,
    tags: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Mistral'],
  },
  {
    title: 'VarsityLine',
    stat: '24 universities · 13 paying subscribers · 132 free users · 687+ searches',
    desc: 'Nigerian students figure out admission cut-offs from group chats and outdated PDFs. VarsityLine fixes that: verified cut-off marks, courses, and screening dates for every Nigerian university, cross-checked against each school\'s own admissions office, with a "last confirmed" timestamp on every entry. Search by university, by course, or both with state and type filters, export results as a PDF, and subscribe for access to search and compare feature for decision making. Ships with a custom MCP server so Claude Desktop can autonomously monitor the source dataset on Quorel, clean changes, and push validated updates across all 24 universities.',
    images: ['/portfolio-images/img/varsityline1.jpg', '/portfolio-images/img/varsityline2.jpg'],
    live: 'https://varsityline.vercel.app',
    github: 'https://github.com/var-raphael/varsityline',
    closedSource: false,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
  },
  {
    title: 'Gnat',
    stat: 'Single Go binary · zero dependencies · built-in MCP server',
    desc: 'Existing self-hosted analytics tools force a tradeoff between depth and simplicity. Gnat is a single Go binary, no Docker, no multi-service stack, with funnels, cohorts, retention curves, and auto-discovered path analysis built in. Every instance ships with a native MCP server, so AI agents can query analytics data directly, no separate export step required.',
    images: ['/portfolio-images/img/gnat1.jpg', '/portfolio-images/img/gnat2.jpg'],
    live: 'https://gnat-np2m.onrender.com/dashboard',
    demoPassword: 'vJzTMw0bjTtWHyNpBCPGaZqE',
    github: 'https://github.com/var-raphael/Gnat',
    closedSource: false,
    tags: ['Go', 'SQLite', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Skim',
    stat: 'page-by-page summaries · targeted extraction, not a wall of text',
    desc: 'Uploading a 40-page PDF and getting a wall of text back isn\'t a summary, it\'s a chore. Skim lets you tell it exactly what you\'re looking for, then returns a clear, page-by-page summary in seconds, built for students and teachers who need the signal, not the whole document.',
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

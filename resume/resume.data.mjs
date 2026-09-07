/**
 * Single source of truth for the résumé. Both renderers read this:
 *   build.mjs -> resume.html -> static/resume.pdf   (designed, two-column)
 *   build.mjs -> static/resume.docx                 (single-column, ATS-friendly)
 *
 * Kept as plain data (no JSX) so it can run under plain node. It mirrors
 * src/data/experience.js; when you change one, change the other. The older
 * roles carry a trimmed bullet set here so the résumé stays two pages -- the
 * site has room for the full list, a printed page does not.
 */

export const profile = {
  name: 'Cris Ryan Tan',
  initials: 'CT',
  title: 'Software Engineer',
  phoneAu: '+61 433 697 883',
  phoneUs: '+1 201 978 7227',
  email: 'crisryantan@gmail.com',
  location: 'NSW, Australia',
  website: 'crisryantan.com',
}

export const summary = [
  'Innovative and detail-oriented Senior Full-stack Engineer with a specialisation in Frontend technologies and deep expertise designing and developing high-performance, scalable web applications.',
  'Expert in modern JavaScript frameworks, with a strong focus on creating intuitive, responsive, and accessible user interfaces. Sound experience in backend development, DevOps projects, and end-to-end testing.',
  'Passionate about user experience, clean code, and staying current with emerging technologies.',
]

export const education = [
  {
    qualification: 'Bachelor of Computer Engineering',
    school: 'University of Cebu',
    period: '2008-2013',
  },
  {
    qualification: 'Secondary School',
    school: 'Don Bosco Technology Center',
    period: '2004-2008',
  },
]

export const skills = [
  {
    title: 'Programming Languages',
    items: 'JavaScript (ES6+), TypeScript, C#',
  },
  {
    title: 'Frontend Technologies',
    items: 'HTML5, CSS3, React.js, Next.js, Remix, Angular, Vue.js',
  },
  {
    title: 'Backend & Runtime Environments',
    items: 'Node.js, .NET (.NET Core / ASP.NET)',
  },
  { title: 'State Management & Reactive', items: 'Redux, RxJS' },
  {
    title: 'Tooling & Build Systems',
    items: 'Webpack, Rollup, Vite, Nx, Bun, ESLint, Storybook',
  },
  {
    title: 'Testing',
    items:
      'Jest, Vitest, Playwright, Contract Testing (Pact), Visual Regression',
  },
  {
    title: 'Version Control & CI/CD',
    items: 'Git, GitHub, Buildkite, CircleCI',
  },
  {
    title: 'Observability & Experimentation',
    items:
      'Datadog monitors and runbooks, A/B design and analysis, SQL / Trino',
  },
  {
    title: 'Performance Optimization',
    items: 'Lazy Loading, Code Splitting, Tree Shaking, Caching',
  },
  {
    title: 'AI-Assisted Development',
    items: 'Coding agents and workflows, Claude Skills, prompt engineering',
  },
]

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Rokt',
    location: 'Sydney, Australia',
    period: 'Feb 2026 - Present',
    bullets: [
      'Built the contract-testing (Pact) program from a single-repo experiment into cross-platform infrastructure covering all three SDK consumers (web, iOS, Android), the transactions provider, and the server-to-server surface.',
      'Moved the web SDK’s offer-selection path onto the platform’s new backend architecture, ramping partner by partner behind routing controls with parity checks and per-partner monitoring at each step, so any revenue impact stayed visible and reversible.',
      'Modernised the web SDK’s build and CI by consolidating on Nx with affected-only scoping, sharding the PR pipeline, migrating npm to bun, and surfacing bundle size per PR. Cut PR build time by ~45% and mainline by ~33%, roughly halving what the team waits on for every change.',
      'Cut SDK time to interactive by 11% at p50 and 12% at p95 through code-splitting, an explicit browser-support floor that let legacy polyfills go, and phasing bootstrap into critical and deferred work. Modelled at a 0.3-1.9% revenue lift depending on percentile.',
      'Rebuilt the on-call surface ahead of new engineers joining the rotation: replaced a stale 9-code runbook with one covering the ~150 error codes the SDK actually emits, added back-tested per-code monitors, and caught a silently soft-failing Terraform step that had left 35 merged monitor changes undeployed.',
      'Acted as the SDK technical expert during partner onboarding, fielding integration questions and clearing blockers for partners including Cinemark, eBay, and Kroger.',
      'Invested in team leverage: guardrails for AI-generated code and performance guidelines in AGENTS.md that keep render-latency regressions from reaching partner pages, plus reusable playbooks for pitching and code review.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Lorikeet',
    location: 'Sydney, Australia',
    period: 'Sept 2025 - Feb 2026',
    bullets: [
      'Shipped Concierge, rebuilding Brands into Concierges as the hub for multi-channel CX config. Standardized channel-level settings as the single source of truth, aligned with a DB migration and large backfills to cut duplication and make multi-env changes safer.',
      'Built partner reporting for Quality Score, CSAT, and containment rate, giving partners visibility into key CX metrics across their support operations.',
      'Shipped Coach, an AI agent that explains metric shifts, diagnoses root causes, and recommends fixes, turning reporting data into actionable insights.',
      'Implemented role-based access control and laid the groundwork for platform-wide PII redaction, enabling safer data handling across workflows and reporting.',
      'Optimized server-side rendering performance in React/Remix by instrumenting loaders with performance markers, identifying bottleneck queries, and applying parallel execution and deferred streaming patterns. Cut average page load time from 2.2s to ~700ms (~68% reduction) and documented the playbook for reuse across the team.',
      'Audited the full infrastructure stack for compression and bundle size gaps across CDN, application servers, load balancers, and the Vite build pipeline. Enabled Brotli on Cloud CDN, reducing web app cold load transfer by 75% (1.56 MB to 392 KB) and chat widget transfer by 56% (1.81 MB to 795 KB). Reduced chat bundle size by ~630 KB through tree-shaking the shared design system via sideEffects configuration, eliminating 87% of one chunk.',
      'Built a preparative iframe preloading mechanism for the embeddable chat widget, achieving an 85% cache hit rate and cutting widget time-to-ready from 1.24s to 681ms.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Rokt',
    location: 'Sydney, Australia',
    period: '2019 - May 2025',
    bullets: [
      'Developed and maintained a robust frontend SDK, empowering enterprises to deliver targeted advertising seamlessly on e-commerce sites and apps.',
      'Achieved a 30% reduction in SDK load time and a 40% decrease in script size, significantly improving performance and user experience.',
      'Adoption at scale: the SDK is deployed across top-tier companies including Ticketmaster, Best Buy, Domino’s, and AMC Theatres, powering customer engagement across millions of users.',
      'High-volume transactions: designed and developed an SDK handling over a million transactions daily, generating almost $2 million in daily revenue.',
      'Implemented guardrails by adding integration tests, visual regression tests, and end-to-end tests to ensure application robustness and reliability.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Leadbook',
    location: 'Singapore',
    period: '2017 - 2018',
    bullets: [
      'Managed and mentored a team of software engineers, ensuring high-quality deliverables and fostering a collaborative development environment.',
      'Co-structured, designed, and built the frontend of the Leadbook platform, delivering a seamless and engaging user experience.',
      'Spearheaded the reimplementation of the existing platform to a modern single-page application using React, Redux, and Styled Components, improving performance, scalability, and user interaction.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Tritontek',
    location: 'Cebu, Philippines',
    period: '2015 - 2017',
    bullets: [
      'Designed and built a Time Management application tailored for civil engineers, focusing on usability, efficiency, and reliability.',
      'Demonstrated and enforced proper coding techniques, emphasising maintainability, code reuse, clean code practices, and unit testing.',
    ],
  },
]

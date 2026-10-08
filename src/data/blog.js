/**
 * Blog index. Single source of truth for the home page preview grid and the
 * ArticleLayout prev/next navigation (ordered as displayed).
 */
const blogPosts = [
  {
    id: 0,
    title: 'Harry Potter and the Order of the Agents',
    excerpt:
      'How I split my AI workflow into a themed fleet, with shared memory, cross-model review, and rough estimates of the token use and spend it could save.',
    date: 'October 5, 2026',
    readTime: '9 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-agent-fleet',
  },
  {
    id: 1,
    title: 'Measuring the Impact of Engineering Work',
    excerpt:
      'How I measured SDK performance improvements at Rokt, starting with the customer experience, and turned the experiment setup and analysis into two reusable Claude Skills.',
    date: 'September 18, 2026',
    readTime: '6 min read',
    category: 'Performance',
    link: '/blog/measuring-engineering-impact',
  },
  {
    id: 2,
    title:
      'Compression, Preloading, and Tree-Shaking: Cutting Load Times by 75% at Lorikeet',
    excerpt:
      'How a performance audit uncovered three independent optimizations that cut cold load transfer by 75%, reduced widget load time to 681ms, and trimmed 630KB from our bundles, and how they amplified each other.',
    date: 'February 15, 2026',
    readTime: '10 min read',
    category: 'Performance',
    link: '/blog/cutting-load-times-at-lorikeet',
  },
  {
    id: 3,
    title: 'Maximizing Productivity with AI Coding Agents',
    excerpt:
      'How our team wired Slack, Linear, and Cursor into a delegation pipeline, and why a single agents.md file did more for AI output quality than any tool upgrade.',
    date: 'January 20, 2026',
    readTime: '9 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-agents-productivity',
  },
  {
    id: 4,
    title: 'Claude Skills: Turning Personal Expertise into Team Superpowers',
    excerpt:
      'We built around 60 Claude Skills at Lorikeet. Here are the ones that stuck, the structural patterns behind them, and the lessons we learned the hard way.',
    date: 'December 30, 2025',
    readTime: '8 min read',
    category: 'AI & Productivity',
    link: '/blog/claude-skills-institutional-knowledge',
  },
  {
    id: 5,
    title: 'AI-Assisted Coding Workflows: Delegating vs Leveraging',
    excerpt:
      'The mental model I use for AI coding assistants: delegate well-specified tasks and walk away, or leverage AI as a pair for diagnosis and design. Plus the migration that taught me when to switch.',
    date: 'March 17, 2026',
    readTime: '8 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-coding-workflows',
  },
  {
    id: 6,
    title:
      'From SDK to SSR: Performance Optimization Lessons Across Frameworks',
    excerpt:
      "The instrument-measure-identify-optimize loop I learned building Rokt's SDK, applied to a slow Remix app at Lorikeet: parallel queries, defer, and skeleton UI cut observed page load from 2.2s to ~700ms.",
    date: 'December 29, 2025',
    readTime: '9 min read',
    category: 'Performance',
    link: '/blog/sdk-to-ssr-performance-optimization',
  },
]

export default blogPosts

/**
 * Blog index. Single source of truth for the home page preview grid and the
 * ArticleLayout prev/next navigation (ordered as displayed).
 */
const blogPosts = [
  {
    id: 0,
    title:
      "10-12% Off Our SDK's Time to Interactive, and the A/B Skills That Measured It",
    excerpt:
      "Two changes cut Rokt's web SDK time to interactive by 11% at p50 and 12% at p95. Here's how we tested the result and connected latency to revenue.",
    date: 'August 30, 2026',
    readTime: '8 min read',
    category: 'Performance',
    link: '/blog/proving-performance-wins',
  },
  {
    id: 1,
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
    id: 2,
    title: 'Maximizing Productivity with AI Coding Agents',
    excerpt:
      'How our team wired Slack, Linear, and Cursor into a delegation pipeline, and why a single agents.md file did more for AI output quality than any tool upgrade.',
    date: 'January 20, 2026',
    readTime: '9 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-agents-productivity',
  },
  {
    id: 3,
    title: 'Claude Skills: Turning Personal Expertise into Team Superpowers',
    excerpt:
      'We built around 60 Claude Skills at Lorikeet. Here are the ones that stuck, the structural patterns behind them, and the lessons we learned the hard way.',
    date: 'December 30, 2025',
    readTime: '8 min read',
    category: 'AI & Productivity',
    link: '/blog/claude-skills-institutional-knowledge',
  },
  {
    id: 4,
    title: 'AI-Assisted Coding Workflows: Delegating vs Leveraging',
    excerpt:
      'The mental model I use for AI coding assistants: delegate well-specified tasks and walk away, or leverage AI as a pair for diagnosis and design. Plus the migration that taught me when to switch.',
    date: 'March 17, 2026',
    readTime: '8 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-coding-workflows',
  },
  {
    id: 5,
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

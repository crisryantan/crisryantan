/**
 * Blog index. Single source of truth for the home page preview grid and the
 * ArticleLayout prev/next navigation (ordered as displayed).
 */
const blogPosts = [
  {
    id: 0,
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
    id: 1,
    title: 'Maximizing Productivity with AI Coding Agents',
    excerpt:
      'A comprehensive guide to AI coding tools, team workflows, and building institutional knowledge for AI-assisted development.',
    date: 'January 20, 2026',
    readTime: '14 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-agents-productivity',
  },
  {
    id: 2,
    title: 'Claude Skills: Turning Personal Expertise into Team Superpowers',
    excerpt:
      'How Claude Skills transform individual knowledge into institutional capability, making specialized expertise available to your entire team automatically.',
    date: 'December 30, 2025',
    readTime: '10 min read',
    category: 'AI & Productivity',
    link: '/blog/claude-skills-institutional-knowledge',
  },
  {
    id: 3,
    title: 'AI-Assisted Coding Workflows: Delegating vs Leveraging',
    excerpt:
      'Learn the mental model for working with AI coding assistants: when to delegate tasks and walk away vs when to leverage AI as your pair programming partner.',
    date: 'March 17, 2026',
    readTime: '12 min read',
    category: 'AI & Productivity',
    link: '/blog/ai-coding-workflows',
  },
  {
    id: 4,
    title:
      'From SDK to SSR: Performance Optimization Lessons Across Frameworks',
    excerpt:
      'How systematic performance optimization reduced page load times by 68% in React/Remix applications, applying lessons learned from SDK development.',
    date: 'December 29, 2025',
    readTime: '12 min read',
    category: 'Performance',
    link: '/blog/sdk-to-ssr-performance-optimization',
  },
]

export default blogPosts

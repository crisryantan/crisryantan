import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'

const BlogPostTemplate = ({ data, pageContext }) => {
  // This would typically come from GraphQL data
  // For now, using mock data that matches the blog posts
  const post = {
    title: pageContext?.title || 'Sample Blog Post',
    date: pageContext?.date || 'March 15, 2024',
    readTime: pageContext?.readTime || '5 min read',
    category: pageContext?.category || 'React',
    content: `
      <p>In today's rapidly evolving web development landscape, building scalable React applications has become more critical than ever. As applications grow in complexity and user base, developers face unique challenges that require thoughtful architecture and proven patterns.</p>
      
      <h2>Understanding Scalability Challenges</h2>
      <p>When we talk about scalable React applications, we're addressing several key areas: performance optimization, maintainable code structure, efficient state management, and seamless team collaboration. Many developers start with simple component structures but quickly realize that what works for small projects doesn't necessarily scale to enterprise-level applications.</p>
      
      <p>The most common issues I've encountered while working on large-scale applications include prop drilling, uncontrolled re-renders, and tightly coupled components that become difficult to test and maintain.</p>
      
      <h2>Essential Patterns for Scale</h2>
      <p>Through my experience at companies like Rokt, where our SDK handles millions of transactions daily, I've learned that certain patterns are indispensable for building robust applications.</p>
      
      <h3>Component Composition Over Inheritance</h3>
      <p>React's composition model allows us to build flexible, reusable components. Instead of creating complex inheritance hierarchies, we leverage composition to create components that are easier to understand, test, and modify. This approach has been instrumental in maintaining our codebase as our team grew from 5 to 20+ engineers.</p>
      
      <h3>Strategic State Management</h3>
      <p>Not all state needs to live in Redux or a global store. I've found success using a layered approach: local component state for UI interactions, context for feature-specific shared state, and Redux/Zustand for truly global application state. This prevents the common anti-pattern of over-centralizing state.</p>
      
      <blockquote>
      "Premature optimization is the root of all evil, but ignoring performance entirely is just as dangerous." - A lesson learned from optimizing React applications at scale.
      </blockquote>
      
      <h3>Performance Optimization Strategies</h3>
      <p>Performance isn't just about bundle size—though that matters. We've implemented several strategies that have proven effective:</p>
      
      <ul>
        <li><strong>Code Splitting:</strong> Strategic use of React.lazy() and dynamic imports to reduce initial bundle size</li>
        <li><strong>Memoization:</strong> React.memo, useMemo, and useCallback where they provide measurable benefits</li>
        <li><strong>Virtual Scrolling:</strong> For handling large datasets in user interfaces</li>
        <li><strong>Image Optimization:</strong> Using next/image or similar solutions for automatic optimization</li>
      </ul>
      
      <h2>Testing and Quality Assurance</h2>
      <p>Scalable applications require comprehensive testing strategies. We've implemented a testing pyramid that includes unit tests with Jest and React Testing Library, integration tests for critical user flows, and end-to-end tests using Playwright for our most important features.</p>
      
      <p>The key insight is that testing isn't just about catching bugs—it's about enabling confident refactoring and feature development as your application grows.</p>
      
      <h3>Code Quality and Team Standards</h3>
      <p>As teams grow, consistent code quality becomes crucial. We use ESLint, Prettier, and TypeScript to enforce standards, but the real magic happens in code reviews and pair programming sessions where knowledge transfer occurs naturally.</p>
      
      <pre><code>// Example of a well-structured custom hook
const useApiData = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, options)
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [url])
  
  return { data, loading, error }
}</code></pre>
      
      <h2>Monitoring and Analytics</h2>
      <p>Building scalable applications means planning for problems before they occur. We use tools like Sentry for error tracking, performance monitoring with Core Web Vitals, and user analytics to understand how our applications perform in the real world.</p>
      
      <p>This data-driven approach has helped us identify performance bottlenecks and user experience issues that weren't apparent during development.</p>
      
      <h2>Looking Forward</h2>
      <p>The React ecosystem continues to evolve with exciting developments like Server Components, Concurrent Features, and improved development tools. However, the fundamental principles of building scalable applications—clean architecture, comprehensive testing, and performance consciousness—remain constant.</p>
      
      <p>As we build more complex applications, the investment in proper architecture and development practices pays dividends in maintainability, team productivity, and user satisfaction.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications is both an art and a science. It requires balancing immediate development speed with long-term maintainability, choosing the right tools for your specific context, and fostering a culture of quality within your development team.</p>
      
      <p>The patterns and practices outlined here have served me well across multiple projects and team sizes. While every application is unique, these foundational approaches provide a solid starting point for building React applications that can grow with your needs.</p>
      
      <p>What challenges have you faced while scaling React applications? I'd love to hear about your experiences and the solutions you've discovered along the way.</p>
    `,
  }

  return (
    <Layout>
      <Seo
        title={post.title}
        description={`Read about ${post.title} - insights and thoughts on modern web development.`}
        article
      />

      {/* Header */}
      <header className="pt-32 pb-16 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-blitz-soft hover:text-blitz-accent transition-colors duration-200 mb-8"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="badge badge-accent">{post.category}</span>
              <time className="text-blitz-charcoal/60">{post.date}</time>
              <span className="text-blitz-charcoal/60">•</span>
              <span className="text-blitz-charcoal/60">{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blitz-primary mb-6">
              {post.title}
            </h1>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blitz-lavender/30 mr-4">
                <img
                  src="/path-to-your-avatar.jpg"
                  alt="Cris Ryan Tan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-blitz-primary">Cris Ryan Tan</p>
                <p className="text-sm text-blitz-charcoal/60">
                  Senior Software Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="py-16 bg-blitz-white">
        <div className="max-width-container section-padding">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg prose-blitz max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags/Topics */}
            <div className="mt-12 pt-8 border-t border-blitz-lavender/20">
              <h3 className="text-lg font-semibold text-blitz-primary mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'Web Development', 'Frontend'].map(
                  (tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-blitz-lavender/20">
              <div className="flex flex-col sm:flex-row justify-between gap-8">
                <div className="flex-1">
                  <Link
                    to="/blog/previous-post"
                    className="group block p-6 card-minimal hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center text-blitz-soft mb-2">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous Post
                    </div>
                    <h4 className="font-semibold text-blitz-primary group-hover:text-blitz-accent transition-colors">
                      Previous Blog Post Title
                    </h4>
                  </Link>
                </div>

                <div className="flex-1">
                  <Link
                    to="/blog/next-post"
                    className="group block p-6 card-minimal hover:shadow-soft transition-all duration-300 text-right"
                  >
                    <div className="flex items-center justify-end text-blitz-soft mb-2">
                      Next Post
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-blitz-primary group-hover:text-blitz-accent transition-colors">
                      Next Blog Post Title
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blitz-primary mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-lg text-blitz-charcoal/80 mb-8">
              Subscribe to get notified about new blog posts and insights about
              web development.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg border border-blitz-lavender/30 focus:border-blitz-soft focus:outline-none focus:ring-2 focus:ring-blitz-soft/20 transition-all duration-200"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

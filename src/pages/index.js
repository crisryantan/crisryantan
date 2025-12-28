import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import Hero from '../components/Hero'

const blogPosts = [
  {
    id: 1,
    title: 'AI-Assisted Coding Workflows: Delegating vs Leveraging',
    excerpt:
      'A comprehensive guide to maximizing productivity with AI coding assistants through systematic delegation and active collaboration patterns.',
    date: 'December 30, 2025',
    readTime: '15 min read',
    link: '/blog/ai-coding-workflows',
  },
  {
    id: 2,
    title: 'From SDK to SSR: Performance Optimization Lessons Across Frameworks',
    excerpt:
      'How systematic performance optimization reduced page load times by 68% in React/Remix applications, applying lessons learned from SDK development.',
    date: 'December 29, 2025',
    readTime: '12 min read',
    link: '/blog/sdk-to-ssr-performance-optimization',
  },
  {
    id: 3,
    title: 'Building Scalable React Applications',
    excerpt:
      'Best practices and patterns for building maintainable React applications at scale.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    link: '/blog/scalable-react',
  },
]

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Home" />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blitz-primary">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-blitz-charcoal/80 leading-relaxed">
                Innovative and detail-oriented Senior Software Engineer with a
                specialisation in Frontend technologies and deep expertise
                designing and developing high-performance, scalable web
                applications.
              </p>
              <p className="text-lg text-blitz-charcoal/80 leading-relaxed">
                Expert in modern JavaScript frameworks, with a strong focus on
                creating intuitive, responsive, and accessible user interfaces.
                Sound experience in backend development, DevOps projects, and
                end-to- end testing.
              </p>
              <p className="text-lg text-blitz-charcoal/80 leading-relaxed">
                Passionate about user experience, clean code, and staying
                current with emerging technologies.
              </p>
              <p className="text-lg text-blitz-charcoal/80 leading-relaxed mt-4">
                As the co-founder of{' '}
                <a
                  href="https://blitzstack.io"
                  className="link-hover font-medium"
                >
                  Blitzstack.io
                </a>
                , I'm dedicated to empowering developers with tools that
                accelerate development and improve code quality.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    Programming Languages
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      JavaScript (ES6+)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      C#
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    Frontend Technologies
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      HTML5, CSS3
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      React.js, Next.js
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Angular, Vue.js
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    State Management
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Redux
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      RxJS
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    Backend
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Node.js
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      .NET (.NET Core / ASP.NET)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    Testing & Tools
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Jest, Unit Testing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Integration & E2E Testing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Webpack, Rollup, Storybook
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blitz-primary mb-3">
                    DevOps & Performance
                  </h3>
                  <ul className="space-y-2 text-blitz-charcoal/70">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Git, GitHub, CircleCI, Buildkite
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Lazy Loading, Code Splitting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blitz-soft rounded-full mr-3"></span>
                      Tree Shaking, Caching
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blitz-primary">
            Experience
          </h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Rokt */}
            <div className="card p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-blitz-primary">
                    Senior Software Engineer
                  </h3>
                  <p className="text-blitz-soft font-medium">
                    Rokt - Sydney Australia
                  </p>
                </div>
                <span className="text-blitz-charcoal/60 text-sm mt-2 md:mt-0">
                  2019 - Present
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Developed and maintained a robust frontend SDK, empowering
                    enterprises to deliver targeted advertising seamlessly on
                    e-commerce sites and apps.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Achieved a <strong>30% reduction in SDK load time</strong>{' '}
                    and a <strong>40% decrease in script size</strong>,
                    significantly improving performance and user experience.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Built and maintained client-side UI components displayed as
                    offers to customers using{' '}
                    <strong>React, TypeScript, Redux, and RxJS</strong>.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    <strong>Adoption at Scale:</strong> The SDK is deployed
                    across top-tier companies including Ticketmaster, Best Buy,
                    Domino's, AMC Theatres, and many others, powering customer
                    engagement across millions of users.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    <strong>High-Volume Transactions:</strong> Design and
                    developed an SDK handling over a million transactions daily,
                    generating of almost $2 million in daily revenue.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Established and enforced coding standards and best practices
                    to ensure high-quality code and efficient development
                    processes.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Maintained and monitored app deployments through continuous
                    integration and continuous deployment (CI/CD) pipelines.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Implemented guardrails by adding integration tests, visual
                    regression tests, and end-to-end tests to ensure application
                    robustness and reliability.
                  </span>
                </li>
              </ul>
            </div>

            {/* Leadbook */}
            <div className="card p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-blitz-primary">
                    Software Engineer
                  </h3>
                  <p className="text-blitz-soft font-medium">
                    Leadbook - Singapore
                  </p>
                </div>
                <span className="text-blitz-charcoal/60 text-sm mt-2 md:mt-0">
                  2017 - 2018
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Managed and mentored a team of Software Engineers, ensuring
                    high-quality deliverables and fostering a collaborative
                    development environment.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Conducted thorough code reviews among peers to ensure code
                    quality, adherence to best practices, and maintainability,
                    resulting in robust and reliable software deployments.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Worked closely with product owners and designers,
                    contributing technical expertise and innovative ideas to
                    align with company-wide goals and enhance the overall
                    product vision.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Co-structured, designed, and built the frontend of the
                    Leadbook platform, delivering a seamless and engaging user
                    experience.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Spearheaded the reimplementation of the existing platform to
                    a modern single-page application using{' '}
                    <strong>React, Redux, and Styled Components</strong>. This
                    transition improved performance, scalability, and user
                    interaction.
                  </span>
                </li>
              </ul>
            </div>

            {/* Tritontek */}
            <div className="card p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-blitz-primary">
                    Software Engineer
                  </h3>
                  <p className="text-blitz-soft font-medium">
                    Tritontek - Cebu, Philippines
                  </p>
                </div>
                <span className="text-blitz-charcoal/60 text-sm mt-2 md:mt-0">
                  2015 - 2017
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Designed and built a Time Management application
                    specifically tailored for use by Civil Engineers, focusing
                    on usability, efficiency, and reliability.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Conducted consistent code reviews among peers to ensure
                    high-quality, maintainable, and clean code is deployed.
                    Worked closely with product owners and designers,
                    contributing technical expertise and innovative ideas to
                    align with company-wide goals and enhance the overall
                    product vision.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Coached and supported teammates through code reviews and
                    whiteboarding sessions, fostering a collaborative and
                    growth-oriented development environment.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blitz-charcoal/80">
                    Demonstrated and enforced proper coding techniques,
                    emphasizing maintainability, code reuse, clean code
                    practices, and unit testing. Played a key role in driving
                    and maintaining coding standards within the team.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blitz-primary">
            Recent Blog Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="card-minimal p-6 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center text-sm text-blitz-charcoal/60 mb-3">
                  <time>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-blitz-primary mb-3">
                  <Link
                    to={post.link}
                    className="hover:text-blitz-accent transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-blitz-charcoal/70 mb-4">{post.excerpt}</p>
                <Link
                  to={post.link}
                  className="inline-flex items-center text-blitz-soft hover:text-blitz-accent transition-colors duration-200"
                >
                  Read more
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-subtle">
        <div className="max-width-container section-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blitz-primary">
            Let's Connect
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-blitz-charcoal/80 mb-8">
              I'm always interested in hearing about new opportunities, exciting
              projects, or just having a friendly chat about technology. Feel
              free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/crisryantan/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="/resume.pdf"
                className="btn-primary flex items-center justify-center sm:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="card-minimal p-6">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-blitz-soft"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-blitz-primary mb-2 text-center">
                  Location
                </h3>
                <p className="text-blitz-charcoal/70 text-center">
                  Sydney, Australia
                </p>
              </div>
              <div className="card-minimal p-6">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-blitz-soft"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-blitz-primary mb-2 text-center">
                  Email
                </h3>
                <p className="text-blitz-charcoal/70 text-center">
                  crisryantan@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

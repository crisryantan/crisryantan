import React from 'react'
import { Link } from 'gatsby'
import { m } from 'motion/react'
import Reveal from '../motion/Reveal'
import Stagger, { StaggerItem } from '../motion/Stagger'
import blogPosts from '../../data/blog'

const BlogPreview = () => (
  <section id="blog" className="py-20 bg-gradient-subtle">
    <div className="max-width-container section-padding">
      <Reveal
        as="h2"
        className="mb-16 text-center text-3xl font-bold text-blitz-primary md:text-4xl"
      >
        Recent Blog Posts
      </Reveal>

      <Stagger
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.1}
        amount={0.1}
      >
        {blogPosts.map((post) => (
          <StaggerItem key={post.id} className="h-full">
            <m.article
              className="card-minimal group flex h-full flex-col p-6 transition-shadow hover:shadow-soft"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="mb-3 flex items-center text-sm text-blitz-charcoal/60">
                <time>{post.date}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-blitz-primary">
                <Link
                  to={post.link}
                  className="transition-colors duration-200 hover:text-blitz-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mb-4 flex-grow text-blitz-charcoal/70">
                {post.excerpt}
              </p>
              <Link
                to={post.link}
                aria-label={`Read more: ${post.title}`}
                className="inline-flex items-center text-blitz-soft transition-colors duration-200 hover:text-blitz-accent"
              >
                Read more
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </m.article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
)

export default BlogPreview

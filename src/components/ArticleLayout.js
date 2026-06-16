import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { m } from 'motion/react'
import Layout from './Layout'
import Seo from './SEO'
import Reveal from './motion/Reveal'
import ReadingProgress from './motion/ReadingProgress'
import blogPosts from '../data/blog'

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

/**
 * Shared reading shell for every blog post. Posts pass their metadata as props
 * and their prose as children; everything else (reading progress, table of
 * contents + scroll-spy, header, author, prev/next, CTA) is provided here so the
 * five post files no longer duplicate it.
 *
 * Accessibility/SEO: prose is rendered fully visible. The scroll reveal only hides
 * (then animates) below-the-fold children, and only when JS + motion are available
 * — so crawlers and no-JS / reduced-motion users always get the complete article.
 */
const ArticleLayout = ({
  title,
  description,
  date,
  readTime,
  category,
  slug,
  tags = [],
  children,
}) => {
  const proseRef = useRef(null)
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const el = proseRef.current
    if (!el) return

    // Build the table of contents from the rendered headings.
    const headingEls = Array.from(el.querySelectorAll('h2, h3'))
    const list = headingEls.map((h) => {
      if (!h.id) h.id = slugify(h.textContent || '')
      return {
        id: h.id,
        text: h.textContent || '',
        level: h.tagName === 'H2' ? 2 : 3,
      }
    })
    setHeadings(list)

    // Scroll-spy: highlight the heading currently in the reading zone.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    headingEls.forEach((h) => spy.observe(h))

    // Progressive prose reveal — hide + animate only below-fold children, and only
    // when motion is allowed. Above-fold and no-JS content is never hidden.
    let revealIO
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            // Tables cascade their rows in; everything else fades the block in.
            e.target.classList.add(
              e.target.classList.contains('rows-hidden')
                ? 'rows-in'
                : 'prose-in'
            )
            revealIO.unobserve(e.target)
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
      )
      Array.from(el.children).forEach((child) => {
        if (child.getBoundingClientRect().top <= window.innerHeight * 0.85)
          return
        child.classList.add(
          child.tagName === 'TABLE' ? 'rows-hidden' : 'prose-hidden'
        )
        revealIO.observe(child)
      })
    }

    return () => {
      spy.disconnect()
      revealIO?.disconnect()
    }
  }, [])

  const idx = blogPosts.findIndex((p) => p.link === slug)
  const prev = idx > 0 ? blogPosts[idx - 1] : null
  const next =
    idx >= 0 && idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null

  return (
    <Layout>
      <Seo title={title} description={description} article />
      <ReadingProgress />

      {/* Header */}
      <header className="bg-gradient-subtle pt-32 pb-12">
        <div className="max-width-container section-padding">
          {/* Match the prose column width/edge: 6xl rail minus the 15rem TOC + 3rem gap */}
          <div className="mx-auto max-w-6xl lg:pr-[18rem]">
            <Link
              to="/#blog"
              className="mb-8 inline-flex items-center text-blitz-soft transition-colors duration-200 hover:text-blitz-accent"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to posts
            </Link>

            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blitz-charcoal/60">
                {category && (
                  <span className="badge badge-accent">{category}</span>
                )}
                {date && <time>{date}</time>}
                {date && readTime && <span>•</span>}
                {readTime && <span>{readTime}</span>}
              </div>
              <h1 className="text-3xl font-bold text-blitz-primary md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <div className="mt-8 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full ring-2 ring-blitz-lavender/30">
                  <StaticImage
                    src="../assets/images/avatar.jpg"
                    alt="Cris Ryan Tan"
                    placeholder="blurred"
                    layout="fixed"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-blitz-primary">
                    Cris Ryan Tan
                  </p>
                  <p className="text-sm text-blitz-charcoal/60">
                    Senior Software Engineer
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Body + table of contents */}
      <div className="bg-blitz-white py-12">
        <div className="max-width-container section-padding">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_15rem] lg:gap-12">
            {/*
              Bare `prose-blitz` only — NOT the @tailwindcss/typography `prose`
              classes. These posts were hand-authored for prose-blitz; layering
              `prose` on top double-rendered list markers/numbers and imposed its
              own (dark-on-light) colors. prose-blitz inherits the blitz tokens,
              which flip for dark mode automatically.
            */}
            <article ref={proseRef} className="prose-blitz max-w-none">
              {children}
            </article>

            {/* Sticky TOC (desktop) */}
            <aside className="hidden lg:block">
              {headings.length > 0 && (
                <nav className="sticky top-28" aria-label="Table of contents">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blitz-charcoal/50">
                    On this page
                  </p>
                  <ul className="space-y-2 border-l border-blitz-lavender/20 text-sm">
                    {headings.map((h) => (
                      <li
                        key={h.id}
                        className={h.level === 3 ? 'pl-7' : 'pl-4'}
                      >
                        <a
                          href={`#${h.id}`}
                          className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors duration-200 ${
                            activeId === h.id
                              ? 'border-blitz-soft font-medium text-blitz-primary'
                              : 'border-transparent text-blitz-charcoal/60 hover:text-blitz-primary'
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Footer: tags, prev/next, CTA */}
      <div className="bg-blitz-white pb-16">
        <div className="max-width-container section-padding">
          <div className="mx-auto max-w-6xl lg:pr-[18rem]">
            {tags.length > 0 && (
              <div className="border-t border-blitz-lavender/20 pt-8">
                <h3 className="mb-4 text-lg font-semibold text-blitz-primary">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(prev || next) && (
              <div
                className={`mt-12 grid gap-6 border-t border-blitz-lavender/20 pt-8 ${
                  prev && next ? 'sm:grid-cols-2' : 'mx-auto max-w-md'
                }`}
              >
                {prev && (
                  <m.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <Link
                      to={prev.link}
                      className="card-minimal group block h-full p-6"
                    >
                      <div className="mb-2 flex items-center text-sm text-blitz-soft">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous
                      </div>
                      <h4 className="font-semibold text-blitz-primary transition-colors group-hover:text-blitz-accent">
                        {prev.title}
                      </h4>
                    </Link>
                  </m.div>
                )}
                {next && (
                  <m.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <Link
                      to={next.link}
                      className="card-minimal group block h-full p-6 text-right"
                    >
                      <div className="mb-2 flex items-center justify-end text-sm text-blitz-soft">
                        Next
                        <svg
                          className="ml-2 h-4 w-4"
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
                      </div>
                      <h4 className="font-semibold text-blitz-primary transition-colors group-hover:text-blitz-accent">
                        {next.title}
                      </h4>
                    </Link>
                  </m.div>
                )}
              </div>
            )}

            {/* CTA */}
            <Reveal className="mt-16 rounded-2xl bg-gradient-subtle p-8 text-center ring-1 ring-blitz-lavender/20 md:p-12">
              <h2 className="mb-3 text-2xl font-bold text-blitz-primary md:text-3xl">
                Enjoyed this article?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-blitz-charcoal/80">
                I write about web performance, AI-assisted development, and
                building things that scale. Let's connect.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/#contact" className="btn-primary">
                  Get in touch
                </Link>
                <a
                  href="https://www.linkedin.com/in/crisryantan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ArticleLayout

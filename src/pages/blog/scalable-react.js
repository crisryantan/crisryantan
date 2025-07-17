import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/SEO'

const ScalableReactPage = () => {
  return (
    <Layout>
      <Seo
        title="Building Scalable React Applications"
        description="Best practices and patterns for building maintainable React applications at scale."
      />

      <article className="py-20 bg-blitz-white min-h-screen">
        <div className="max-width-container section-padding">
          {/* Back Link */}
          <Link
            to="/#blog"
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
            Back to posts
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blitz-primary mb-6">
              Building Scalable React Applications
            </h1>
            <div className="flex flex-wrap items-center text-blitz-charcoal/60 text-sm mb-6">
              <time className="mr-4">March 15, 2024</time>
              <span className="mr-4">•</span>
              <span className="mr-4">5 min read</span>
              <span className="mr-4">•</span>
              <span className="bg-blitz-accent/10 text-blitz-soft px-3 py-1 rounded-full">
                React
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blitz">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2>Understanding Modern React Patterns</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum. Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem accusantium doloremque laudantium.
            </p>

            <p>
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
              quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem
              sequi nesciunt.
            </p>

            <h3>Component Architecture</h3>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam.
            </p>

            <blockquote>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </blockquote>

            <h3>State Management Strategies</h3>
            <p>
              Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae
              consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
              pariatur?
            </p>

            <ul>
              <li>
                At vero eos et accusamus et iusto odio dignissimos ducimus
              </li>
              <li>
                Qui blanditiis praesentium voluptatum deleniti atque corrupti
              </li>
              <li>Quos dolores et quas molestias excepturi sint occaecati</li>
              <li>Cupiditate non provident, similique sunt in culpa</li>
            </ul>

            <h2>Performance Optimization</h2>
            <p>
              Qui officia deserunt mollitia animi, id est laborum et dolorum
              fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus id quod maxime placeat facere possimus.
            </p>

            <p>
              Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
              autem quibusdam et aut officiis debitis aut rerum necessitatibus
              saepe eveniet ut et voluptates repudiandae sint et molestiae non
              recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
            </p>

            <h3>Testing Approaches</h3>
            <p>
              Ut aut reiciendis voluptatibus maiores alias consequatur aut
              perferendis doloribus asperiores repellat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-blitz-charcoal/10">
            <Link to="/#blog" className="btn-primary">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default ScalableReactPage

import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl md:text-9xl font-black gradient-text mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-blitz-primary mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-blitz-charcoal/70 mb-10">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
          <Link to="/#contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage

import React from 'react'
import { Link } from 'gatsby'
import { m } from 'motion/react'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import AuroraBackground from '../components/motion/AuroraBackground'
import MagneticButton from '../components/motion/MagneticButton'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      <AuroraBackground />
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-lg text-center"
      >
        <m.h1
          variants={item}
          className="mb-4 animate-shimmer bg-[length:200%_auto] text-7xl font-black gradient-text md:text-9xl"
        >
          404
        </m.h1>
        <m.h2
          variants={item}
          className="mb-6 text-2xl font-bold text-blitz-primary md:text-3xl"
        >
          Page Not Found
        </m.h2>
        <m.p variants={item} className="mb-10 text-lg text-blitz-charcoal/70">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </m.p>
        <m.div
          variants={item}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <MagneticButton>
            <Link to="/" className="btn-primary">
              Go Back Home
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/#contact" className="btn-secondary">
              Contact Me
            </Link>
          </MagneticButton>
        </m.div>
      </m.div>
    </section>
  </Layout>
)

export default NotFoundPage

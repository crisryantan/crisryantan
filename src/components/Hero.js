import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { m } from 'motion/react'
import AuroraBackground from './motion/AuroraBackground'
import MagneticButton from './motion/MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}
// Full `transform` strings (not x/y/scale) so Motion hands these to WAAPI and
// they run on the compositor instead of the main thread during hydration.
const item = {
  hidden: { opacity: 0, transform: 'translateY(24px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transitionEnd: { transform: 'none' },
    transition: { duration: 0.6, ease: EASE },
  },
}
const avatarVariants = {
  hidden: { opacity: 0, transform: 'scale(0.8)' },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transitionEnd: { transform: 'none' },
    transition: { duration: 0.7, ease: EASE },
  },
}

const Hero = () => {
  return (
    <section className="hero-timeline relative overflow-hidden bg-gradient-subtle pt-32 pb-20 md:pt-40 md:pb-28">
      <AuroraBackground />

      {/* Parallax-out is a scroll-driven CSS animation (global.css), not JS */}
      <div className="hero-parallax max-width-container section-padding">
        <m.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-8 text-center"
        >
          {/* Avatar */}
          <m.div variants={avatarVariants} className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full shadow-soft ring-4 ring-blitz-lavender/30 md:h-40 md:w-40">
              <StaticImage
                src="../assets/images/avatar.jpg"
                alt="Cris Ryan Tan"
                placeholder="blurred"
                layout="fixed"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 animate-bob rounded-full bg-blitz-accent" />
          </m.div>

          {/* Content */}
          <div className="mx-auto max-w-3xl space-y-6">
            <m.h1
              variants={item}
              className="text-4xl font-black text-blitz-primary md:text-6xl lg:text-7xl"
            >
              Hi, I'm{' '}
              <span className="gradient-text bg-[length:200%_auto] bg-right [@media(hover:hover)]:animate-shimmer">
                Cris Ryan Tan
              </span>
            </m.h1>

            <m.p
              variants={item}
              className="text-xl font-light leading-relaxed text-blitz-charcoal/80 md:text-2xl"
            >
              Senior Full-stack Engineer specializing in web performance
              optimization and AI-assisted development. I build high-performance
              applications and leverage AI to accelerate engineering
              productivity.
            </m.p>

            <m.div
              variants={item}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
              <MagneticButton>
                <Link to="/#contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </MagneticButton>
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Scroll indicator (outer handles centering, inner handles the bounce) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-nudge" aria-hidden="true">
          <svg
            className="h-6 w-6 text-blitz-lavender"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero

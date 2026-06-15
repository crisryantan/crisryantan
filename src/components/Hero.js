import React, { useRef } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react'
import AuroraBackground from './motion/AuroraBackground'
import MagneticButton from './motion/MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

const Hero = () => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Subtle parallax as the hero scrolls away — suppressed for reduced-motion users.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-subtle pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <AuroraBackground />

      <m.div
        style={{ y, opacity }}
        className="max-width-container section-padding"
      >
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
            <m.div
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blitz-accent"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </m.div>

          {/* Content */}
          <div className="mx-auto max-w-3xl space-y-6">
            <m.h1
              variants={item}
              className="text-4xl font-black text-blitz-primary md:text-6xl lg:text-7xl"
            >
              Hi, I'm{' '}
              <span className="gradient-text animate-shimmer bg-[length:200%_auto]">
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
      </m.div>

      {/* Scroll indicator (outer handles centering, inner handles the bounce) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
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
        </m.div>
      </div>
    </section>
  )
}

export default Hero

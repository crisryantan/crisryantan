import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-subtle">
      <div className="max-width-container section-padding">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blitz-lavender/30 shadow-soft">
              <StaticImage
                src="../assets/images/avatar.jpg"
                alt="Cris Ryan Tan"
                placeholder="blurred"
                layout="fixed"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blitz-accent rounded-full animate-float"></div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-blitz-primary">
              Hi, I'm <span className="gradient-text">Cris Ryan Tan</span>
            </h1>

            <p className="text-xl md:text-2xl text-blitz-charcoal/80 font-light leading-relaxed">
              Senior Full-stack Engineer specializing in building exceptional
              digital experiences. I design and develop high-performance web
              applications with modern technologies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/#contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-blitz-lavender"
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
      </div>
    </section>
  )
}

export default Hero

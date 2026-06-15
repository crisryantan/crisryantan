import React from 'react'
import Reveal from '../motion/Reveal'
import Stagger, { StaggerItem } from '../motion/Stagger'
import MagneticButton from '../motion/MagneticButton'

const Contact = () => (
  <section id="contact" className="py-20 bg-gradient-subtle">
    <div className="max-width-container section-padding">
      <Reveal
        as="h2"
        className="mb-16 text-center text-3xl font-bold text-blitz-primary md:text-4xl"
      >
        Let's Connect
      </Reveal>

      <div className="mx-auto max-w-2xl text-center">
        <Reveal
          as="p"
          className="mb-8 text-lg text-blitz-charcoal/80"
          delay={0.05}
        >
          I'm always interested in hearing about new opportunities, exciting
          projects, or just having a friendly chat about technology. Feel free
          to reach out!
        </Reveal>

        <Reveal
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          delay={0.1}
        >
          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/crisryantan/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume.pdf"
              className="btn-primary flex items-center justify-center sm:justify-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
          </MagneticButton>
        </Reveal>

        <Stagger
          className="mx-auto mt-12 grid max-w-md gap-6 sm:grid-cols-2"
          stagger={0.12}
        >
          <StaggerItem className="card-minimal p-6">
            <div className="mb-3 flex justify-center">
              <svg
                className="h-8 w-8 text-blitz-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            <h3 className="mb-2 text-center font-semibold text-blitz-primary">
              Location
            </h3>
            <p className="text-center text-blitz-charcoal/70">
              Sydney, Australia
            </p>
          </StaggerItem>
          <StaggerItem className="card-minimal p-6">
            <div className="mb-3 flex justify-center">
              <svg
                className="h-8 w-8 text-blitz-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-center font-semibold text-blitz-primary">
              Email
            </h3>
            <p className="text-center text-blitz-charcoal/70">
              crisryantan@gmail.com
            </p>
          </StaggerItem>
        </Stagger>
      </div>
    </div>
  </section>
)

export default Contact

import React from 'react'
import { m } from 'motion/react'
import Reveal from '../motion/Reveal'
import Stagger, { StaggerItem } from '../motion/Stagger'
import CheckIcon from '../CheckIcon'
import experience from '../../data/experience'

const Experience = () => (
  <section id="experience" className="py-20 bg-gradient-subtle">
    <div className="max-width-container section-padding">
      <Reveal
        as="h2"
        className="mb-16 text-center text-3xl font-bold text-blitz-primary md:text-4xl"
      >
        Experience
      </Reveal>

      <Stagger
        className="mx-auto max-w-4xl space-y-16"
        stagger={0.15}
        amount={0.1}
      >
        {experience.map((job) => (
          <StaggerItem key={`${job.company}-${job.period}`}>
            <m.div
              className="card p-8 transition-shadow hover:shadow-hover"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-blitz-primary">
                    {job.role}
                  </h3>
                  <p className="font-medium text-blitz-soft">
                    {job.company} - {job.location}
                  </p>
                </div>
                <span className="mt-2 text-sm text-blitz-charcoal/60 md:mt-0">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-4">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <CheckIcon />
                    <span className="text-blitz-charcoal/80">{bullet}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
)

export default Experience

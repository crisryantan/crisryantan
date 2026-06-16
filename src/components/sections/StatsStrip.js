import React from 'react'
import Stagger, { StaggerItem } from '../motion/Stagger'
import CountUp from '../motion/CountUp'

// Headline career metrics pulled together from the experience history. Kept to
// four so the band reads as a punchy summary, not a wall of numbers.
const stats = [
  { value: 10, suffix: '+', label: 'Years building for the web' },
  { value: 40, suffix: '%', label: 'Smaller script size' },
  { value: 75, suffix: '%', label: 'Cold-load reduction' },
  { value: 68, suffix: '%', label: 'Faster SSR page loads' },
]

const StatsStrip = () => (
  <section className="border-y border-blitz-lavender/20 bg-gradient-subtle py-14">
    <div className="max-width-container section-padding">
      <Stagger
        className="grid grid-cols-2 gap-8 md:grid-cols-4"
        stagger={0.12}
        amount={0.4}
      >
        {stats.map((s) => (
          <StaggerItem key={s.label} className="text-center">
            <p className="text-4xl font-black text-blitz-accent md:text-5xl">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-blitz-charcoal/70">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
)

export default StatsStrip

import React, { useRef } from 'react'
import { m, useInView } from 'motion/react'
import CountUp from './CountUp'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Before/after reduction chart. A faint full-length "before" bar sits behind a
 * solid "after" bar (both scaled to the largest before-value), so the cut is
 * obvious. Bars grow from the left on scroll-in and the reduction % counts up.
 *
 * Uses the useInView hook + a controlled `animate` prop (the pattern that works
 * across this site) rather than `whileInView`, which doesn't fire its entrance
 * under our LazyMotion setup. SSR renders the bars full (no-JS safe); on the
 * client they collapse on mount and grow when scrolled into view. Transform-only
 * (scaleX) so there's no layout thrash / CLS.
 */
const BeforeAfterBars = ({ items, unit = 'KB' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const max = Math.max(...items.map((i) => i.before))

  return (
    <div ref={ref} className="my-8 space-y-5">
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="font-mono text-blitz-primary">{it.label}</span>
            <span className="font-medium text-green-600">
              <CountUp value={it.reduction} suffix="% smaller" />
            </span>
          </div>
          <div className="relative h-7 overflow-hidden rounded bg-blitz-charcoal/5">
            <m.div
              className="absolute inset-y-0 left-0 origin-left rounded bg-blitz-lavender/25"
              style={{ width: `${(it.before / max) * 100}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              aria-hidden="true"
            />
            <m.div
              className="absolute inset-y-0 left-0 origin-left rounded bg-blitz-accent/70"
              style={{ width: `${(it.after / max) * 100}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 }}
            />
          </div>
          <div className="mt-1 text-right font-mono text-xs text-blitz-charcoal/60">
            {it.before} {unit} → {it.after} {unit}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BeforeAfterBars

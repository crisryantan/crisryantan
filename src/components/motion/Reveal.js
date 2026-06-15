import React, { useRef } from 'react'
import { m, useInView } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
}

/**
 * Scroll-reveal wrapper — the workhorse. Animates only opacity/transform (zero CLS).
 * Uses the standalone useInView hook (IntersectionObserver) so it works regardless of
 * the LazyMotion feature bundle. `once` keeps it from re-firing on scroll-back.
 */
const Reveal = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  ...rest
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const MotionTag = m[as] || m.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={VARIANTS[direction] || VARIANTS.up}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal

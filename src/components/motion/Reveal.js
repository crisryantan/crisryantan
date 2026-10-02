import React, { useRef } from 'react'
import { m, useInView } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

// Full `transform` strings rather than x/y/scale: Motion only hands `transform` and
// `opacity` to WAAPI, so these run on the compositor and never compete with the
// scroll that triggered them. `transitionEnd` drops the identity transform after,
// so a revealed block doesn't stay a stacking context.
const shown = (transform) => ({
  opacity: 1,
  transform,
  transitionEnd: { transform: 'none' },
})

const VARIANTS = {
  up: {
    hidden: { opacity: 0, transform: 'translateY(24px)' },
    visible: shown('translateY(0px)'),
  },
  down: {
    hidden: { opacity: 0, transform: 'translateY(-24px)' },
    visible: shown('translateY(0px)'),
  },
  left: {
    hidden: { opacity: 0, transform: 'translateX(24px)' },
    visible: shown('translateX(0px)'),
  },
  right: {
    hidden: { opacity: 0, transform: 'translateX(-24px)' },
    visible: shown('translateX(0px)'),
  },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, transform: 'scale(0.96)' },
    visible: shown('scale(1)'),
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

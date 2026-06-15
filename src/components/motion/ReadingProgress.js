import React from 'react'
import { m, useScroll, useSpring } from 'motion/react'

/**
 * Top-of-viewport reading-progress bar (blog articles). Tracks whole-page scroll
 * and scales on the X axis (transform only — cheap, no layout). Spring-smoothed.
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <m.div
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-blitz-soft via-blitz-accent to-blitz-coral"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

export default ReadingProgress

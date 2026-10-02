import React, { useEffect, useState } from 'react'
import { m, useScroll } from 'motion/react'

const BAR =
  'fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-blitz-soft via-blitz-accent to-blitz-coral'

const JsProgress = () => {
  const { scrollYProgress } = useScroll()
  return (
    <m.div
      className={BAR}
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  )
}

/**
 * Top-of-viewport reading-progress bar (blog articles). Where scroll timelines are
 * supported it is a pure CSS scroll-driven animation (global.css), so it runs on
 * the compositor with no JS on the scroll path. Elsewhere it falls back to a
 * Motion scroll value, transform only.
 */
const ReadingProgress = () => {
  const [useCss, setUseCss] = useState(true)

  useEffect(() => {
    if (!CSS.supports('animation-timeline: scroll()')) setUseCss(false)
  }, [])

  return useCss ? (
    <div className={`${BAR} reading-progress`} aria-hidden="true" />
  ) : (
    <JsProgress />
  )
}

export default ReadingProgress

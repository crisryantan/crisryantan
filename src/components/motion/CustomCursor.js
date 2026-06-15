import React, { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

/**
 * Pointer-following dual cursor (instant dot + trailing ring that grows over
 * interactive elements). Mounts client-side ONLY on fine pointers with motion
 * enabled — returns null otherwise (touch/reduced-motion get the native cursor).
 * Adds `has-custom-cursor` to <html> so global.css hides the native cursor.
 *
 * Nested structure separates transforms: the outer m.div is positioned by the
 * motion x/y values, the inner div handles -50%/-50% centering — avoids the
 * classic "motion x/y overwrites Tailwind translate" conflict.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE))
        setHovering(true)
    }
    const out = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE))
        setHovering(false)
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blitz-accent" />
      </m.div>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        <m.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-blitz-soft/70"
          animate={{
            width: hovering ? 48 : 28,
            height: hovering ? 48 : 28,
            opacity: hovering ? 1 : 0.6,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        />
      </m.div>
    </>
  )
}

export default CustomCursor

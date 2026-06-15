import React, { useRef } from 'react'
import { m, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/**
 * Wraps any child (Gatsby <Link>, <a>, <button>) in a magnetic hover effect:
 * the element eases toward the pointer and springs back on leave. No-ops for
 * reduced-motion users; mousemove never fires on touch, so it's pointer-safe.
 */
const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  ...rest
}) => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  )
}

export default MagneticButton

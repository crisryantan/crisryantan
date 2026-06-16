import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const format = (n, decimals) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/**
 * Counts a number up from 0 to `value` when it scrolls into view.
 *
 * SSR / no-JS / reduced-motion safe: the server renders the FINAL value (correct
 * for crawlers and users without JS). Only on the client, with motion enabled, do
 * we drop to 0 before first paint (isomorphic layout effect → no flash) and then
 * animate up once the element is in view.
 */
const CountUp = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useIsoLayoutEffect(() => {
    if (!reduce) setDisplay(0)
  }, [reduce])

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, reduce, duration])

  return (
    <span ref={ref} className={`tabular-nums ${className || ''}`}>
      {prefix}
      {format(display, decimals)}
      {suffix}
    </span>
  )
}

export default CountUp

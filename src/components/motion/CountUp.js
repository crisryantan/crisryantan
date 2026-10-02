import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

// One formatter per precision: toLocaleString with options builds a new
// Intl.NumberFormat on every call, which adds up at one call per frame.
const formatters = {}
const format = (n, decimals) => {
  formatters[decimals] ||= new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return formatters[decimals].format(n)
}

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
  const numRef = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useIsoLayoutEffect(() => {
    if (!reduce) setDisplay(0)
  }, [reduce])

  useEffect(() => {
    if (!inView || reduce) return
    let shown = ''
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      // Write the text node directly rather than re-rendering React every frame,
      // and only when the digits change: each write dirties layout, and the count
      // runs exactly while the user is scrolling past it.
      onUpdate: (v) => {
        const next = format(v, decimals)
        if (next === shown || !numRef.current) return
        numRef.current.textContent = next
        shown = next
      },
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, value, reduce, duration, decimals])

  return (
    <span ref={ref} className={`tabular-nums ${className || ''}`}>
      {prefix}
      <span ref={numRef}>{format(display, decimals)}</span>
      {suffix}
    </span>
  )
}

export default CountUp

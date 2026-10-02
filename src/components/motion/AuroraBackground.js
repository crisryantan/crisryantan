import React from 'react'

// Each box is 1.5x the visible blob (the gradient fades to nothing at its edge),
// offset so the blob centres sit where the old 60/55/50svh blurred circles did.
const BLOBS = [
  {
    color: '--blitz-accent',
    opacity: 0.2,
    style: {
      left: 'calc(-25% - 15svh)',
      top: 'calc(-33.333% - 15svh)',
      width: '90svh',
      height: '90svh',
    },
  },
  {
    color: '--blitz-soft',
    opacity: 0.2,
    delay: '-6s',
    style: {
      right: '-13.75svh',
      top: 'calc(25% - 13.75svh)',
      width: '82.5svh',
      height: '82.5svh',
    },
  },
  {
    color: '--blitz-coral',
    opacity: 0.1,
    delay: '-12s',
    style: {
      bottom: '-12.5svh',
      left: 'calc(33.333% - 12.5svh)',
      width: '75svh',
      height: '75svh',
    },
  },
]

/**
 * Atmospheric animated gradient blobs in the blitz palette. Pure CSS (the `aurora`
 * keyframe lives in tailwind.config.js, the gradient in global.css); the
 * reduced-motion safety net in global.css freezes it.
 *
 * The soft edge comes from a radial gradient rather than `filter: blur()`, so each
 * blob is rasterized once and the animation is transform-only on the compositor.
 * Sized in `svh` so the mobile URL bar showing/hiding never resizes them.
 * Decorative + pointer-safe; needs a `relative` parent.
 */
const AuroraBackground = ({ className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    {BLOBS.map((b) => (
      <div
        key={b.color}
        className="aurora-blob absolute animate-aurora will-change-transform"
        style={{
          ...b.style,
          '--blob': `var(${b.color})`,
          opacity: b.opacity,
          animationDelay: b.delay,
        }}
      />
    ))}
  </div>
)

export default AuroraBackground

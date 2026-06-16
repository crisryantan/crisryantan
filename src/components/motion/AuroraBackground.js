import React from 'react'

/**
 * Atmospheric animated gradient blobs in the blitz palette. Pure CSS (the `aurora`
 * keyframe lives in tailwind.config.js); the reduced-motion safety net in
 * global.css freezes it.
 *
 * Mobile flicker fix: blobs are sized in `svh` (small-viewport-height), which does
 * NOT change when the mobile URL bar shows/hides — so scrolling no longer resizes
 * and repaints them. Each blob sits on its own GPU layer (`will-change-transform`)
 * so it composites during scroll instead of repainting. With that in place the
 * animation runs on every screen size. Decorative + pointer-safe; needs a
 * `relative` parent.
 */
const AuroraBackground = ({ className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <div className="absolute -left-1/4 -top-1/3 h-[60svh] w-[60svh] rounded-full bg-blitz-accent/20 blur-3xl animate-aurora will-change-transform" />
    <div className="absolute right-0 top-1/4 h-[55svh] w-[55svh] rounded-full bg-blitz-soft/20 blur-3xl animate-aurora [animation-delay:-6s] will-change-transform" />
    <div className="absolute bottom-0 left-1/3 h-[50svh] w-[50svh] rounded-full bg-blitz-coral/10 blur-3xl animate-aurora [animation-delay:-12s] will-change-transform" />
  </div>
)

export default AuroraBackground

import React from 'react'

/**
 * Atmospheric animated gradient blobs in the blitz palette. Pure CSS (the `aurora`
 * keyframe lives in tailwind.config.js) so it costs no JS and the reduced-motion
 * safety net in global.css freezes it automatically. Decorative + pointer-safe.
 * Place inside a `relative` container; it fills and sits behind content.
 */
const AuroraBackground = ({ className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <div className="absolute -left-1/4 -top-1/3 h-[60vh] w-[60vh] rounded-full bg-blitz-accent/20 blur-3xl animate-aurora will-change-transform" />
    <div className="absolute right-0 top-1/4 h-[55vh] w-[55vh] rounded-full bg-blitz-soft/20 blur-3xl animate-aurora [animation-delay:-6s] will-change-transform" />
    <div className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full bg-blitz-coral/10 blur-3xl animate-aurora [animation-delay:-12s] will-change-transform" />
  </div>
)

export default AuroraBackground

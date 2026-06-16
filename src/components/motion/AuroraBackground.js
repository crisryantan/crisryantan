import React from 'react'

/**
 * Atmospheric gradient blobs in the blitz palette. Pure CSS (the `aurora` keyframe
 * lives in tailwind.config.js) so it costs no JS, and the reduced-motion safety net
 * in global.css freezes it. The animation + layer-promotion are gated to `md+`:
 * animating a large blur on weaker mobile GPUs caused intermittent flicker, so
 * mobile shows static blobs. Decorative + pointer-safe; place in a `relative` parent.
 */
const AuroraBackground = ({ className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <div className="absolute -left-1/4 -top-1/3 h-[60vh] w-[60vh] rounded-full bg-blitz-accent/20 blur-3xl md:animate-aurora md:will-change-transform" />
    <div className="absolute right-0 top-1/4 h-[55vh] w-[55vh] rounded-full bg-blitz-soft/20 blur-3xl md:animate-aurora [animation-delay:-6s] md:will-change-transform" />
    <div className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full bg-blitz-coral/10 blur-3xl md:animate-aurora [animation-delay:-12s] md:will-change-transform" />
  </div>
)

export default AuroraBackground

import React from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'

/**
 * App-wide motion context (mounted once via wrapRootElement).
 *
 * - LazyMotion + `domAnimation` lazy-loads only the animation/gesture/exit feature
 *   set (~18kb) instead of the full bundle — every component must use `m.*`, never
 *   `motion.*`. `strict` turns an accidental `motion.*` into a loud dev error.
 * - MotionConfig reducedMotion="user" makes all transform/layout animations honour
 *   the OS "reduce motion" setting automatically.
 */
const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
)

export default MotionProvider

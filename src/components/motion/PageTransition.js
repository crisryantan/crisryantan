import React from 'react'
import { m } from 'motion/react'

/**
 * Per-route enter/exit wrapper. Used inside <AnimatePresence mode="wait"> in
 * gatsby-browser/gatsby-ssr wrapPageElement, keyed on location.pathname. Kept
 * short (350ms) so route changes feel instant. Transform/opacity only.
 */
const PageTransition = ({ children }) => (
  <m.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </m.div>
)

export default PageTransition

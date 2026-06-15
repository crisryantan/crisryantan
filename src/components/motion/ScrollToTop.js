import React, { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'motion/react'

/**
 * Animated back-to-top FAB. Appears after scrolling past 600px, springs in/out
 * via AnimatePresence. Mounted globally (wrapRootElement).
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          key="scroll-to-top"
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-blitz-primary text-blitz-white shadow-hover ring-1 ring-white/10"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop

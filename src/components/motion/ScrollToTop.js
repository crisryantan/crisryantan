import React, { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'motion/react'

/**
 * Animated back-to-top FAB. Appears after scrolling past 600px, springs in/out
 * via AnimatePresence. Mounted globally (wrapRootElement). Animates full
 * `transform` strings so the entrance, which happens mid-scroll, stays on the
 * compositor.
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
          initial={{ opacity: 0, transform: 'translateY(12px) scale(0.6)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          exit={{ opacity: 0, transform: 'translateY(12px) scale(0.6)' }}
          whileHover={{ transform: 'translateY(-3px) scale(1)' }}
          whileTap={{ transform: 'translateY(0px) scale(0.92)' }}
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

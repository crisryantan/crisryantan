import React from 'react'
import { AnimatePresence } from 'motion/react'
import { ThemeProvider } from './src/context/ThemeContext'
import MotionProvider from './src/components/motion/MotionProvider'
import PageTransition from './src/components/motion/PageTransition'
import CustomCursor from './src/components/motion/CustomCursor'
import ScrollToTop from './src/components/motion/ScrollToTop'

/**
 * Shared Gatsby element wrappers, imported by BOTH gatsby-browser.js and
 * gatsby-ssr.js so the server and client trees are identical (a mismatch here
 * is the usual cause of hydration warnings).
 *
 * - wrapRootElement: mounted once, persists across navigations → theme + motion
 *   context and the global overlays (custom cursor, back-to-top) live here.
 * - wrapPageElement: re-keyed per route so AnimatePresence can run exit/enter
 *   transitions on navigation.
 */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MotionProvider>
      {element}
      <CustomCursor />
      <ScrollToTop />
    </MotionProvider>
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <AnimatePresence mode="wait" initial={false}>
    <PageTransition key={props.location.pathname}>{element}</PageTransition>
  </AnimatePresence>
)

import React from 'react'
import { m, AnimatePresence } from 'motion/react'
import { useTheme } from '../context/ThemeContext'

const SunIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
    />
  </svg>
)

const MoonIcon = () => (
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
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
    />
  </svg>
)

/**
 * Animated light/dark switch. Renders empty until `mounted` so SSR and the first
 * client render agree (the actual theme isn't known on the server) — then the
 * sun/moon icon cross-fades + rotates in.
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, mounted, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-blitz-charcoal transition-colors duration-200 hover:bg-blitz-sand/50 hover:text-blitz-primary ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <m.span
            key={isDark ? 'moon' : 'sun'}
            className="flex"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </m.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle

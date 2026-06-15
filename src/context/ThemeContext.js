import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

const ThemeContext = createContext({
  theme: 'light',
  mounted: false,
  toggleTheme: () => {},
})

/**
 * Reads the theme that the blocking no-FOUC script (gatsby-ssr.js onRenderBody)
 * already applied to <html> before paint, so the React tree initializes in sync
 * with the DOM — no flash, no hydration mismatch. `mounted` lets theme-dependent
 * UI (e.g. the sun/moon toggle) render a stable placeholder during SSR/first paint.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
    setMounted(true)
  }, [])

  const applyTheme = useCallback((next) => {
    setTheme(next)
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch (e) {
      /* localStorage unavailable (private mode) — non-fatal */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext

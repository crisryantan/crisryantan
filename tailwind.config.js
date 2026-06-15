/** @type {import('tailwindcss').Config} */

// The blitz palette is driven by CSS variables (space-separated RGB channels defined
// in src/styles/global.css for :root and .dark). Using `rgb(var(--x) / <alpha-value>)`
// keeps every existing `text-blitz-*` / `bg-blitz-*` utility — and its opacity modifier
// (e.g. text-blitz-charcoal/80) — working unchanged while letting dark mode swap the
// underlying values with no per-component edits.
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blitz: {
          primary: withVar('--blitz-primary'), // deep navy (light) / near-white (dark) — headings
          accent: withVar('--blitz-accent'), // electric cyan
          soft: withVar('--blitz-soft'), // teal
          coral: withVar('--blitz-coral'), // coral accent
          sand: withVar('--blitz-sand'), // warm neutral surface (light) / elevated surface (dark)
          charcoal: withVar('--blitz-charcoal'), // body text
          lavender: withVar('--blitz-lavender'), // highlight/divider
          white: withVar('--blitz-white'), // page background
          'primary-light': withVar('--blitz-primary-light'),
          'coral-light': withVar('--blitz-coral-light'),
          'sand-light': withVar('--blitz-sand-light'),
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Fira Code',
          'Consolas',
          'Monaco',
          'Andale Mono',
          'Ubuntu Mono',
          'monospace',
        ],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        float: 'float 6s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'gradient-pan': 'gradientPan 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -4%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.96)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        hover:
          '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
        glow: '0 0 0 1px rgb(var(--blitz-accent) / 0.18), 0 8px 40px -8px rgb(var(--blitz-accent) / 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

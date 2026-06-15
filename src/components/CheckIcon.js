import React from 'react'

/**
 * Filled check-circle used throughout the experience bullets. Replaces the SVG
 * that was inlined dozens of times across the home page.
 */
const CheckIcon = ({
  className = 'w-5 h-5 text-blitz-soft mt-1 mr-3 flex-shrink-0',
}) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

export default CheckIcon

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'

export { wrapRootElement, wrapPageElement } from './gatsby-wrappers'

// Blocking, synchronous inline script injected into <head>. Runs before the body
// paints, so the correct theme class is on <html> with no flash of the wrong theme.
// ThemeContext reads this class on mount, keeping React in sync with the DOM.
const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="theme-no-flash"
      dangerouslySetInnerHTML={{ __html: noFlashThemeScript }}
    />,
  ])
}

module.exports = {
  siteMetadata: {
    title: 'Cris Ryan Tan - Senior Software Engineer',
    titleTemplate: '%s | Cris Ryan Tan',
    author: 'Cris Ryan Tan',
    description:
      'Senior Software Engineer specializing in modern web technologies. Co-founder of Blitzstack.io. Expert in React, TypeScript, and full-stack development.',
    url: 'https://crisryantan.com',
    siteUrl: 'https://crisryantan.com',
    image: '/og-image.png',
    twitterUsername: '@crisryantan',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Cris Ryan Tan - Senior Software Engineer Portfolio',
        short_name: 'CRT Portfolio',
        start_url: '/',
        background_color: '#111827',
        theme_color: '#0A2540',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png',
        legacy: true, // This prevents the non-square icon warning
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-offline',
  ],
}

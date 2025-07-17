import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, image, article }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          url
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `)

  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: `${site.siteMetadata.siteUrl}${image || site.siteMetadata.image}`,
    url: site.siteMetadata.siteUrl,
  }

  const schemaOrgJSONLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Cris Ryan Tan',
      url: site.siteMetadata.url,
      image: seo.image,
      sameAs: [
        'https://twitter.com/crisryantan',
        'https://github.com/xxryan1234',
        'https://www.linkedin.com/in/crisryantan/',
      ],
      jobTitle: 'Senior Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Blitzstack.io',
      },
      description: site.siteMetadata.description,
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Web Development',
        'Software Engineering',
        'Frontend Development',
        'Full Stack Development',
      ],
    },
  ]

  if (article) {
    schemaOrgJSONLD.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      url: seo.url,
      title: seo.title,
      image: seo.image,
      description: seo.description,
      author: {
        '@type': 'Person',
        name: 'Cris Ryan Tan',
      },
    })
  }

  return (
    <Helmet title={seo.title} titleTemplate={site.siteMetadata.titleTemplate}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="Cris Ryan Tan" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata.twitterUsername}
      />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={seo.url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* Favicons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0A2540" />
    </Helmet>
  )
}

export default Seo

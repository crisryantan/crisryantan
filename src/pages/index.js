import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import Hero from '../components/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import BlogPreview from '../components/sections/BlogPreview'
import Contact from '../components/sections/Contact'

const HomePage = () => (
  <Layout>
    <Seo title="Home" />
    <Hero />
    <About />
    <Experience />
    <BlogPreview />
    <Contact />
  </Layout>
)

export default HomePage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React from 'react'

import Footer from './Footer'
import avatar from '../assets/images/avatar.jpg'

const Header = () => (
  <header id="header">
    <div className="inner">
      <a href="#" className="image avatar">
        <img src={avatar} alt="" />
      </a>
      <h1>
        <strong>I am Cris Ryan Tan</strong>, Software Engineer
        <br />
        {' '}and Entrepreneur.{' '}
        <br />
        <div>
          Co-founder of <a href="http://Blitzstack.io">Blitzstack.io</a>.
        </div>
      </h1>
    </div>
    <Footer />
  </header>
)

export default Header

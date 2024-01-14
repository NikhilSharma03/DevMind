import React from 'react'
import './Footer.css'
import NavItem from './../NavItem/NavItem'

function Footer() {
  return (
    <footer className="footer__container">
      <h1 className="footer__title">
        DEV<span>MIND</span>
      </h1>
      <h1 className="footer__credit">
        Made With &#10084; By {''}
        <span>
          <a
            target="_blank"
            className="footer__name"
            href="https://github.com/NikhilSharma03"
          >
            Nikhil
          </a>
        </span>
      </h1>
    </footer>
  )
}

export default Footer

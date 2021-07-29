import React from "react";
import "./Footer.css";
import NavItem from "./../NavItem/NavItem";

function Footer() {
  return (
    <footer className="footer__container">
      <h1 className="footer__title">
        DEV<span>MIND</span>
      </h1>
      <ul className="nav__ul footer__ul">
        <NavItem href="/feed">Feed</NavItem>
        <NavItem href="/create_post">Create</NavItem>
        <NavItem href="/create_post">About</NavItem>
        <NavItem href="/my_profile">Profile</NavItem>
      </ul>
      <h1 className="footer__credit">
        Made With &#10084; By {""}
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
  );
}

export default Footer;

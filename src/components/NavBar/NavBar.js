import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import NavList from "./../NavList/NavList";

const NavBar = () => {
  return (
    <header className="navbar__main">
      <h1 className="navbar__title">
        <Link to="/">
          DEV<span>MIND</span>
        </Link>
      </h1>
      <div class="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>
      </div>
      <nav className="navbar__nav">
        <NavList />
      </nav>
    </header>
  );
};

export default NavBar;

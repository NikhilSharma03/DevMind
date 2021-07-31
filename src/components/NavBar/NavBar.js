import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import NavList from "./../NavList/NavList";

const NavBar = (props) => {
  return (
    <header className="navbar__main">
      <h1 className="navbar__title">
        <Link to="/">
          DEV<span>MIND</span>
        </Link>
      </h1>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label
          className="menu__btn"
          htmlFor="menu__toggle"
          onClick={props.toggleSD}
        >
          <span className={props.sd ? "active" : ""}></span>
        </label>
      </div>
      <nav className="navbar__nav">
        <NavList />
      </nav>
    </header>
  );
};

export default NavBar;

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
      {/* <div>SD BTN</div> */}
      <nav className="navbar__nav">
        <NavList />
      </nav>
    </header>
  );
};

export default NavBar;

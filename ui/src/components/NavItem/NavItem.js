import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

const NavItem = (props) => {
  return (
    <li className={`nav__list--li ${props.login ? "nav__list--login" : ""}`}>
      <NavLink to={props.href} exact={true}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;

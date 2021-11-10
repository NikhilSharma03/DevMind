import React from "react";
import "./NavList.css";
import NavItem from "./../NavItem/NavItem";

const NavList = () => {
  return (
    <ul className="nav__ul">
      <NavItem href="/feed">Feed</NavItem>
      <NavItem href="/create_post">Create</NavItem>
      <NavItem href="/create_post">About</NavItem>
      <NavItem href="/my_profile">Profile</NavItem>
      <NavItem href="/login" login={true}>
        LOGIN
      </NavItem>
    </ul>
  );
};

export default NavList;

import React from "react";
import "./NavList.css";
import NavItem from "./../NavItem/NavItem";
import { useSelector } from "react-redux";

const NavList = (props) => {
  const token = useSelector(state => state.user.token)

  return (
    <ul className="nav__ul">
      {token && <NavItem href="/feed">Feed</NavItem>}
      {token && <NavItem href="/create_post">Create</NavItem>}
      {token && <NavItem href="/my_profile">Profile</NavItem>}
      <NavItem href={token ? "/logout" : "/login"} login={true}>
        {token ? "LOGOUT" : "LOGIN"}
      </NavItem>
    </ul>
  );
};

export default NavList;

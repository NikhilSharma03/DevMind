import React from "react";
import "./NavList.css";
import NavItem from "./../NavItem/NavItem";
import { useSelector, useDispatch } from "react-redux";

const NavList = () => {
  const token = useSelector(state => state.user.token)

  return (
    <ul className="nav__ul">
      <NavItem href="/feed">Feed</NavItem>
      <NavItem href="/create_post">Create</NavItem>
      <NavItem href="/my_profile">Profile</NavItem>
      <NavItem href={token ? "/logout" : "/login"} login={true}>
        {token ? "LOGOUT" : "LOGIN"}
      </NavItem>
    </ul>
  );
};

export default NavList;

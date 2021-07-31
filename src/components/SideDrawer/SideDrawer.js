import React from "react";
import "./SideDrawer.css";
import NavItem from "./../NavItem/NavItem";

function SideDrawer(props) {
  return (
    <div
      onClick={props.toggleSD}
      className="sidedrawer__container"
      style={{
        transform: props.sdOpen ? "translateX(0)" : "translateX(-110%)",
      }}
    >
      <div className="sidedrawer__profile">
        <div>Image</div>
        <div>Name</div>
        <div>Posts</div>
      </div>
      <nav className="sidedrawer__nav">
        <ul className="sd__nav--ul">
          <NavItem href="/feed">Feed</NavItem>
          <NavItem href="/create_post">Create</NavItem>
          <NavItem href="/create_post">About</NavItem>
          <NavItem href="/my_profile">Profile</NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;

import React from "react";
import "./SideDrawer.css";
import NavItem from "./../NavItem/NavItem";
import ImageSource from "./../../shared/ImageSource";

function SideDrawer(props) {
  return (
    <div
      className="sidedrawer__container"
      style={{
        transform: props.sdOpen ? "translateX(0)" : "translateX(-110%)",
      }}
    >
      <div className="sidedrawer__profile">
        <figcaption className="sd__profile--imgcont">
          <img src={demo} alt="profile" />
        </figcaption>
        <h1>Name</h1>
        <p>Posts</p>
      </div>
      <nav className="sidedrawer__nav">
        <ul onClick={props.toggleSD} className="sd__nav--ul">
          <NavItem href="/feed">
            <img src={ImageSource.sdFeed} alt="icons" />
            Feed
          </NavItem>
          <NavItem href="/create_post">
            <img src={} alt="icons" />
            Create
          </NavItem>
          <NavItem href="/create_post">
            <img src={} alt="icons" />
            About
          </NavItem>
          <NavItem href="/my_profile">
            <img src={} alt="icons" />
            Profile
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;

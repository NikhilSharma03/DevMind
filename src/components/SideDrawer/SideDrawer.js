import React from "react";
import "./SideDrawer.css";
import NavItem from "./../NavItem/NavItem";
import demo from "./../../IMG_20210111_154928.jpg";

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
            <img src="https://library.kissclipart.com/20181003/ljw/kissclipart-newspaper-symbol-clipart-web-feed-computer-icons-c-1a86e09e4c082e0e.png" />
            Feed
          </NavItem>
          <NavItem href="/create_post">
            <img src="https://library.kissclipart.com/20181003/ljw/kissclipart-newspaper-symbol-clipart-web-feed-computer-icons-c-1a86e09e4c082e0e.png" />
            Create
          </NavItem>
          <NavItem href="/create_post">
            <img src="https://library.kissclipart.com/20181003/ljw/kissclipart-newspaper-symbol-clipart-web-feed-computer-icons-c-1a86e09e4c082e0e.png" />
            About
          </NavItem>
          <NavItem href="/my_profile">
            <img src="https://library.kissclipart.com/20181003/ljw/kissclipart-newspaper-symbol-clipart-web-feed-computer-icons-c-1a86e09e4c082e0e.png" />
            Profile
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;

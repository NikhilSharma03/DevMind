import React from "react";
import "./SideDrawer.css";
import NavItem from "./../NavItem/NavItem";
import { useSelector } from "react-redux"
import ImageSource from "./../../shared/ImageSource"

function SideDrawer(props) {
  const username = useSelector(state => state.user.username)
  const email = useSelector(state => state.user.email)
  const profileImage = useSelector(state => state.user.profileImage)

  return (
    <div
      className="sidedrawer__container"
      style={{
        transform: props.sdOpen ? "translateX(0)" : "translateX(-110%)",
      }}
    >
      <div className="sidedrawer__profile">
        <figcaption className="sd__profile--imgcont">
          <img src={process.env.REACT_APP_IMAGE_PATH+profileImage} alt="profile" />
        </figcaption>
        <h1>{username}</h1>
        <p>{email}</p>
      </div>
      <nav className="sidedrawer__nav">
        <ul onClick={props.toggleSD} className="sd__nav--ul">
          <NavItem href="/feed">
            <img src={ImageSource.sdFeed} alt="icons" />
            Feed
          </NavItem>
          <NavItem href="/create_post">
            <img src={ImageSource.sdPost} alt="icons" />
            Create
          </NavItem>
          <NavItem href="/my_profile">
            <img src={ImageSource.sdProfile} alt="icons" />
            Profile
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;

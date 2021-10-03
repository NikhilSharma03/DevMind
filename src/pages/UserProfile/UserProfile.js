import React from "react";
import "./UserProfile.css";
import ImgSrc from "./../../shared/ImageSource";
import PostCard from "./../../components/PostCard/PostCard";

const UserProfile = () => {
  return (
    <section className="userprofile__container">
      <div className="userprofile__header">
        <div className="userprofile__header--container">
          <figcaption className="userprofile__header--image">
            <img src={ImgSrc.sdProfile} alt="user image" />
          </figcaption>
          <h1>User Name</h1>
        </div>
        <button className="userprofile__header--btn">Edit Button</button>
      </div>
      <div className="userprofile__main">
        <div className="userprofile__info">User Info</div>
        <div className="userprofile__posts">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

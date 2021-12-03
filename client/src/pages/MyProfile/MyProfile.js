import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import PostCard from "./../../components/PostCard/PostCard";
import { useSelector } from "react-redux"
import { Redirect } from "react-router";

const MyProfile = (props) => {
  const token = useSelector(state => state.user.token)
  const email = useSelector(state => state.user.email)
  const bio = useSelector(state => state.user.bio)
  const username = useSelector(state => state.user.username)
  const profileImage = useSelector(state => state.user.profileImage)
  const posts = useSelector(state => state.user.posts)

  if(!token) {
    return <Redirect to="/signup" />
  }

  return (
    <section className="userprofile__container">
      <React.Fragment>
      <div className="userprofile__header">
        <div className="userprofile__header--container">
          <figcaption className="userprofile__header--image">
            <img semailrc={"http://localhost:5000/"+profileImage} alt="user image" />
          </figcaption>
          <h1>{username}</h1>
        </div>
        <button className="userprofile__header--btn">Edit Button</button>
      </div>
      <div className="userprofile__main">
        <div className="userprofile__info">
          <div className="userprofile__info--container">
            <h1>Bio</h1>
            <p>{bio}</p>
          </div>

          <div className="userprofile__info--container">
            <h1>Email</h1>
            <p>{email}</p>
          </div>
        </div>

        <div className="userprofile__posts">
          {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard />)}
        </div>
      </div>
      </React.Fragment>
    </section>
  );
};

export default MyProfile;

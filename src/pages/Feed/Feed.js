import React from "react";
import "./Feed.css";
import PostCard from "./../../components/PostCard/PostCard";


const Feed = () => {
  return <section className="feed__container">
    <h1 className="feed__container--head">Your Feed</h1>
    <PostCard />
    <PostCard />
    <PostCard />
  </section>;
};

export default Feed;

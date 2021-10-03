import React from "react";
import "./PostCard.css";
import Src from "./../../shared/ImageSource";

const PostCard = () => {
  return (
    <div className="postcard__container">
      <div className="postcard__container--username">
        <figcaption className="postcard__username--image">
          <img src={Src.sdProfile} alt="Post Image" />
        </figcaption>
        <h1>UserName</h1>
      </div>
      <div className="postcard__container--content">
        <p className="postcard__content--para">
          Paraphrasing-Tool uses intelligent, decision making software to figure
        </p>
        <figcaption className="postcard__content--image">
          <img src={Src.homeBanner} alt="Post Image" />
        </figcaption>
      </div>
      <div className="postcard__container--actionbtns">
        <div>
          <label>Like (3)</label>
        </div>
        <div>
          <label>Comment (2)</label>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

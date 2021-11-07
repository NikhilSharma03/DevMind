import React, { useState } from "react";
import "./PostCard.css";
import Src from "./../../shared/ImageSource";
import SvgSrc from "./../../shared/SvgSrc";
import DeleteModal from './../Modal/DeleteModal'

const PostCard = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  const onDeleteHandler = () => {
    scrollToTop()
    setShowDeleteModal(true)
  }


  return (
    <div className="postcard__container">
      <DeleteModal showModal={showDeleteModal} onClose={() => setShowDeleteModal(false)}/>
      <div className="postcard__container--topbar">
        <div className="postcard__container--username">
          <figcaption className="postcard__username--image">
            <img src={Src.sdProfile} alt="Post Image" />
          </figcaption>
          <h1>UserName</h1>
        </div>
        <div className="postcard__container--topbar__delete" onClick={onDeleteHandler}>
          <SvgSrc.Delete/>
        </div>
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
        <div className="postcard__actionbtns--main">
          <SvgSrc.Heart />
          <span>3</span>
        </div>
        <div className="postcard__actionbtns--main">
          <SvgSrc.Comment />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

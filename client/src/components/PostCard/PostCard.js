import React, { useState } from "react";
import "./PostCard.css";
import Src from "./../../shared/ImageSource";
import SvgSrc from "./../../shared/SvgSrc";
import DeleteModal from './../Modal/DeleteModal'

const PostCard = ({postDetails, creator}) => {
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
          <h1>{creator}</h1>
        </div>
        <div className="postcard__container--topbar__delete" onClick={onDeleteHandler}>
          <SvgSrc.Delete/>
        </div>
      </div>
      <div className="postcard__container--content">
        <p className="postcard__content--para">
          {postDetails.content}
        </p>
        {postDetails.imageURL &&
        <figcaption className="postcard__content--image">
           <img src={`http://localhost:5000/${postDetails.imageURL}`} alt="Post Image" />
        </figcaption>}
      </div>
      <div className="postcard__container--actionbtns">
        <div className="postcard__actionbtns--main">
          <SvgSrc.Heart />
          <span>{postDetails.likes.length}</span>
        </div>
        <div className="postcard__actionbtns--main">
          <SvgSrc.Comment />
          <span>{postDetails.comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

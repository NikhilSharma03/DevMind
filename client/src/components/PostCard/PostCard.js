import React, { useState } from "react";
import "./PostCard.css";
import Src from "./../../shared/ImageSource";
import SvgSrc from "./../../shared/SvgSrc";
import DeleteModal from './../Modal/DeleteModal'
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PostCard = ({postDetails, creator}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const token = useSelector(state => state.user.token)
  const userID = useSelector(state => state.user.id)

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

  const deletePostHandler = () => {
    axios.delete(process.env.REACT_APP_API+"/posts/"+postDetails._id, { headers: {token: "Bearer "+token}}).then(res => {
      window.location.reload(false);
    }).catch(err => {
      console.log(err)
    })
    setShowDeleteModal(false)
    
  }

  return (
    <div className="postcard__container">
      <DeleteModal showModal={showDeleteModal} onDelete={deletePostHandler} onClose={() => setShowDeleteModal(false)}/>
      <div className="postcard__container--topbar">
        <div className="postcard__container--username">
          <figcaption className="postcard__username--image">
            <img src={Src.sdProfile} alt="Post Image" />
          </figcaption>
          <h1>{creator}</h1>
        </div>
        {
          userID === postDetails.creator._id && (
           <div className="postcard__container--topbar__delete" >
            <Link to={`/update_post/${postDetails._id}`}>
              <SvgSrc.Edit/>
            </Link>
            <div onClick={onDeleteHandler} style={{cursor: "pointer"}}>
              <SvgSrc.Delete/>
            </div>
           </div>
        )}
      </div>
      <div className="postcard__container--content">
        <p className="postcard__content--para">
          {postDetails.content}
        </p>
        {postDetails.imageURL &&
        <figcaption className="postcard__content--image">
           <img src={process.env.REACT_APP_IMAGE_PATH + postDetails.imageURL} alt="Post Image" />
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

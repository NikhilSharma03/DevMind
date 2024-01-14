import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './PostCard.css'

import DeleteModal from './../Modal/DeleteModal'

import SvgSrc from './../../shared/SvgSrc'

const PostCard = ({ isAuthor, likeHandler, data, hideLikesComments }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const token = useSelector((state) => state.user.token)
  const userID = useSelector((state) => state.user.id)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const onDeleteHandler = () => {
    scrollToTop()
    setShowDeleteModal(true)
  }

  const deletePostHandler = () => {
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/api/v1/post/' + data._id, {
        headers: { authorization: 'Bearer ' + token },
      })
      .then((_) => {
        window.location.reload(false)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })

    setShowDeleteModal(false)
  }

  return (
    <div className="postcard__container">
      <DeleteModal
        showModal={showDeleteModal}
        onDelete={deletePostHandler}
        onClose={() => setShowDeleteModal(false)}
      />
      <div className="postcard__container--topbar">
        <div className="postcard__container--username">
          <Link to={`/profile/${data.user._id}`}>
            <figcaption className="postcard__username--image">
              <img src={data.user.avatar} alt="Post Image" />
            </figcaption>
            <h1>{data.user.username}</h1>
          </Link>
        </div>
        {isAuthor && (
          <div className="postcard__container--topbar__delete">
            <Link to={`/update_post/${data._id}`}>
              <SvgSrc.Edit />
            </Link>
            <div onClick={onDeleteHandler} style={{ cursor: 'pointer' }}>
              <SvgSrc.Delete />
            </div>
          </div>
        )}
      </div>
      <div className="postcard__container--content">
        <p className="postcard__content--para">{data.content}</p>
        {data.image && (
          <figcaption className="postcard__content--image">
            <img src={data.image} alt="Post Image" />
          </figcaption>
        )}
      </div>
      {!hideLikesComments && (
        <div className="postcard__container--actionbtns">
          <div className="postcard__actionbtns--main">
            <SvgSrc.Heart
              isLiked={data.likes.some((user) => user._id === userID)}
              onClick={likeHandler}
            />
            <span>{data.likes.length}</span>
          </div>
          <div className="postcard__actionbtns--main">
            <Link to={'/comment/' + data._id}>
              <SvgSrc.Comment />
            </Link>
            <span>{data.comments.length}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard

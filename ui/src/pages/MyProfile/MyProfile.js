import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './MyProfile.css'

import PostCard from './../../components/PostCard/PostCard'
import Loader from './../../components/Loader/Loader'

const MyProfile = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const token = useSelector((state) => state.user.token)
  const userID = useSelector((state) => state.user.id)
  const username = useSelector((state) => state.user.username)
  const email = useSelector((state) => state.user.email)
  const bio = useSelector((state) => state.user.bio)
  const avatar = useSelector((state) => state.user.avatar)

  const onLikeHandler = (postID) => {
    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/like/${postID}`,
        {},
        {
          headers: { authorization: 'Bearer ' + token },
        }
      )
      .then((res) => {
        const updateLikedPost = res.data.data

        const updatedPosts = [...posts]
        const updateLikedPostIndex = updatedPosts.findIndex(
          (post) => post._id === updateLikedPost._id
        )
        updatedPosts[updateLikedPostIndex] = updateLikedPost

        setPosts(updatedPosts)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  useEffect(() => {
    setLoading(true)

    if (userID) {
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/post/user/${userID}`)
        .then((res) => {
          setPosts(res.data.data)
          setLoading(false)
        })
        .catch((err) => {
          alert(err.response.data.error)
          setLoading(false)
        })
    }
  }, [])

  if (!token) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <section className="userprofile__container">
      <div className="userprofile__header">
        <div className="userprofile__header--container">
          <figcaption className="userprofile__header--image">
            <img src={avatar} alt="user image" />
          </figcaption>
          <h1>{username}</h1>
        </div>
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
          {posts.length <= 0 ? (
            <h1 className="userprofile__post--error">No Posts</h1>
          ) : (
            posts.map((item) => (
              <PostCard
                key={item._id}
                isAuthor={item.user._id === userID}
                likeHandler={() => onLikeHandler(item._id)}
                data={item}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default MyProfile

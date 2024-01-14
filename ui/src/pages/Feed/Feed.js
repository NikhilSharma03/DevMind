import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Feed.css'

import PostCard from './../../components/PostCard/PostCard'
import Loader from './../../components/Loader/Loader'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const token = useSelector((state) => state.user.token)
  const userID = useSelector((state) => state.user.id)

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

    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/post`)
      .then((res) => {
        setPosts(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }, [])

  console.log(posts)

  if (!token) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <section className="feed__container">
      <h1 className="feed__container--head">Your Feed</h1>
      {posts.length <= 0 ? (
        <h1 className="userprofile__post--error">No Posts</h1>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            isAuthor={post.user._id === userID}
            likeHandler={() => onLikeHandler(post._id)}
            data={post}
          />
        ))
      )}
    </section>
  )
}

export default Feed

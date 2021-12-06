import React, { useState, useEffect } from "react";
import "./Feed.css";
import PostCard from "./../../components/PostCard/PostCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const userID = useSelector(state => state.user.id)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/posts`).then(res => {
      const post = res.data.posts.reverse()
      setPosts(post)
    }).catch(err => alert(err))
  }, [])

  const token = useSelector(state => state.user.token)
  if(!token) {
    return <Redirect to="/login" />
  }

  const onLikeHandler = (postID) => {
    axios.post(`${process.env.REACT_APP_API}/posts/likes/${postID}`, {userID}, {headers: {token: "Bearer "+token}}).then(res => {
      let postID = res.data.post._id, newLikes = res.data.post.likes
      let newPostsArray = [...posts]
      const postIndex = newPostsArray.findIndex(item => item._id === postID)
      newPostsArray[postIndex].likes = newLikes
      setPosts(newPostsArray) 
    }).catch(err => {
      console.log(err.response)
    })
  }

  return <section className="feed__container">
    <h1 className="feed__container--head">Your Feed</h1>
    {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard likeHandler={onLikeHandler.bind(this, item._id)}
      key={item._id} isAuthor={item.creator._id === userID} postDetails={item} creator={item.creator.username}/>)}
  </section>;
};

export default Feed;

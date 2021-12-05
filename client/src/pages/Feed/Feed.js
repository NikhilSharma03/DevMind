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
      setPosts(res.data.posts)
    }).catch(err => alert(err))
  }, [])

  const token = useSelector(state => state.user.token)
  if(!token) {
    return <Redirect to="/login" />
  }

  return <section className="feed__container">
    <h1 className="feed__container--head">Your Feed</h1>
    {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard key={item.creator._id} isAuthor={item.creator._id === userID} postDetails={item} creator={item.creator.username}/>)}
  </section>;
};

export default Feed;

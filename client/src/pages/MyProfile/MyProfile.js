import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import PostCard from "./../../components/PostCard/PostCard";
import { useSelector } from "react-redux"
import { Redirect } from "react-router";
import axios from "axios";
import DeleteModal from "../../components/Modal/DeleteModal";
import * as actionCreators from "./../../store/actions/user"
import { useDispatch } from "react-redux"

const MyProfile = () => {
  const token = useSelector(state => state.user.token)
  const userID = useSelector(state => state.user.id)
  const email = useSelector(state => state.user.email)
  const bio = useSelector(state => state.user.bio)
  const username = useSelector(state => state.user.username)
  const profileImage = useSelector(state => state.user.profileImage)
  const [posts, setPosts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userID){
      axios.get(`${process.env.REACT_APP_API}/users/${userID}`).then(res => {
        const posts = res.data.user.posts.reverse()
        setPosts(posts)
      }).catch(err => {
        if(err.response){
          alert(err.response.data.message)
      }
      })
    }
  }, [])

  if(!token) {
    return <Redirect to="/login" />
  }

  const onLogOutHandler = () => dispatch(actionCreators.LogOutHandler())

  const deleteAccountHandler = () => {
      axios.delete(`${process.env.REACT_APP_API}/users/${userID}`, {headers: {token: `Bearer ${token}`}}).then(res => {
        setPosts(res.data.user.posts)
      }).catch(err => {
        alert(err)
      })
      setShowDeleteModal(false)
      onLogOutHandler()
  }

  const onLikeHandler = (postID) => {
    axios.post(`${process.env.REACT_APP_API}/posts/likes/${postID}`, {userID}, {headers: {token: "Bearer "+token}}).then(res => {
      let postID = res.data.post._id, newLikes = res.data.post.likes
      let newPostsArray = [...posts]
      const postIndex = newPostsArray.findIndex(item => item._id === postID)
      newPostsArray[postIndex].likes = newLikes
      setPosts(newPostsArray) 
    }).catch(err => {
      if(err.response){
        alert(err.response.data.message)
    }
    })
  }

  return (
    <section className="userprofile__container">
      <DeleteModal showModal={showDeleteModal} onDelete={deleteAccountHandler} onClose={() => setShowDeleteModal(false)}/>
      <React.Fragment>
      <div className="userprofile__header">
        <div className="userprofile__header--container">
          <figcaption className="userprofile__header--image">
            <img src={process.env.REACT_APP_IMAGE_PATH + profileImage} alt="user image" />
          </figcaption>
          <h1>{username}</h1>
        </div>
        <button className="userprofile__header--btn" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
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
          {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard key={item._id} likeHandler={onLikeHandler.bind(this, item._id)} isAuthor={item.creator === userID} postDetails={item} creator={username}/>)}
        </div>
      </div>
      </React.Fragment>
    </section>
  );
};

export default MyProfile;

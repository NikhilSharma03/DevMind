import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PostCard from "./../../components/PostCard/PostCard";
import axios from "axios"
import { useSelector } from "react-redux"
import Loader from "./../../components/Loader/Loader"

const UserProfile = (props) => {
  const [email, setEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  const userID = useSelector(state => state.user.id)
  const token = useSelector(state => state.user.token)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const userID = props.match.params.id
    axios.get(`${process.env.REACT_APP_API}/users/${userID}`).then(res => {
      const posts = res.data.user.posts.reverse()
      setBio(res.data.user.bio)
      setEmail(res.data.user.email)
      setPosts(posts)
      setProfileImage(res.data.user.profileImage)
      setUsername(res.data.user.username)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      if(err.response){
        setError(err.response.data.message)
      }
    })
  }, [])

  if(loading){
    return <Loader />
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
      {error ? <h1 className="userprofile__error">No User Found</h1> :
      <React.Fragment>
      <div className="userprofile__header">
        <div className="userprofile__header--container">
          <figcaption className="userprofile__header--image">
            <img src={process.env.REACT_APP_IMAGE_PATH + profileImage} alt="user image" />
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
          {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard likeHandler={onLikeHandler.bind(this, item._id)} key={item._id} isAuthor={item.creator === userID} postDetails={item} creator={username}/>)}
        </div>
      </div>
      </React.Fragment>
      }
    </section>
  );
};

export default UserProfile;

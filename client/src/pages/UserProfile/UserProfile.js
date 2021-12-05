import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PostCard from "./../../components/PostCard/PostCard";
import axios from "axios"
import { useSelector } from "react-redux"

const UserProfile = (props) => {
  const [email, setEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  const userID = useSelector(state => state.user.id)

  useEffect(() => {
    const userID = props.match.params.id
    axios.get(`${process.env.REACT_APP_API}/users/${userID}`).then(res => {
      setBio(res.data.user.bio)
      setEmail(res.data.user.email)
      setPosts(res.data.user.posts)
      setProfileImage(res.data.user.profileImage)
      setUsername(res.data.user.username)
    }).catch(err => {
      setError(err.response.data.message)
    })
  }, [])

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
          {posts.length <= 0 ? <h1 className="userprofile__post--error">No Posts</h1> : posts.map(item => <PostCard key={item.creator} isAuthor={item.creator === userID} postDetails={item} creator={username}/>)}
        </div>
      </div>
      </React.Fragment>
      }
    </section>
  );
};

export default UserProfile;

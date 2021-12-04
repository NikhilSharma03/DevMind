import React, {useState} from "react";
import "./AddPost.css";
import Form from "../../components/Form/Form";
import axios from "axios"
import { useSelector } from "react-redux";
import { Redirect } from 'react-router'

const AddPost = (props) => {
  const token = useSelector(state => state.user.token)
  const userID = useSelector(state => state.user.id)
  const [postContent, setPostContent] = useState("")
  const [postImage, setPostImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFileChange = event => {
    setPostImage(event.target.files[0]);
  };

  console.log("--------------", loading)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("content", postContent)
    formData.append("creator", userID)
    formData.append("image", postImage)
    // Make Request to API
    axios.post(`${process.env.REACT_APP_API}/posts`, formData, { headers: { token: "Bearer "+ token }}).then(res => {
      setLoading(false)
      console.log(res)
      props.history.push("/feed")
    }).catch(err => {
      console.log(err.response.data.message)
    })
  }

  if(!token) {
    // return <Redirect to="/login" />
  }

  return (
    <div className="addpost__container">
      <Form style={{ width: "55rem" }} onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>Add Post</h1>
        </div>
        <div className="form__body">
          <div className="addpost__textarea">
            <textarea onChange={(event) => setPostContent(event.target.value)} value={postContent} placeholder="Type your post"></textarea>
          </div>
          <div className="addpost--image__picker">
            <p>{!postImage ? "Not Uploaded" : "Uploaded ✓"}</p>
            <label htmlFor="addpost__image--picker">Upload Image</label>
            <input
              type="file"
              onChange={onFileChange}
              id="addpost__image--picker"
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
            />
          </div>
          <button type="submit" className="form__button">
            Create
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddPost;

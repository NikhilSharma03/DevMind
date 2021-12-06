import React, { useEffect, useState } from "react";
import "./UpdatePost.css";
import Form from "../../components/Form/Form";
import { Redirect } from 'react-router'
import { useSelector } from "react-redux";
import axios from "axios";


const UpdatePost = (props) => {
  const [content, setContent] = useState("")
  const [imageURL, setImageUrl] = useState("")
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/posts/"+ props.match.params.id).then(res => {
      setContent(res.data.post.content)
      setImageUrl(res.data.post.imageURL)
    }).catch(err => {
      alert(err)
    })
  }, []) 

  if(!token) {
    return <Redirect to="/login" />
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const updateData = {
      content, 
      imageURL
    }
    axios.patch(process.env.REACT_APP_API + "/posts/"+ props.match.params.id, updateData, {headers: {token: "Bearer "+token}}).then(res => {
      props.history.push("/feed")
    }).catch(err => {
      if(err.response){
        alert(err.response.data.message)
    }
    })
  }

  return (
    <div className="updatepost__container">
      <Form style={{ width: "45rem" }} onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>Update Post</h1>
        </div>
        <div className="form__body">
          <div className="updatepost__textarea">
            <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Type your post"></textarea>
          </div>
          {imageURL &&
            <div className="updatepost--image__picker">
              <img src={process.env.REACT_APP_IMAGE_PATH + imageURL} alt="upload image" />
            </div>
          }
          <button type="submit" className="form__button">
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePost;

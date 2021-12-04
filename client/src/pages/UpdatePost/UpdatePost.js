import React from "react";
import "./UpdatePost.css";
import Form from "../../components/Form/Form";
import ImageSource from "./../../shared/ImageSource";
import { Redirect } from 'react-router'
import { useSelector } from "react-redux";


const UpdatePost = () => {
  const token = useSelector(state => state.user.token)
  if(!token) {
    return <Redirect to="/login" />
  }

  return (
    <div className="updatepost__container">
      <Form style={{ width: "45rem" }}>
        <div className="form__banner">
          <h1>Update Post</h1>
        </div>
        <div className="form__body">
          <div className="updatepost__textarea">
            <textarea placeholder="Type your post"></textarea>
          </div>
          <div className="updatepost--image__picker">
            <img src={ImageSource.homeBanner} alt="upload image" />
            <label htmlFor="updatepost__image--picker">Update Image</label>
            <input
              type="file"
              id="updatepost__image--picker"
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
            />
          </div>
          <button type="submit" className="form__button">
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePost;

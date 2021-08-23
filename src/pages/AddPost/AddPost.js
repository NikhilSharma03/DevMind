import React from "react";
import "./AddPost.css";
import Form from "../../components/Form/Form";
import ImageSource from "./../../shared/ImageSource";

const AddPost = () => {
  return (
    <div className="addpost__container">
      <Form style={{ width: "45rem" }}>
        <div className="form__banner">
          <h1>Add Post</h1>
        </div>
        <div className="form__body">
          <div className="addpost__textarea">
            <textarea placeholder="Type your post"></textarea>
          </div>
          <div className="addpost--image__picker">
            <img src={ImageSource.homeBanner} alt="upload image" />
            <label htmlFor="addpost__image--picker">Upload Image</label>
            <input
              type="file"
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

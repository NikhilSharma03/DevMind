import React from "react";
import "./SignUp.css";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup__container">
      <Form>
        <div className="form__banner">
          <h1>SignUp</h1>
        </div>
        <div className="form__body">
          <InputField
            label="Name"
            placeholder="Type your name"
            id="input_name"
            type="text"
          />
          <InputField
            label="Email"
            placeholder="Type your email"
            id="input_email"
            type="email"
          />
          <InputField
            label="Password"
            placeholder="Type your password"
            id="input_password"
            type="password"
          />
          <div className="signup--image__picker">
            <p>Not Uploaded</p>
            <label htmlFor="sign__image--picker">Upload Image</label>
            <input
              type="input"
              id="sign__image--picker"
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
            />
          </div>
          <button type="submit" className="form__button">
            SignUp
          </button>
          <div className="toggle__container">
            <p>Already Registered?</p>
            <Link to="/login">Login here!</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;

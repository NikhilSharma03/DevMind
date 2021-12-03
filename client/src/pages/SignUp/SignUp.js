import React, { useState } from "react";
import "./SignUp.css";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import { Link } from "react-router-dom";
import axios from "axios"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [error, setError] = useState("")

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("username", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("bio", bio)
    formData.append("profile", profileImage)

    // Make Request to API
    axios.post(`${process.env.REACT_APP_API}/users/signup`,formData).then(res => {
      console.log(res.data.token)
      console.log(res.data.user.bio)
      console.log(res.data.user.email)
      console.log(res.data.user._id)
      console.log(res.data.user.username)
      console.log(res.data.user.profileImage)
      console.log(res.data.user.posts)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const onFileChange = event => {
    setProfileImage(event.target.files[0]);
  };

  return (
    <div className="signup__container">
      <Form onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>SignUp</h1>
        </div>
        <div className="form__body">
          <InputField
            label="Name"
            placeholder="Type your name"
            id="input_name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <InputField
            label="Email"
            placeholder="Type your email"
            id="input_email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputField
            label="Password"
            placeholder="Type your password"
            id="input_password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputField
            label="Bio"
            placeholder="Type your bio"
            id="input_bio"
            type="text"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
          <div className="signup--image__picker">
            <p>{!profileImage ? "Not Uploaded" : "Uploaded ✓"}</p>
            <label htmlFor="sign__image--picker">Upload Profile Image</label>
            <input
              type="file"
              onChange={onFileChange}
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

import React, {useState} from "react";
import "./Login.css";
import Form from "./../../components/Form/Form";
import InputField from "./../../components/InputField/InputField";
import { Link } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const data = {
      email,
      password
    }
    // Make Request to API
    axios.post(`${process.env.REACT_APP_API}/users/login`, data).then(res => {
      console.log(res.data.token)
      console.log(res.data.user.bio)
      console.log(res.data.user.email)
      console.log(res.data.user._id)
      console.log(res.data.user.username)
      console.log(res.data.user.profileImage)
      console.log(res.data.user.posts)
    }).catch(err => {
      console.log(err.response.data.message)
    })
  }

  return (
    <div className="login__container">
      <Form onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>Login</h1>
        </div>
        <div className="form__body">
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
          <button type="submit" className="form__button">
            Login
          </button>
          <div className="toggle__container">
            <p>Not Registered?</p>
            <Link to="/signup">Create an account!</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;

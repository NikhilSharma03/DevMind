import React, {useState} from "react";
import "./Login.css";
import Form from "./../../components/Form/Form";
import InputField from "./../../components/InputField/InputField";
import { Link } from "react-router-dom";
import * as actionCreators from "./../../store/actions/user"
import { useSelector, useDispatch } from "react-redux"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const error = useSelector(state => state.user.logIn_error)

  const dispatch = useDispatch()
  const LoginHandler = dispatch((email, password) => actionCreators.LogInHandler(email, password))

  const onSubmitHandler = (event) => {
    event.preventDefault()
    LoginHandler(email, password)
  }

  if(error) {
    console.log(error)
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

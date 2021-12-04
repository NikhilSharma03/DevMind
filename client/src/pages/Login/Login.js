import React, {useState} from "react";
import "./Login.css";
import Form from "./../../components/Form/Form";
import InputField from "./../../components/InputField/InputField";
import { Link, Redirect } from "react-router-dom";
import * as actionCreators from "./../../store/actions/user"
import { useSelector, useDispatch } from "react-redux"
import Modal from "./../../components/Modal/Modal"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const error = useSelector(state => state.user.logIn_error)
  const token = useSelector(state => state.user.token)


  const dispatch = useDispatch()
  const LoginHandler = (email, password) => dispatch(actionCreators.LogInHandler(email, password))
  const ClearErrorHandler = (type) => dispatch(actionCreators.ClearError(type))

  const onSubmitHandler = (event) => {
    event.preventDefault()
    LoginHandler(email, password)
  }

  const onClearErrorHandler = () => {
    ClearErrorHandler("login")
  }

  if(token){
    return <Redirect to="/my_profile" />
  }

  return (
    <div className="login__container">
      {error && <Modal showModal={error} message={error} closeModal={onClearErrorHandler}/>}
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

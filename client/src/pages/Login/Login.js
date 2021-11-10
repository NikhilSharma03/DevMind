import React from "react";
import "./Login.css";
import Form from "./../../components/Form/Form";
import InputField from "./../../components/InputField/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login__container">
      <Form>
        <div className="form__banner">
          <h1>Login</h1>
        </div>
        <div className="form__body">
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
          <div className="forgot__container">
            <Link to="/forgot_password">Forgot Password?</Link>
          </div>
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

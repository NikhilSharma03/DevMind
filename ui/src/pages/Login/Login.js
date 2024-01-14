import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Login.css'

import Form from './../../components/Form/Form'
import InputField from './../../components/InputField/InputField'
import Modal from './../../components/Modal/Modal'
import Loader from './../../components/Loader/Loader'

import { LogInHandler, ClearError } from './../../redux/actions/user'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const token = useSelector((state) => state.user.token)
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.logIn_error)

  const dispatch = useDispatch()
  const onLoginHandler = (email, password) =>
    dispatch(LogInHandler(email, password))
  const onClearErrorHandler = (type) => dispatch(ClearError(type))

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onLoginHandler(email, password)
  }

  if (token) {
    return <Redirect to="/my_profile" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="login__container">
      {error && (
        <Modal
          showModal={error}
          message={error}
          closeModal={() => onClearErrorHandler('login')}
        />
      )}
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
  )
}

export default Login

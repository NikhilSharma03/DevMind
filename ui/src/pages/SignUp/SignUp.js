import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './SignUp.css'

import Form from '../../components/Form/Form'
import InputField from '../../components/InputField/InputField'
import Modal from './../../components/Modal/Modal'
import Loader from './../../components/Loader/Loader'

import { SignUpHandler, ClearError } from './../../redux/actions/user'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState(null)

  const token = useSelector((state) => state.user.token)
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.signUp_error)

  const dispatch = useDispatch()
  const onSignUpHandler = (name, email, password, bio, avatar) =>
    dispatch(SignUpHandler(name, email, password, bio, avatar))
  const onClearErrorHandler = (type) => dispatch(ClearError(type))

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onSignUpHandler(name, email, password, bio, avatar)
  }

  const onFileChange = (event) => {
    setAvatar(event.target.files[0])
  }

  if (token) {
    return <Redirect to="/my_profile" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="signup__container">
      {error && (
        <Modal
          showModal={error}
          message={error}
          closeModal={() => onClearErrorHandler('signup')}
        />
      )}
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
            <p>{!avatar ? 'Not Uploaded' : 'Uploaded ✓'}</p>
            <label htmlFor="sign__image--picker">Upload Profile Image</label>
            <input
              type="file"
              onChange={onFileChange}
              id="sign__image--picker"
              style={{ display: 'none' }}
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
  )
}

export default SignUp

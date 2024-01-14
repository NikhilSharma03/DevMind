import axios from 'axios'

import * as actionTypes from './actionTypes'

export const SignUpHandler = (name, email, password, bio, avatar) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('username', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('bio', bio)
    formData.append('avatar', avatar)

    dispatch({ type: actionTypes.START_LOADING })

    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/signup`,
        formData
      )
      .then((res) => {
        localStorage.setItem('token', res.data.data.authToken)
        localStorage.setItem('id', res.data.data.user._id)
        localStorage.setItem('username', res.data.data.user.username)
        localStorage.setItem('email', res.data.data.user.email)
        localStorage.setItem('bio', res.data.data.user.bio)
        localStorage.setItem('avatar', res.data.data.user.avatar)

        dispatch({
          type: actionTypes.USER_SIGN_UP,
          token: res.data.data.authToken,
          user: res.data.data.user,
        })
        dispatch({ type: actionTypes.STOP_LOADING })
      })
      .catch((err) => {
        const error = Array.isArray(err.response.data.error)
          ? err.response.data.error.map(({ message }) => message).join(' ')
          : err.response.data.error

        dispatch({
          type: actionTypes.USER_SIGN_UP_ERROR,
          error,
        })
        dispatch({ type: actionTypes.STOP_LOADING })
      })
  }
}

export const LogInHandler = (email, password) => {
  return (dispatch) => {
    const userdata = {
      email,
      password,
    }

    dispatch({ type: actionTypes.START_LOADING })

    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/signin`,
        userdata
      )
      .then((res) => {
        localStorage.setItem('token', res.data.data.authToken)
        localStorage.setItem('id', res.data.data.user._id)
        localStorage.setItem('username', res.data.data.user.username)
        localStorage.setItem('email', res.data.data.user.email)
        localStorage.setItem('bio', res.data.data.user.bio)
        localStorage.setItem('avatar', res.data.data.user.avatar)

        dispatch({
          type: actionTypes.USER_LOG_IN,
          token: res.data.data.authToken,
          user: res.data.data.user,
        })
        dispatch({ type: actionTypes.STOP_LOADING })
      })
      .catch((err) => {
        const error = Array.isArray(err.response.data.error)
          ? err.response.data.error.map(({ message }) => message).join(' ')
          : err.response.data.error

        dispatch({
          type: actionTypes.USER_LOG_IN_ERROR,
          error,
        })
        dispatch({ type: actionTypes.STOP_LOADING })
      })
  }
}

export const LogOutHandler = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  localStorage.removeItem('bio')
  localStorage.removeItem('avatar')

  return {
    type: actionTypes.USER_LOG_OUT,
  }
}

export const ClearError = (type) => {
  if (type === 'login') {
    return {
      type: actionTypes.USER_LOG_IN_ERROR_CLEAR,
    }
  } else if (type === 'signup') {
    return {
      type: actionTypes.USER_SIGN_UP_ERROR_CLEAR,
    }
  }
}

export const AutoAuthHandler = () => {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const username = localStorage.getItem('username')
  const email = localStorage.getItem('email')
  const bio = localStorage.getItem('bio')
  const avatar = localStorage.getItem('avatar')

  return {
    type: actionTypes.USER_AUTO_AUTH,
    token,
    id,
    username,
    email,
    bio,
    avatar,
  }
}

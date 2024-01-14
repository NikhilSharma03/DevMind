import * as actionTypes from './../actions/actionTypes'

const initialState = {
  token: '',
  id: '',
  username: '',
  email: '',
  bio: '',
  avatar: '',
  signUp_error: '',
  logIn_error: '',
  loading: false,
}

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.USER_SIGN_UP:
      return {
        ...state,
        token: actions.token,
        id: actions.user._id,
        username: actions.user.username,
        email: actions.user.email,
        bio: actions.user.bio,
        avatar: actions.user.avatar,
      }

    case actionTypes.USER_SIGN_UP_ERROR:
      return {
        ...state,
        signUp_error: actions.error,
      }

    case actionTypes.USER_LOG_IN:
      return {
        ...state,
        token: actions.token,
        id: actions.user._id,
        username: actions.user.username,
        email: actions.user.email,
        bio: actions.user.bio,
        avatar: actions.user.avatar,
      }

    case actionTypes.USER_LOG_IN_ERROR:
      return {
        ...state,
        logIn_error: actions.error,
      }

    case actionTypes.USER_LOG_OUT:
      return {
        token: '',
        id: '',
        username: '',
        email: '',
        bio: '',
        avatar: '',
        signUp_error: '',
        logIn_error: '',
      }

    case actionTypes.USER_AUTO_AUTH:
      return {
        ...state,
        token: actions.token,
        id: actions.id,
        username: actions.username,
        email: actions.email,
        bio: actions.bio,
        avatar: actions.avatar,
      }

    case actionTypes.USER_LOG_IN_ERROR_CLEAR:
      return {
        ...state,
        logIn_error: '',
      }

    case actionTypes.USER_SIGN_UP_ERROR_CLEAR:
      return {
        ...state,
        signUp_error: '',
      }

    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      }

    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default reducer

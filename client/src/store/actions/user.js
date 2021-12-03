import * as actionTypes from "./actionTypes"
import axios from "axios"

export const SignUpHandler = (name, email, password, bio, profileImage) => {
    return dispatch => {
        const formData = new FormData()
        formData.append("username", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("bio", bio)
        formData.append("profile", profileImage)

        // Request to API
        axios.post(`${process.env.REACT_APP_API}/users/signup`,formData).then(res => {
            dispatch({type: actionTypes.USER_SIGN_UP, token: res.data.token, user: res.data.user})
        }).catch(err => {
            dispatch({type: actionTypes.USER_SIGN_UP_ERROR, error: err.response.data.message})
        })
    }
}

export const LogInHandler = (email, password) => {
    return dispatch => {
        const data = {
            email,
            password
        }
        // Request to API
        axios.post(`${process.env.REACT_APP_API}/users/login`, data).then(res => {
            dispatch({type: actionTypes.USER_LOG_IN, token: res.data.token, user: res.data.user})
        }).catch(err => {
            dispatch({type: actionTypes.USER_LOG_IN_ERROR, error: err.response.data.message})
        })
    }
}
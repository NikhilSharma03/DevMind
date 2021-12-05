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
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("bio", res.data.user.bio)
            localStorage.setItem("email", res.data.user.email)
            localStorage.setItem("id", res.data.user._id)
            localStorage.setItem("username", res.data.user.username)
            localStorage.setItem("profileImage", res.data.user.profileImage)
            localStorage.setItem("expiresIn", res.data.expiresIn)

            const expiresIn = parseInt(res.data.expiresIn) - parseInt(Date.now())
            setTimeout(() => {
                dispatch(LogOutHandler())
            }, expiresIn)

            dispatch({type: actionTypes.USER_SIGN_UP, token: res.data.token, user: res.data.user})
        }).catch(err => {
            dispatch({type: actionTypes.USER_SIGN_UP_ERROR, error: err.response.data.message})
        })
    }
}

export const LogInHandler = (email, password) => {
    return dispatch => {
        const userdata = {
            email,
            password
        }
        // Request to API
        axios.post(`${process.env.REACT_APP_API}/users/login`, userdata).then(res => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("bio", res.data.user.bio)
            localStorage.setItem("email", res.data.user.email)
            localStorage.setItem("id", res.data.user._id)
            localStorage.setItem("username", res.data.user.username)
            localStorage.setItem("profileImage", res.data.user.profileImage)
            localStorage.setItem("expiresIn", res.data.expiresIn)

            const expiresIn = parseInt(res.data.expiresIn) - parseInt(Date.now())
            setTimeout((item) => {
                dispatch(LogOutHandler())
            }, expiresIn)

            dispatch({type: actionTypes.USER_LOG_IN, token: res.data.token, user: res.data.user})
        }).catch(err => {
            dispatch({type: actionTypes.USER_LOG_IN_ERROR, error: err.response.data.message})
        })
    }
}

export const AutoAuthHandler = () => {
    const token = localStorage.getItem("token")
    const bio = localStorage.getItem("bio")
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("id")
    const username = localStorage.getItem("username")
    const profileImage = localStorage.getItem("profileImage")
    const expiresIn = localStorage.getItem("expiresIn")

    const expTime = parseInt(expiresIn) - parseInt(Date.now()) 
    if(expTime <= 0){
        LogOutHandler()
    }

    return {
        type: actionTypes.USER_AUTO_AUTH,
        token,
        bio,
        email,
        id,
        username,
        profileImage,
    }
}

export const LogOutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("bio")
    localStorage.removeItem("email")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    localStorage.removeItem("profileImage")
    localStorage.removeItem("expiresIn")

    return {
        type: actionTypes.USER_LOG_OUT,
    }
}

export const ClearError = (type) => {
    if(type === "login"){
        return {
            type: actionTypes.USER_LOG_IN_ERROR_CLEAR
        }
    } else if(type === "signup") {
        return {
            type: actionTypes.USER_SIGN_UP_ERROR_CLEAR
        }
    }
}
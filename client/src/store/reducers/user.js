import * as actionTypes from "./../actions/actionTypes"

const initialState = {
    token: null,
    bio: null,
    email: null,
    id: null, 
    username: null,
    profileImage: null,
    signUp_error: null,
    logIn_error: null
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.USER_SIGN_UP: 
            return {
                ...state,
                token: actions.token,
                bio: actions.user.bio,
                email: actions.user.email,
                id: actions.user._id, 
                username: actions.user.username,
                profileImage: actions.user.profileImage,
            }

        case actionTypes.USER_SIGN_UP_ERROR: 
            return {
                ...state,
                signUp_error : actions.error
            }

        case actionTypes.USER_LOG_IN: 
            return {
                ...state,
                token: actions.token,
                bio: actions.user.bio,
                email: actions.user.email,
                id: actions.user._id, 
                username: actions.user.username,
                profileImage: actions.user.profileImage,
            }
        
        case actionTypes.USER_LOG_IN_ERROR: 
            return {
                ...state,
                logIn_error : actions.error
            }

        case actionTypes.USER_LOG_OUT:
            return {
                token: null,
                bio: null,
                email: null,
                id: null, 
                username: null,
                profileImage: null,
                signUp_error: null,
                logIn_error: null
            }

        case actionTypes.USER_AUTO_AUTH:
            return {
                ...state,
                token: actions.token,
                bio: actions.bio,
                email: actions.email,
                id: actions.id, 
                username: actions.username,
                profileImage: actions.profileImage,
            }

        case actionTypes.USER_LOG_IN_ERROR_CLEAR:
            return {
                ...state,
                logIn_error: null
            }

        case actionTypes.USER_SIGN_UP_ERROR_CLEAR:
            return {
                ...state,
                signUp_error: null
            }

        default: 
            return state
    }
}

export default reducer
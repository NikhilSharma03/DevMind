import * as actionTypes from "./../actions/actionTypes"

const initialState = {
    token: null,
    bio: null,
    email: null,
    id: null, 
    username: null,
    profileImage: null,
    posts: [],
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
                posts: actions.user.posts
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
                posts: actions.user.posts
            }
        
        case actionTypes.USER_LOG_IN_ERROR: 
            return {
                ...state,
                logIn_error : actions.error
            }
        default: 
            return state
    }
}

export default reducer
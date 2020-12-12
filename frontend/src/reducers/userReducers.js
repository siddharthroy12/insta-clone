import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_FAIL,
    USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return { loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}
        case USER_LOGOUT:
            return { }
        default:
            return state
    }
}

export const userRegisterReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const userProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, userProfile: action.payload}
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const userProfileUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return { loading: true }
        case UPDATE_USER_PROFILE_SUCCESS:
            return { loading: false, userProfile: action.payload, success: true}
        case UPDATE_USER_PROFILE_FAIL:
            return { loading: false, error: action.payload, success: false}
        default:
            return state
    }
}
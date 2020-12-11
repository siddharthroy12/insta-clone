import {
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL
} from '../constants/postConstants'


export const createPostReducer = (state = { }, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true }
        case CREATE_POST_SUCCESS:
            return { loading: false, success: true }
        case CREATE_POST_FAIL:
            return { loading: false, success: false }
        default:
            return state
    }
}

export const likePostReducer = (state = { }, action) => {
    switch (action.type) {
        case LIKE_POST_REQUEST:
            return { loading: true }
        case LIKE_POST_SUCCESS:
            return { loading: false, success: true }
        case LIKE_POST_FAIL:
            return { loading: false, success: false }
        default:
            return state
    }
}

export const deletePostReducer = (state = { }, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return { loading: true }
        case DELETE_POST_SUCCESS:
            return { loading: false, success: true }
        case DELETE_POST_FAIL:
            return { loading: false, success: false }
        default:
            return state
    }
}
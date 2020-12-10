import {
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL
} from '../constants/postConstants'

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
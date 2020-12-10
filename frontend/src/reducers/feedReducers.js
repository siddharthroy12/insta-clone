import {
    FEED_REQUEST,
    FEED_REQUEST_FAIL,
    FEED_REQUEST_SUCCESS
} from '../constants/feedConstants'

export const feedReducer = (state = { }, action) => {
    switch (action.type) {
        case FEED_REQUEST:
            return {
                loading: true,
            }
        case FEED_REQUEST_SUCCESS:
            return {
                loading: false,
                feed: action.payload
            }
        case FEED_REQUEST_FAIL:
            return {
                loading: true,
                feed: action.payload
            }
        default:
            return state
    }
}
import axios from 'axios'
import {
    FEED_REQUEST,
    FEED_REQUEST_FAIL,
    FEED_REQUEST_SUCCESS
} from '../constants/feedConstants'

export const fetchFeed = () => async (dispatch) => {
    try {
        dispatch({
            type: FEED_REQUEST
        })

        const { data } = await axios.get(`/api/posts`)

        dispatch({
            type: FEED_REQUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FEED_REQUEST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

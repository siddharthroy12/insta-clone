import axios from 'axios'
import {
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL
} from '../constants/postConstants'

export const likePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIKE_POST_REQUEST
        })

        const  { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/posts/${id}`, {}, config)

        dispatch({
            type: LIKE_POST_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
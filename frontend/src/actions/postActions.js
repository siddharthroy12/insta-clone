import axios from 'axios'
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
import { fetchFeed } from './feedAction'

export const createPost = (body, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_POST_REQUEST
        })

        const  { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/posts/`, {body, image}, config)

        dispatch({
            type: CREATE_POST_SUCCESS,
        })

        dispatch(fetchFeed())

    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

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

export const deletePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_POST_REQUEST
        })

        const  { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${userInfo.token}`
            }
        }

        if (userInfo.isAdmin) {
            await axios.delete(`/api/posts/admin/${id}`, config)
        }

        await axios.delete(`/api/posts/${id}`, config)

        dispatch({
            type: DELETE_POST_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
import axios from 'axios'
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
} from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', {
            username, password
        }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
    localStorage.removeItem('userInfo')
}

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/register', {
            username, password, email
        }, config)
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProfile = (id=null) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })

        const  { userLogin: { userInfo } } = getState()

        let res

        if (id) {
            res = await axios.get(`/api/users/${id}`)
        } else {
            res = await axios.get(`/api/users/${userInfo._id}`)
        }
        

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

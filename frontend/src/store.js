import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userProfileReducer,
    userProfileUpdateReducer,
} from './reducers/userReducers'
import {
    feedReducer
} from './reducers/feedReducers'
import {
    likePostReducer,
    createPostReducer,
    deletePostReducer
} from './reducers/postReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userProfileUpdate: userProfileUpdateReducer,
    feed: feedReducer,
    likePost: likePostReducer,
    createPost: createPostReducer,
    deletePost: deletePostReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
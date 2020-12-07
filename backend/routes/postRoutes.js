const express = require('express')
const {
    createPost,
//    deletePost,
//    commentPost,
//    likeComment,
//    likePost,
    getPosts,
    getPostById,
//    removePost
} = require('../controllers/postControllers.js')
const { protect, admin } = require('../middlewares/authMiddlewares.js')

const router = express.Router()

router.route('/').get(getPosts).post(protect, createPost)
router.route('/:id').get(getPostById)

module.exports =  router
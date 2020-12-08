const express = require('express')
const {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    likePost,
    commentPost,
    deleteComment,
    likeComment,
    removePost
} = require('../controllers/postControllers.js')
const { protect, admin } = require('../middlewares/authMiddlewares.js')

const router = express.Router()

router.route('/').get(getPosts).post(protect, createPost)
router.route('/:id').get(getPostById).delete(protect, deletePost).post(protect, likePost)
router.route('/admin/:id/').delete(protect, admin, removePost)
router.route('/:id/comments').post(protect, commentPost)
router.route('/:postId/comments/:commentId').delete(protect, deleteComment).post(protect, likeComment)

module.exports =  router
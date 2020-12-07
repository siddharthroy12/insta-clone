const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

// @desc Get all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})
    res.json(posts)
})

// @desc Get post by id
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    } else {
        res.json(post)
    }
})

// @desc Create a post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
    try {
        if (req.body.body.trim() === "") {
            res.status(400)
            throw new Error()
        }
    } catch(error) {
        res.status(400)
        throw new Error('Bad request')
    }
    
    const newPost = await Post.create({
        body: req.body.body,
        image: req.body.image || "",
        user: req.user._id
    })

    await newPost.save()
    res.json(newPost)
})

module.exports = {
    getPosts,
    getPostById,
    createPost
}
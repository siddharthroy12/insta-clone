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
            throw new Error("Post can't be empty")
        }
    } catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
    
    const newPost = await Post.create({
        body: req.body.body,
        image: req.body.image || "",
        user: req.user._id
    })

    await newPost.save()
    res.json(newPost)
})


// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    } else {
        if (!post.user.equals(req.user._id)) {
            res.status(401)
            throw new Error('Not authorized')
        } else {
            await post.remove()
            res.json({message: 'Post removed'})
        }
    }
})


// @desc Like or unlike a post
// @route POST /api/posts/:id
const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    } else {
        const like = post.likes.find(like => like.toString() === req.user._id.toString())

        if (!like) {
            post.likes.push(req.user._id)
        } else {
            post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString())
        }

        const newPost = await post.save()
        res.json(newPost)
    }
})

// @desc Make comment on post
// @route POST /api/posts/:id/comments
// @access Private
const commentPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { body } = req.body
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    try {
        if (body.trim() === '') {
            res.status(400)
            throw new Error("Comment can't be empty")
        }

        const newComment = {
            body,
            user: req.user._id,
            likes: []
        }

        post.comments.push(newComment)
        const savedPost = await post.save()

        res.json(savedPost)

    } catch (error) {
        throw new Error(error.message)
    }

})

// @desc Delete comment on post
// @route DELETE /api/posts/:postId/comments/:commentId
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId)
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId.toString())

    if (!comment) {
        res.status(404)
        throw new Error('Comment not found')
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.commentId.toString())

    const newPost = await post.save()
    res.json(newPost)
})

// @desc Like a comment
// @route POST /api/posts/:postId/comments/:commentId
// @access Private
const likeComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId)
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId.toString())

    if (!comment) {
        res.status(404)
        throw new Error('Comment not found')
    }

    const like = comment.likes.find(like => like.toString() === req.user._id.toString())

    if (!like) {
        comment.likes.push(req.user._id)
    } else {
        comment.likes = comment.likes.filter(like => like.toString() !== req.user._id.toString())
    }

    const newPost = await post.save()
    
    res.json(newPost)
})

// @desc Remove post by admin
// @route DELETE /api/posts/:id/admin
// @access Private/Admin
const removePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    } else {
        await post.remove()
        res.json({message: 'Post removed'})
    }
})

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    likePost,
    commentPost,
    deleteComment,
    likeComment,
    removePost
}
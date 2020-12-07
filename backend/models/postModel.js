const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    ]
})

const postSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    comments: [commentSchema],
})

module.exports = Post = mongoose.model('Post', postSchema)
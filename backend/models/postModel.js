const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    username: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: true
        }
    ]
})

const postSchema = mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: ""
    },
    username: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: true
        }
    ],
    comments: [commentSchema],
})

module.exports = Post = mongoose.Model('Post', postSchema)
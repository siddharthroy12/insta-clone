const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    followings: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }],
    followers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }],
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    }],
    saved: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: "/img/default_profile.png"
    }
}, {
    timestamp: true
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    } else {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt) 
    }
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = User = mongoose.model('User',userSchema)
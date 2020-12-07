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
        require: true
    },
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }],
    followers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }],
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        require: true
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: "/uploads/default_profile.png"
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
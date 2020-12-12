const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/gernerateToken')

// @desc Get all users
// @route POST /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('username isAdmin following followers posts profilePic')
    res.json(users)
})

// @desc Register user & get token
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        res.status(400)
        throw new Error('Provide all fields')
    }


    const userExist = await User.findOne({ username })
    
    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @decs Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            profilePic: user.profilePic
        })
    } else {
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

// @desc Get user profile
// @route GET /api/users/:id
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        res.send(user)
    }
})

// @desc Update user profile
// @route PUT /api/users/
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.bio = req.body.bio || user.bio
        user.website = req.body.website || user.website
        user.profilePic = req.body.profilePic || user.profilePic
        if (req.body.password) {
            user.password = req.body.password
        }
        
        const updatedUser = await user.save()
        
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
            profilePic: user.profilePic
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Delete User
// @route DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    await user.remove()
    res.json({ message: 'User removed'})
})

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private/Admin
const banUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        await user.delete()
        res.json({message: 'User removed'})
    }
})

// @desc Update User
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        user.bio = req.body.bio || user.bio
        user.website = req.body.website || user.website,
        user.profilePic = req.body.profilePic || user.profilePic

        const updatedUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
})

// @desc Follow a User
// @route POST /api/users/:id
// @access Private/Admin
const followUser = asyncHandler(async (req, res) => {
    const userToFollow = await User.findById(req.params.id)
    const user = await User.findById(req.user._id)

    if (!userToFollow) {
        res.status(404)
        throw new Error('User not found')
    }

    const follow = userToFollow.followers.find(follower => follower.toString() === req.user._id.toString())
    
    if (!follow) {
        userToFollow.followers.push(req.user._id)
        user.followings.push(userToFollow._id)
    } else {
        userToFollow.followers = userToFollow.followers.filter(follower => follower.toString() !== req.user._id.toString())
        user.followings = user.followings.filter(following => following.toString() !== userToFollow._id.toString() )
    }

    await userToFollow.save()
    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    banUser,
    updateUser,
    followUser
}
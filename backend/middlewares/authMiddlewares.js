const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = expressAsyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                res.status(401)
                throw new Error('Not authorized, User not found')
            }
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token invalid')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, token not found')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized, Admin Only')
    }
}

module.exports = {
    protect,
    admin
}
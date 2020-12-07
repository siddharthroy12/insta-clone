const express = require('express')
const {
    loginUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
    deleteUser,
    banUser,
    updateUser
} = require('../controllers/userControllers.js')
const { protect, admin } = require('../middlewares/authMiddlewares.js')

const router = express.Router()

router.route('/').get(getUsers).put(protect, updateUserProfile).delete(protect, deleteUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.route('/:id').get(getUserProfile).delete(protect, admin, banUser).put(updateUser)

module.exports =  router
const express = require('express')
const { getAllUsers, registerController, loginController} = require('../controllers/userControllers')
const { requireLogin } = require('../middlewares/authmiddleware')

const router = express.Router()

router.get('/all-users',requireLogin,getAllUsers)
router.post('/register',registerController)
router.post('/login',loginController)

module.exports = router


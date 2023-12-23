const express = require('express')
const { getAllBlogsController, createBlogController, getBlogController, updateBlogController, deleteBlogController, userBlogController } = require('../controllers/blogControllers')
const { requireLogin } = require('../middlewares/authmiddleware')

const router = express.Router()

router.get('/all-blog', getAllBlogsController)

router.post('/create-blog',requireLogin,createBlogController)

router.get('/get-blog/:id', getBlogController)

router.put('/update-blog/:id',requireLogin,updateBlogController)

router.delete('/delete-blog/:id',requireLogin,deleteBlogController)

router.get('/user-blog/:id', userBlogController)

module.exports = router
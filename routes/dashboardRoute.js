const express = require('express')
const { requireAuth, currentUser } = require('../middleware/authMiddleware')
const { blogsGet, blogsUser, blogDetailGet, blogPost, blogDelete, blogEdit } = require('../controllers/dashboardController')

const router = express.Router()

router.get('/dashboard', requireAuth, (req, res) => res.render('dashboard', {title: 'Dashboard Page'}))
router.get('/blogs/add-blog', requireAuth, (req, res) => res.render('add-blog', {title: 'Add Blog Page'}))
router.get('/blogs/edit-blog/:blogId', requireAuth, (req, res) => res.render('edit-blog', {title: 'Edit Blog Page'}))

router.get('/api/v1/blogs-user', async (req, res) => await blogsUser(req, res))
router.get('/api/v1/blogs', async (req, res) => await blogsGet(req, res))
router.get('/api/v1/blogs/:blogId', async (req, res) => await blogDetailGet(req, res))

router.post('/api/v1/blogs', currentUser, async (req, res) => await blogPost(req, res))
router.put('/api/v1/blogs/:blogId', async(req, res) => await blogEdit(req, res))
router.delete('/api/v1/blogs/:blogId/:imageId', async (req, res) => await blogDelete(req, res))

module.exports = router
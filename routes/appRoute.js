const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => res.render('home', {title: 'Home Page'}))
router.get('/blogs/:blogId', (req, res) => res.render('blog-detail', {title: 'Blog Detail'}))

module.exports = router
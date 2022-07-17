const express = require('express')
const {
    signinPost,
    signupPost
} = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/users/signin', requireAuth, (req, res) => res.render('signin', {title: 'Signin Page'}))
router.get('/users/signup', requireAuth, (req, res) => res.render('signup', {title: 'Signup Page'}))
router.get('/users/signout', (req, res) => {
    res.clearCookie('userLogin')
    res.status(200).json({
        message: 'Success signout'
    })
})

router.post('/users/signin', async (req, res) => await signinPost(req, res))
router.post('/users/signup', async (req, res) => await signupPost(req, res))

module.exports = router
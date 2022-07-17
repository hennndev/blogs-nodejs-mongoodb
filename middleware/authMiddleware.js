const jwt = require('jsonwebtoken')
const Users = require('../models/users')


const requireAuth = (req, res, next) => {
    const token = req.cookies?.userLogin
    if(token) {
        if(req.url === '/users/signin' || req.url === '/users/signup') {
            res.redirect('/')
            next()
        } else {
            jwt.verify(token, 'secret-app-token', (err, decodedToken) => {
                if(err) {
                    res.redirect('/users/signin')
                    next()
                } else {
                    next()
                }
            })
        }
    } else {
        if(req.url === '/users/signin' || req.url === '/users/signup') {
            next()
        } else {
            res.redirect('/users/signin')
            next()
        }
    }
}


const currentUser = async (req, res, next) => {
    const token = req.cookies?.userLogin

    if(token) {
        jwt.verify(token, 'secret-app-token', async (err, decodedToken) => {
            if(err) {
                res.locals.currentUser = null
                next()
            } else {
                const currentUser = await Users.findById(decodedToken.id)
                res.locals.currentUser = {
                    id: currentUser._id,
                    email: currentUser.email,
                    username: currentUser.username
                }
                next()
            }
        })
    } else {
        res.locals.currentUser = null
        next()
    }
}


module.exports = {
    requireAuth,
    currentUser
}
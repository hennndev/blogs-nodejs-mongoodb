const Users = require('../models/users')
const jwt = require('jsonwebtoken')

// 1 hour
const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({id}, 'secret-app-token', {
        expiresIn: maxAge
    })
}

const signinPost = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.signin(email, password)
        const token = createToken(user.id)
        res.cookie('userLogin', token, { maxAge: maxAge * 1000})
        res.status(200).json({
            message: 'Success login app',
            user
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const signupPost = async (req, res) => {
    const { username, email, password } = req.body
    try {
        await Users.create({username, email, password})
        res.status(201).json({
            message: 'Success create new account'
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })    
    }
}


module.exports = {
    signinPost,
    signupPost
}
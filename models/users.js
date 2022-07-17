const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        uniquer: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


usersSchema.post('save', function(doc, next) {
    console.log('After new user data has been posted')
    next()
})

usersSchema.pre('save', async function(next) {
    const existUser = await Users.findOne({email: this.email})
    if(existUser) {
        throw Error('Email already used, please repeat again!')
    } else {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
})

usersSchema.statics.signin = async function(email, password) {
    const existUser = await this.findOne({email})
    if(existUser) {
        const checkPassword = await bcrypt.compare(password, existUser.password)
        if(checkPassword) {
            return {
                id: existUser._id,
                username: existUser.username,
                email: existUser.email
            }
        } else {
            throw Error('Password Incorrect. Please repeat again!')
        }
    } else {
        throw Error('Email not exist. Please repeat again!')
    }
}

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
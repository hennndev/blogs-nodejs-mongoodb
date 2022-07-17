const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogsSchema = new Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    blogCategory: {
        type: String,
        required: true
    },
    blogAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogImage: {
        blogImageURL: {
            type: String,
            required: true
        },
        blogImageID: {
            type: String,
            required: true
        }
    },
    blogComments: [
        {
            blogCommentBody: {
                type: String,
                required: true
            },
            blogCommentPostedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            createdAt: {
                type: String,
                required: true
            }
        }
    ],
    blogLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    isShow: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Blogs = mongoose.model('Blogs', blogsSchema)
module.exports = Blogs
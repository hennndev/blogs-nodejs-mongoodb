const Blogs = require('../models/blogs')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'hennnpermanadev', 
    api_key: 394938371368973, 
    api_secret: 'FUZbzaLtxZIehXJTYhe0hghLEbA'
});


const blogsGet = async(req, res) => {
    try {
        const blogsData = await Blogs.find({isShow: true})
                            .populate('blogAuthor', '-password -__v')
                            .sort({createdAt: -1})
                            
        res.status(200).json({
            message: 'Success get all blogs',
            data: blogsData
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get all blogs'
        })        
    }
}

const blogDetailGet = async(req, res) => {
    try {
        const blogData = await Blogs.findById(req.params.blogId).populate('blogAuthor', '-password -__v')
        res.status(200).json({
            message: 'Success get single blog detail',
            data: blogData
        })
    } catch(err) {
        res.status(400).json({
            error: 'Failed get single blog detail'
        })
    }
}

const blogsUser = async(req, res) => {
    try {
        const blogs = await Blogs.find({}).populate('blogAuthor', '-password -__v').sort({createdAt: -1})
        const blogsSpesific = blogs.filter(blog => blog.blogAuthor.email === res.locals.currentUser?.email)
        res.status(200).json({
            message: 'Success get blogs user',
            data: blogsSpesific
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get blogs user'
        })
    }
}

const blogPost = async(req, res) => {
    console.log(res.locals.currentUser)
    try {
        await Blogs.create({
            ...req.body,
            isShow: false,
            blogAuthor: res.locals?.currentUser?.id,
            blogComments: [],
            blogLikes: []
        })
        res.status(201).json({
            message: 'Success create new blog'
        })
    } catch (error) {
        res.status(400).json({
            errro: 'Failed create new blog'
        })
    }
}

const blogEdit = async(req, res) => {
    try {
        if(req.body.isShow !== undefined) {
            await Blogs.updateOne({_id: req.params.blogId}, {isShow: !req.body.isShow})
        } else {
            if(!req.body.oldBlogImageID) {
                await Blogs.updateOne({_id: req.params.blogId}, {
                    blogTitle: req.body.blogTitle,
                    blogCategory: req.body.blogCategory,
                    blogDescription: req.body.blogDescription,
                    blogImage: req.body.blogImage
                })    
            } else {
                await Blogs.updateOne({_id: req.params.blogId}, {
                    blogTitle: req.body.blogTitle,
                    blogCategory: req.body.blogCategory,
                    blogDescription: req.body.blogDescription,
                    blogImage: req.body.blogImage
                }).then(async() => {
                    await cloudinary.uploader.destroy(req.body.oldBlogImageID, function(error, result) { })
                })
            }
        }
        res.status(200).json({
            message: 'Success edit blog'
        })
    } catch (error) {
        res.status(400).json({
            message: 'Failed edit blog'
        })
    }
}

const blogDelete = async(req, res) => {
    try {
        await Blogs.findByIdAndDelete(req.params.blogId, async (err) => {
            if(err) {
                console.log(err)
            } else {
                await cloudinary.uploader.destroy(req.params.imageId, function(error, result) { })
            }
        })
        res.status(200).json({
            message: 'Success delete blog'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed delete blog'
        })
    }
}


module.exports = {
    blogsGet,
    blogDetailGet,
    blogsUser,
    blogPost,
    blogEdit,
    blogDelete
}
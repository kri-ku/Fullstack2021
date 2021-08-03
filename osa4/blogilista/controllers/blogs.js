const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')
require('dotenv').config()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
   
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0,
        user: user._id
    })

    if (!blog.title && !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    }

})

blogsRouter.delete('/:id',userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    //console.log("BLOG REMOVE", blog)
    //console.log("USER REMOVE", user)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }
})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blogToModify = await Blog.findById(request.params.id)

    const blog = {
        title: body.title || blogToModify.title,
        author: body.author || blogToModify.author,
        url: body.url || blogToModify.url,
        likes: body.likes || blogToModify.likes
    }
    const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(modifiedBlog.toJSON())

})

module.exports = blogsRouter
const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

const { userExtractor } = require('../utils/middleware')
require('dotenv').config()



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('comments', { comment: 1, _id: 1 })
        .populate('user', { username: 1, name: 1, _id: 1 })

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

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

blogsRouter.get('/comments', async (request, response) => {
    const comments = await Comment.find({}).populate('blog', { title: 1, author: 1, _id: 1 })
    response.json(comments.map(c => c.toJSON()))
})

blogsRouter.get('/:id/comments', async (request, response) => {
    const blogComments = await Comment.find({ blog: request.params.id }).populate('blog', { title: 1, author: 1, _id: 1 })
    response.json(blogComments.map(comment => comment.toJSON()))

})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(body.blogId)

    const comment = new Comment({
        comment: body.comment,
        blog: blog._id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.json(savedComment.toJSON())

})

module.exports = blogsRouter
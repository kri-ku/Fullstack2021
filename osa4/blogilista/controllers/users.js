const bcrypt = require('bcrypt')
const { response } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password === undefined) {
        response.status(400).json({ error: 'password is required' })
    } else if (body.password.length < 3) {
        response.status(400).json({ error: 'password should be at least three characters long' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)

    }


})

module.exports = usersRouter
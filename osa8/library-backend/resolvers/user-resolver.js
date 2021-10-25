const User = require('../models/user')
const { UserInputError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SO_SECRET_KEY'

module.exports = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        },

    },
    Mutation: {
        createUser: async (root, args) => {
            const user = await new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }
            const userForToken = {
                username: user.username,
                id: user.id
            }
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

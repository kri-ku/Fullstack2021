const Author = require('../models/author')
const Book = require('../models/book')
const { UserInputError, AuthenticationError } = require('apollo-server-express')

const mongoose = require('mongoose')

module.exports = {
  /*Author: {
    bookCount: async (root) =>{ await Book.collection.countDocuments({ author: mongoose.Types.ObjectId(root.id) }); console.log('TÄÄÄL')}//convert string to object id}
  },*/

  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return await Author.find({}).populate('books', { _id: 1, title: 1, published: 1 })
    }

  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      /*if (!author) {
        return null
      }*/

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const updatedAuthor = ({
        id: author.id,
        name: author.name,
        born: args.setBornTo
      })
      try {
        const modifiedAuthor = await Author.findByIdAndUpdate(author.id, updatedAuthor, { new: true }).populate('books', { _id: 1, title: 1, published: 1 })
        return modifiedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })

      }


    }
  }
}

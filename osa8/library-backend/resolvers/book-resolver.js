const Book = require('../models/book')
const Author = require('../models/author')
const { UserInputError, AuthenticationError } = require('apollo-server-express')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre && args.author) {
                const authorToSearch = await Author.findOne({ name: args.author })
                const list = await Book.find({ author: authorToSearch.id, genres: { $in: [args.genre] } }).populate('author', { name: 1, _id: 1, born: 1 })
                if (list) {
                    return list
                } else {
                    return []
                }

            } else if (args.author) {
                const authorToSearch = await Author.findOne({ name: args.author })
                if (authorToSearch) {
                    return await Book.find({ author: authorToSearch.id }).populate('author', { name: 1, _id: 1, born: 1 })
                } else {
                    return []
                }

            } else if (args.genre) {
                const list = await Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, _id: 1, born: 1 })
                if (list) {
                    return list
                } else {
                    return []
                }

            } else {
                return await Book.find({}).populate('author', { name: 1, _id: 1, born: 1 })
            }
        },

    },
    Book: {
        author: async (root) => root.author
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const author = await Author.findOne({ name: args.author })

            if (author === null) {
                const authorToSave = new Author({
                    name: args.author,
                    born: null,
                    books: []
                })

                try {
                    const savedAuthor = await authorToSave.save()
                    console.log("SAVED AUTHOR", savedAuthor)
                    /*const newBook = new Book({
                        title: args.title || '',
                        published: args.published || '',
                        genres: args.genres || [],
                        author: authorToSave.id
                    })*/ // TÄÄÄ
                    const newBook = new Book({ ...args, author: savedAuthor.id })
                    await newBook.save()
                    console.log('New Book', newBook)
                    savedAuthor.books.push(newBook.id)
                    await savedAuthor.save()

                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
                pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
                return await newBook.populate('author', { name: 1, _id: 1, born: 1 })
            } else {
                const newBook = new Book({ ...args, author: author.id })
                /*const newBook = new Book({
                    title: args.title || '',
                    published: args.published || '',
                    genres: args.genres || [],
                    author: author.id
                })*/

                try {
                    await newBook.save()
                    author.books.push(newBook.id)
                    await author.save()

                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })

                }
                pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
                return await newBook.populate('author', { name: 1, _id: 1, born: 1 })
            }

        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }

    }
}

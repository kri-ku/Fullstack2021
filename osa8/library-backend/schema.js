const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const bookTypeDefs = require('./typedefs/book')
const authorTypeDefs = require('./typedefs/author')
const userTypeDefs = require('./typedefs/user')

const bookResolvers = require('./resolvers/book-resolver')
const authorResolvers = require('./resolvers/author-resolver')
const userResolvers = require('./resolvers/user-resolver')

const Query = `
    type Query {
        sayHello: String
    }
`

const Resolvers = {
    Query: {
        sayHello: () => 'Say Hello'
    }
}


const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([Query, bookTypeDefs, authorTypeDefs, userTypeDefs]),
    resolvers: mergeResolvers([Resolvers, bookResolvers, authorResolvers, userResolvers])
})

module.exports = schema


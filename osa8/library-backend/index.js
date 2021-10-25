
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config() // for hiding mongo uri
const JWT_SECRET = 'SO_SECRET_KEY'
const schema = require('./schema')

const MONGODB_URI = process.env.MONGODB_URI
console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb!')
  })
  .catch((error) => {
    console.log('error connecting to mongodb', error.message)
  })

const startApolloServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const PORT = 4000

  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          }
        }
      }
    }],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }

  })


  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })


  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: `${server.graphqlPath}`
  })

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${subscriptionServer.wsServer.options.path}`)

  })

}

startApolloServer()


require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const { prisma } = require('./generated/prisma-client/index')

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (err) {
    return null
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)
    return {
      user,
      prisma
    }
  }
})

server
  .listen({
    port: 4000
  })
  .then(info => console.log(`Server started on http://localhost:${info.port}`))

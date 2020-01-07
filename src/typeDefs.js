const { gql } = require('apollo-server')

const typeDefs = gql`
  type Hello {
    text: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    currentUser: User!
    hello: Hello!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
    ): LoginResponse!
    login(email: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    token: String
    user: User
  }
`

module.exports = typeDefs

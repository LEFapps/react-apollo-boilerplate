const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getToken = user =>
  jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )

const resolvers = {
  Query: {
    hello: () => {
      return { text: 'hello world', test: 'bla' }
    },
    currentUser: (parent, args, { user, prisma }) => {
      if (!user) {
        throw new Error('Not Authenticated')
      }
      return prisma.user({ id: user.id })
    }
  },
  Mutation: {
    register: async (
      parent,
      { username, email, password },
      { prisma },
      info
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.createUser({
        username,
        email,
        password: hashedPassword
      })
      const token = getToken(user)
      return { token, user }
    },
    login: async (parent, { username, password }, { prisma }, info) => {
      const user = await prisma.user({ username })

      if (!user) {
        throw new Error('Invalid Login')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        throw new Error('Invalid Login')
      }

      const token = getToken(user)
      return {
        token,
        user
      }
    }
  }
}

module.exports = resolvers

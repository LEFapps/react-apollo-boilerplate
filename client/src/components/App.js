import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import RegisterForm from './RegisterForm'

const client = new ApolloClient({
  uri: '/graphql',
  request: operation => {
    const token = localStorage.getItem('authToken')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  }
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={RegisterForm} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

export default App

import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const REGISTER = gql`
  mutation RegisterMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

const RegisterForm = props => {
  const [input, setInput] = useState({})
  const [register, { data }] = useMutation(REGISTER)
  console.log(data)
  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        register({ variables: input })
        setInput({})
      }}
    >
      <FormGroup>
        <Label for='username'>Username</Label>
        <Input
          type='text'
          name='username'
          id='username'
          onChange={e =>
            setInput(Object.assign(input, { username: e.target.value }))
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for='email'>Email</Label>
        <Input
          type='email'
          name='email'
          id='email'
          onChange={e =>
            setInput(Object.assign(input, { email: e.target.value }))
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for='password'>Password</Label>
        <Input
          type='password'
          name='password'
          id='password'
          onChange={e =>
            setInput(Object.assign(input, { password: e.target.value }))
          }
        />
      </FormGroup>
      <Button type='submit'>Register</Button>
    </Form>
  )
}

export default RegisterForm

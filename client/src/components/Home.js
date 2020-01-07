import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const QUERY = gql`
  {
    hello {
      text
    }
  }
`

const Home = () => {
  const { loading, error, data } = useQuery(QUERY)
  if (loading) return 'loading...'
  return (
    <div>
      <h2>{data.hello.text}</h2>
    </div>
  )
}

export default Home

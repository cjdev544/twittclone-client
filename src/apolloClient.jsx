import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { getToken } from './utils/token'

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    createUploadLink({
      uri: 'http://localhost:4000/graphql',
    })
  ),
  connectToDevTools: true,
})

export default client

import { gql } from '@apollo/client'

export const CREATE_TWITT = gql`
  mutation CreateTwitt($message: String!) {
    createTwitt(message: $message) {
      id
      userId
      message
      createAt
    }
  }
`

export const GET_USER_TWITTS = gql`
  query GetUserTwitts($username: String!) {
    getUserTwitts(username: $username) {
      id
      userId
      message
      createAt
    }
  }
`

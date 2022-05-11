import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    loginUser(input: $input)
  }
`

export const GET_USER = gql`
  query GetUser($username: String, $getUserId: ID) {
    getUser(username: $username, id: $getUserId) {
      id
      username
      name
      lastname
      email
      avatar
      banner
      biography
      website
      ubication
      createAt
    }
  }
`

export const UPLOAD_BANNER = gql`
  mutation UploadBanner($file: Upload!) {
    uploadBanner(file: $file) {
      user {
        id
        name
        lastname
        username
        email
        biography
        avatar
        banner
        website
        ubication
        createAt
      }
      token
    }
  }
`

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      user {
        id
        name
        lastname
        username
        email
        biography
        avatar
        banner
        website
        ubication
        createAt
      }
      token
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateInput) {
    updateUser(input: $input) {
      user {
        id
        name
        lastname
        username
        email
        biography
        avatar
        banner
        website
        ubication
        createAt
      }
      token
    }
  }
`

export const FOLLOW_NO_FOLLOW = gql`
  query FollowNoFollow($username: String!) {
    followNoFollow(username: $username)
  }
`

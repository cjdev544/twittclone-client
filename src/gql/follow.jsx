import { gql } from '@apollo/client'

export const FOLLOW_NO_FOLLOW = gql`
  query FollowNoFollow($username: String!) {
    followNoFollow(username: $username)
  }
`

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username)
  }
`

export const UNFOLLOW_USER = gql`
  mutation UnFollowUser($username: String!) {
    unFollowUser(username: $username)
  }
`

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
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
  }
`

export const GET_FOLLOWEDS = gql`
  query GetFolloweds($username: String!) {
    getFolloweds(username: $username) {
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
  }
`

export const GET_NO_FOLLOWEDS = gql`
  query GetNoFolloweds {
    getNoFolloweds {
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
  }
`

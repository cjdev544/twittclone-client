import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import {
  FOLLOW_NO_FOLLOW,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWEDS,
  GET_FOLLOWERS,
  GET_NO_FOLLOWEDS,
} from '../gql/follow'

import useAuth from './useAuth'

const useFollow = () => {
  const { cache } = useApolloClient()
  const [followUser] = useMutation(FOLLOW_USER)
  const [unFollowUser] = useMutation(UNFOLLOW_USER)
  const { userAuth } = useAuth()

  const getAuthFollow = () => {
    const followeds = useQuery(GET_FOLLOWEDS, {
      variables: { username: userAuth?.username },
    })

    const followers = useQuery(GET_FOLLOWERS, {
      variables: { username: userAuth?.username },
    })

    const noFolloweds = useQuery(GET_NO_FOLLOWEDS, {
      variables: { username: userAuth?.username },
    })

    return {
      authFolloweds: followeds?.data?.getFolloweds,
      authFollowers: followers?.data?.getFollowers,
      authNoFolloweds: noFolloweds?.data?.getNoFolloweds,
    }
  }

  const authFollow = getAuthFollow()

  const isFollowOrNoFollow = (username) => {
    const {
      data,
      loading: followNoFollowLoading,
      error: followNoFollowError,
    } = useQuery(FOLLOW_NO_FOLLOW, {
      variables: { username },
    })
    return {
      followNoFollowData: data?.followNoFollow,
      followNoFollowLoading,
      followNoFollowError,
    }
  }

  const toFollowUser = async (userPage) => {
    const { data } = await followUser({
      variables: { username: userPage?.username },
    })
    updateFolloweds(userPage)
    return { dataFollow: data?.followUser }
  }

  const toUnFollowUser = async (userPage) => {
    const { data } = await unFollowUser({
      variables: { username: userPage?.username },
    })
    updateUnFolloweds(userPage)
    return { dataUnFollow: data?.unFollowUser }
  }

  const toGetFollowers = (username) => {
    const { data } = useQuery(GET_FOLLOWERS, {
      variables: { username },
    })
    return data
  }

  const toGetFolloweds = (username) => {
    const { data } = useQuery(GET_FOLLOWEDS, {
      variables: { username },
    })
    return data
  }

  // Update data Cache ************************************
  const updateFolloweds = (userPage) => {
    const query = GET_FOLLOWEDS
    cache.updateQuery(
      {
        query,
        variables: {
          username: userAuth.username,
        },
      },
      (data) => {
        return {
          getFolloweds: [...data.getFolloweds, userPage],
        }
      }
    )

    const query2 = GET_FOLLOWERS
    cache.updateQuery(
      {
        query: query2,
        variables: {
          username: userPage.username,
        },
      },
      (data) => {
        if (data?.getFollowers) {
          return {
            getFollowers: [...data.getFollowers, userAuth],
          }
        } else {
          return null
        }
      }
    )

    const query3 = GET_NO_FOLLOWEDS
    cache.updateQuery(
      {
        query: query3,
      },
      (data) => {
        return {
          getNoFolloweds: data.getNoFolloweds.filter(
            (noFollowed) => noFollowed.id !== userPage.id
          ),
        }
      }
    )

    const query4 = FOLLOW_NO_FOLLOW
    cache.updateQuery(
      {
        query: query4,
        variables: { username: userPage.username },
      },
      (data) => ({ followNoFollow: !data.followNoFollow })
    )
  }

  const updateUnFolloweds = (userPage) => {
    const query = GET_FOLLOWEDS

    cache.updateQuery(
      {
        query,
        variables: {
          username: userAuth.username,
        },
      },
      (data) => {
        const newArray = data?.getFolloweds.filter(
          (follow) => follow.id !== userPage.id
        )
        return {
          getFolloweds: newArray,
        }
      }
    )

    const query2 = GET_FOLLOWERS
    cache.updateQuery(
      {
        query: query2,
        variables: {
          username: userPage.username,
        },
      },
      (data) => {
        if (data?.getFollowers) {
          const newArray = data?.getFollowers.filter(
            (follow) => follow.id !== userAuth.id
          )
          return {
            getFollowers: newArray,
          }
        } else {
          return null
        }
      }
    )

    const query3 = GET_NO_FOLLOWEDS
    cache.updateQuery(
      {
        query: query3,
      },
      (data) => {
        return {
          getNoFolloweds: [...data.getNoFolloweds, userPage],
        }
      }
    )

    const query4 = FOLLOW_NO_FOLLOW
    cache.updateQuery(
      {
        query: query4,
        variables: { username: userPage.username },
      },
      (data) => ({ followNoFollow: !data.followNoFollow })
    )
  }

  return {
    authFollow,
    isFollowOrNoFollow,
    toFollowUser,
    toUnFollowUser,
    toGetFollowers,
    toGetFolloweds,
  }
}

export default useFollow

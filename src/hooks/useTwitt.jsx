import { useApolloClient, useMutation, useQuery } from '@apollo/client'

import { CREATE_TWITT, GET_ALL_TWITTS, GET_USER_TWITTS } from '../gql/twitt'
import useAuth from './useAuth'

const useTwitt = () => {
  const { cache } = useApolloClient()
  const [createTwitt] = useMutation(CREATE_TWITT)
  const { userAuth } = useAuth()

  const goCreateTwitt = async (message) => {
    const { data } = await createTwitt({
      variables: { message },
    })
    updateTwittsCache(data.createTwitt)
    return data.createTwitt
  }

  const getAllTwittsUser = (username) => {
    const {
      data,
      loading: loadingTwittsUser,
      error: errorTwittUser,
    } = useQuery(GET_USER_TWITTS, {
      variables: { username },
    })
    return {
      dataTwittsUser: data?.getUserTwitts,
      loadingTwittsUser,
      errorTwittUser,
    }
  }

  const getAllTwitts = () => {
    const {
      data,
      loading: loadingAllTwitss,
      error: errorAllTwitts,
    } = useQuery(GET_ALL_TWITTS)
    return {
      dataAllTwitts: data?.getAllFollowedsTwitts,
      loadingAllTwitss,
      errorAllTwitts,
    }
  }

  // Write cache
  const updateTwittsCache = (newTwitt) => {
    const query = GET_USER_TWITTS
    cache.updateQuery(
      {
        query,
        variables: { username: userAuth.username },
      },
      (data) => {
        if (data?.getUserTwitts) {
          return { getUserTwitts: [newTwitt, ...data.getUserTwitts] }
        } else {
          return null
        }
      }
    )
  }

  return {
    goCreateTwitt,
    getAllTwittsUser,
    getAllTwitts,
  }
}

export default useTwitt

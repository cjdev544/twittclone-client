import { useMutation, useQuery } from '@apollo/client'

import { CREATE_TWITT, GET_USER_TWITTS } from '../gql/twitt'

const useTwitt = () => {
  const [createTwitt] = useMutation(CREATE_TWITT)

  const goCreateTwitt = async (message) => {
    const { data } = await createTwitt({
      variables: { message },
    })
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

  return {
    goCreateTwitt,
    getAllTwittsUser,
  }
}

export default useTwitt

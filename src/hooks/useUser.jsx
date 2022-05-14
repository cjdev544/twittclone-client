import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'

import useAuth from './useAuth'
import {
  GET_USER,
  UPDATE_USER,
  UPLOAD_AVATAR,
  UPLOAD_BANNER,
} from '../gql/user'

const useUser = () => {
  const client = useApolloClient()
  const { getUserLogin } = useAuth()
  const [updateUser] = useMutation(UPDATE_USER)
  const [uploadBanner] = useMutation(UPLOAD_BANNER)
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR)

  const getDataUser = (username) => {
    const {
      data: dataUser,
      loading: loadingUser,
      error: errorUser,
    } = useQuery(GET_USER, {
      variables: {
        username,
      },
    })
    return { dataUser: dataUser?.getUser, loadingUser, errorUser }
  }

  const getDataUserId = (userId) => {
    const {
      data: dataUser,
      loading: loadingUser,
      error: errorUser,
    } = useQuery(GET_USER, {
      variables: {
        getUserId: userId,
      },
    })
    return { dataUser: dataUser?.getUser, loadingUser, errorUser }
  }

  const updateDataUser = async (id, newData) => {
    const { data, error } = await updateUser({
      variables: {
        input: {
          name: newData.name,
          lastname: newData.lastname,
          biography: newData.biography || '',
          website: newData.website || '',
          ubication: newData.ubication || '',
        },
      },
    })
    if (error) {
      toast.error('Error al actualizar usuario')
    } else {
      getUserLogin(data?.updateUser?.token)
    }

    if (newData.banner) {
      const { data, error } = await uploadBanner({
        variables: { file: newData.banner },
      })

      if (error) {
        toast.error('Error al actualizar el banner')
      } else {
        getUserLogin(data?.uploadBanner?.token)
      }
    }

    if (newData.avatar) {
      const { data, error } = await uploadAvatar({
        variables: { file: newData.avatar },
      })

      if (error) {
        toast.error('Error al actualizar el avatar')
      } else {
        getUserLogin(data?.uploadAvatar?.token)
      }
    }
  }

  return {
    getDataUser,
    getDataUserId,
    updateDataUser,
  }
}

export default useUser

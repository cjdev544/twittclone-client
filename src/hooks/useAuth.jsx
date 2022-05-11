import { useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import jwtDecode from 'jwt-decode'

import AuthContext from '../context/authContext'
import { CREATE_USER, LOGIN_USER } from '../gql/user'
import { getToken, removeToken, setToken } from '../utils/token'

const useAuth = () => {
  const { userAuth, setUserAuth } = useContext(AuthContext)

  const [createUser] = useMutation(CREATE_USER)
  const [loginUser] = useMutation(LOGIN_USER)

  useEffect(() => {
    const token = getToken()
    if (token) {
      getUserLogin(token)
      setToken(token)
    } else {
      setUserAuth(null)
    }
  }, [])

  const getUserLogin = (token) => {
    const user = jwtDecode(token)
    setUserAuth(user)
    setToken(token)
  }

  const logoutUser = () => {
    removeToken()
    setUserAuth(null)
  }

  const createNewUser = (formData) => {
    const { name, lastname, email, password } = formData
    const { data } = createUser({
      variables: {
        input: {
          name,
          lastname,
          email,
          password,
        },
      },
    })
    return data?.createUser
  }

  const sigInUser = (formData) => {
    const { email, password } = formData
    const res = loginUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
    return res
  }

  return {
    userAuth,
    createNewUser,
    sigInUser,
    getUserLogin,
    logoutUser,
  }
}

export default useAuth

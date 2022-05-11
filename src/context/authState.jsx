import { useMemo, useState } from 'react'

import AuthContext from './authContext'

const AuthState = ({ children }) => {
  const [userAuth, setUserAuth] = useState(undefined)

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState

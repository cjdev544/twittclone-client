import { ToastContainer } from 'react-toastify'

import useAuth from './hooks/useAuth'
import useFollow from './hooks/useFollow'
import RouterApp from './routes/RouterApp'
import Auth from './page/Auth'
import BasicSpinner from './components/BasicSpinner'

const App = () => {
  const { userAuth } = useAuth()
  useFollow()
  console.log(import.meta.env.VITE_BACKEND_URL, 'AQUIIII')
  if (userAuth === undefined) return <BasicSpinner />

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>{userAuth ? <RouterApp /> : <Auth />}</div>
    </>
  )
}

export default App

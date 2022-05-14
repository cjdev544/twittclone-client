import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../page/Home'
import Users from '../page/Users'
import User from '../page/User'
import Error404 from '../page/Error404'
import BasicLayout from '../components/layouts/BasicLayout'

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/:username' element={<User />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  )
}

export default RoutesApp

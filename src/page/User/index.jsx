import { Link, useParams } from 'react-router-dom'

import BasicSpinner from '../../components/BasicSpinner'
import BannerAvatar from '../../components/User/BannerAvatar'
import UserInfo from '../../components/User/UserInfo'
import useUser from '../../hooks/useUser'
import './User.scss'

const User = () => {
  const { username } = useParams()

  const { getDataUser } = useUser()
  const { dataUser, loadingUser, errorUser } = getDataUser(username)

  if (loadingUser) return <BasicSpinner />
  if (errorUser) return <h1 className='error'>Error al cargar usuario</h1>

  return (
    <div className='user'>
      <div className='user__title'>
        <h2>
          {dataUser.name} {dataUser.lastname}
        </h2>
      </div>
      <BannerAvatar dataUser={dataUser} />
      <UserInfo dataUser={dataUser} />
      <div className='user__twitts'>Listado de tweets</div>
      <Link to='/'>
        <h3>Ir a home</h3>
      </Link>
    </div>
  )
}

export default User

import { useParams } from 'react-router-dom'

import useTwitt from '../../hooks/useTwitt'
import useUser from '../../hooks/useUser'
import BasicSpinner from '../../components/BasicSpinner'
import TwittList from '../../components/TwittList'
import BannerAvatar from '../../components/User/BannerAvatar'
import UserInfo from '../../components/User/UserInfo'
import './User.scss'

const User = () => {
  const { username } = useParams()

  const { getDataUser } = useUser()
  const { dataUser, loadingUser, errorUser } = getDataUser(username)

  const { getAllTwittsUser } = useTwitt()
  const { dataTwittsUser, loadingTwittsUser, errorTwittUser } =
    getAllTwittsUser(username)

  if (loadingUser || loadingTwittsUser) return <BasicSpinner />

  if (errorUser) return <h1 className='error'>Error al cargar usuario</h1>
  if (errorTwittUser)
    return <h2>Error al buscar los mensajes, intente de nuevo</h2>

  return (
    <div className='user'>
      <div className='user__title'>
        <h2>
          {dataUser.name} {dataUser.lastname}
        </h2>
      </div>
      <BannerAvatar dataUser={dataUser} />
      <UserInfo dataUser={dataUser} />
      <div className='user__tiwtts'>
        <h3>Twitts</h3>
        {dataTwittsUser && <TwittList twitts={dataTwittsUser} />}
      </div>
    </div>
  )
}

export default User

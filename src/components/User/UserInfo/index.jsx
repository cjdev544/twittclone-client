import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'
import {
  faLocationDot,
  faLink,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'

import useFollow from '../../../hooks/useFollow'
import './UserInfo.scss'

const UserInfo = ({ dataUser }) => {
  if (!dataUser) return null

  const { toGetFollowers, toGetFolloweds } = useFollow()

  const dataFolloweds = toGetFolloweds(dataUser?.username)
  const followeds = dataFolloweds?.getFolloweds
  const dataFollowers = toGetFollowers(dataUser?.username)
  const followers = dataFollowers?.getFollowers

  const date = new Date(Number(dataUser?.createAt))
  const formatDate = format(date, 'MMMM-yyyy', { locale: esLocale })
  const month = formatDate.split('-')[0]
  const year = formatDate.split('-')[1]

  return (
    <div className='user-info'>
      <h2>
        {dataUser.name} {dataUser.lastname}
      </h2>
      <p className='username'>@{dataUser.username}</p>
      {dataUser.biography && (
        <div className='biography'>{dataUser.biography}</div>
      )}
      <div className='otherInfo'>
        {dataUser?.ubication && (
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> {dataUser.ubication}
          </p>
        )}
        {dataUser?.website && (
          <a
            href={dataUser.website}
            alt={dataUser.website}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faLink} /> {dataUser.website}
          </a>
        )}
      </div>
      <p className='create'>
        <FontAwesomeIcon icon={faCalendarDays} /> se unió en {month} de {year}
      </p>
      <div className='follow'>
        <p>
          <span>{followeds?.length}</span> Siguiendo
        </p>
        <p>
          <span>{followers?.length}</span> Siguidores
        </p>
      </div>
    </div>
  )
}

export default UserInfo

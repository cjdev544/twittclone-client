import { Link } from 'react-router-dom'
import esLocale from 'date-fns/locale/es'
import formatDistance from 'date-fns/formatDistance'
import { Image } from 'react-bootstrap'

import useUser from '../../../hooks/useUser'
import { detecteLink } from '../../../utils/detecteLinks'
import AvatarNoFound from '../../../assets/png/avatar.png'
import './Twitt.scss'

const Twitt = ({ twitt }) => {
  const { getDataUserId } = useUser()
  const { dataUser, loadingUser } = getDataUserId(twitt.userId)

  if (loadingUser) return null

  const dateSend = new Date(Number(twitt?.createAt))
  const date = formatDistance(dateSend, Date.now(), {
    locale: esLocale,
  })
  console.log(date)

  return (
    <div className='twitt'>
      <Link to={`/${dataUser?.username}`}>
        <Image
          className='avatar'
          src={dataUser?.avatar ? dataUser?.avatar : AvatarNoFound}
          alt='avatar'
          roundedCircle
        />
      </Link>
      <div>
        <Link to={`/${dataUser?.username}`} className='name'>
          <p>
            {dataUser?.name} {dataUser?.lastname}
            <span>
              @{dataUser?.username} &middot; {date}
            </span>
          </p>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: detecteLink(twitt.message) }} />
      </div>
    </div>
  )
}

export default Twitt

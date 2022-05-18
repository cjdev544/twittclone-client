import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'

import useFollow from '../../../hooks/useFollow'
import AvatarNoFound from '../../../assets/png/avatar.png'
import './User.scss'

const User = ({ user, setUsers }) => {
  const [isFollow, setIsFollow] = useState(false)
  const buttonRef = useRef(null)

  const { isFollowOrNoFollow, toFollowUser, toUnFollowUser } = useFollow()

  const { followNoFollowData, followNoFollowLoading } = isFollowOrNoFollow(
    user.username
  )

  useEffect(() => {
    setIsFollow(followNoFollowData)
  }, [followNoFollowData])

  const handleHover = () => {
    buttonRef.current.textContent = 'Dejar de seguir'
  }

  const handleMouseOut = () => {
    buttonRef.current.textContent = 'Siguiendo'
  }

  const handleFollow = () => {
    toFollowUser(user)
      .then(({ dataFollow }) => {
        if (dataFollow) {
          setIsFollow(true)
          setUsers((users) => users.filter((u) => u.id !== user.id))
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleUnFollow = () => {
    toUnFollowUser(user)
      .then(({ dataUnFollow }) => {
        if (dataUnFollow) {
          setIsFollow(false)
          setUsers((users) => users.filter((u) => u.id !== user.id))
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  if (followNoFollowLoading) return null

  return (
    <div className='d-flex user-list'>
      <Link to={`/${user?.username}`}>
        <div className='flex-shrink-0'>
          <Image
            width={48}
            height={48}
            roundedCircle
            src={user.avatar ? user.avatar : AvatarNoFound}
            alt={`Avatar de ${user.name} ${user.lastname}`}
          />
        </div>
      </Link>
      <div className='flex-grow-1 ms-2'>
        <div className='user-list__flex'>
          <Link to={`/${user?.username}`}>
            <div className='user-list__flex-info'>
              <h5>
                {user.name} {user.lastname}
              </h5>
              <p>@{user.username}</p>
            </div>
          </Link>
          {isFollow ? (
            <Button
              ref={buttonRef}
              className='unFollow'
              onClick={handleUnFollow}
              onMouseOver={handleHover}
              onMouseOut={handleMouseOut}
            >
              Siguiendo
            </Button>
          ) : (
            <Button className='user' onClick={handleFollow}>
              Seguir
            </Button>
          )}
        </div>
        <Link to={`/${user.username}`}>
          <p>{user.biography}</p>
        </Link>
      </div>
    </div>
  )
}

export default User

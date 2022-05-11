import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'
import useFollow from '../../../hooks/useFollow'
import ConfigModal from '../../modals/ConfigModal'
import UserEditForm from '../../forms/UserEditForm'
import AvatarNoFount from '../../../assets/png/avatar.png'
import './BannerAvatar.scss'

const BannerAvatar = ({ dataUser }) => {
  const [showModal, setShowModal] = useState(false)
  const [isFollow, setIsFollow] = useState(false)
  const buttonRef = useRef(null)
  const { userAuth } = useAuth()
  const { isFollowOrNoFollow, toFollowUser, toUnFollowUser } = useFollow()

  const bannerUrl = dataUser?.banner
  const avatarUrl = dataUser?.avatar ? dataUser?.avatar : AvatarNoFount

  const { followNoFollowData, followNoFollowLoading } = isFollowOrNoFollow(
    dataUser?.username
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
    toFollowUser(dataUser)
      .then(({ dataFollow }) => {
        if (dataFollow) {
          setIsFollow(true)
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleUnFollow = () => {
    toUnFollowUser(dataUser)
      .then(({ dataUnFollow }) => {
        if (dataUnFollow) {
          setIsFollow(false)
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  if (followNoFollowLoading) return null

  return (
    <>
      <div
        className='banner-avatar'
        style={{ backgroundImage: `url('${bannerUrl}')` }}
      >
        <div
          className='avatar'
          style={{ backgroundImage: `url('${avatarUrl}')` }}
        />
        {dataUser && dataUser?.username === userAuth.username ? (
          <Button className='auth' onClick={() => setShowModal(true)}>
            Editar perfil
          </Button>
        ) : isFollow ? (
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
        <ConfigModal
          showModal={showModal}
          setShowModal={setShowModal}
          title='Editar perfil'
          children={
            <UserEditForm dataUser={dataUser} setShowModal={setShowModal} />
          }
        />
      </div>
    </>
  )
}

export default BannerAvatar

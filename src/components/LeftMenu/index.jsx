import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons'

import useAuth from '../../hooks/useAuth'
import TwittModal from '../modals/TwittModal'
import LogoWhite from '../../assets/png/logo-blanco.png'
import './LeftMenu.scss'

const LeftMenu = () => {
  const [showModal, setShowModal] = useState(false)
  const { userAuth, logoutUser } = useAuth()

  const handleClose = () => {
    logoutUser()
  }

  return (
    <>
      <div className='left-menu'>
        <img src={LogoWhite} className='logo' alt='Logo' />
        <Link to='/'>
          <FontAwesomeIcon icon={faHome} />
          Inicio
        </Link>
        <Link to='/'>
          <FontAwesomeIcon icon={faUsers} />
          Usuarios
        </Link>
        <Link to={`/${userAuth?.username}`}>
          <FontAwesomeIcon icon={faUser} />
          Perfil
        </Link>
        <p className='link' onClick={handleClose}>
          <FontAwesomeIcon icon={faPowerOff} />
          Cerrar sesión
        </p>
        <Button onClick={() => setShowModal(true)}>Twittear</Button>
      </div>
      <TwittModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default LeftMenu

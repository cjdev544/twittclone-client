import { Button, Col } from 'react-bootstrap'

import LoginForm from '../../../components/forms/LoginForm'
import RegisterForm from '../../../components/forms/RegisterForm'
import LogoWhite from '../../../assets/png/logo-blanco.png'
import './AuthRight.scss'

const AuthRight = ({ setShowModal, setChildren }) => {
  const handleModal = (typeModal) => {
    setShowModal(true)

    if (typeModal === 'register') {
      setChildren(<RegisterForm setShowModal={setShowModal} />)
    } else {
      setChildren(<LoginForm setShowModal={setShowModal} />)
    }
  }

  return (
    <Col className='auth-right' xs={6}>
      <div>
        <img src={LogoWhite} alt='Logo blanco' />
        <h2>Mira lo que está pasando en el mundo en este momento</h2>
        <h3>Unete hoy mismo</h3>
        <Button variant='primary' onClick={() => handleModal('register')}>
          Registrate
        </Button>
        <Button variant='outline-primary' onClick={() => handleModal('login')}>
          Iniciar sesión
        </Button>
      </div>
    </Col>
  )
}

export default AuthRight

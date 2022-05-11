import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../../assets/png/logo.png'
import './AuthLeft.scss'

const AuthLeft = () => {
  return (
    <Col className='auth-left' xs={6}>
      <img src={Logo} alt='Logo' />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Entérate de lo qué está hablando la gente.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Únete a la conversación.
        </h2>
      </div>
    </Col>
  )
}

export default AuthLeft

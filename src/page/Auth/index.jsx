import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'

import AuthLeft from './AuthLeft'
import AuthRight from './AuthRight'
import './Auth.scss'
import BasicModal from '../../components/modals/BasicModal'

const Auth = () => {
  const [showModal, setShowModal] = useState(false)
  const [children, setChildren] = useState(null)

  return (
    <>
      <Container fluid className='auth'>
        <Row>
          <AuthLeft />
          <AuthRight setShowModal={setShowModal} setChildren={setChildren} />
        </Row>
      </Container>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        children={children}
      />
    </>
  )
}

export default Auth

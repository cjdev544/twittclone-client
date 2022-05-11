import { Col, Container, Row } from 'react-bootstrap'
import LeftMenu from '../../LeftMenu'

import './BasicLayout.scss'

const BasicLayout = ({ children }) => {
  return (
    <Container className='basic-layout'>
      <Row>
        <Col xs={3} className='basic-layout__menu'>
          <LeftMenu />
        </Col>
        <Col xs={9} className='basic-layout__content'>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default BasicLayout

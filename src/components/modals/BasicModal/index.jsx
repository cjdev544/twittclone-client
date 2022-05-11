import { Modal } from 'react-bootstrap'

import LogoWhite from '../../../assets/png/logo-blanco.png'
import './BasicModal.scss'

const BasicModal = ({ showModal, setShowModal, children }) => {
  return (
    <Modal
      className='basic-modal'
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoWhite} alt='Logo' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default BasicModal

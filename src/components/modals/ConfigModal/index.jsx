import { Modal } from 'react-bootstrap'

import './ConfigModal.scss'

const ConfigModal = ({ showModal, setShowModal, title, children }) => {
  return (
    <Modal
      className='config-modal'
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title>
          <h2>{title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default ConfigModal

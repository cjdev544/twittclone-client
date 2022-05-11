import { Modal } from 'react-bootstrap'
import SendTwittForm from '../../forms/SendTwittForm'

import './TwittModal.scss'

const TwittModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      className='twitt-modal'
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SendTwittForm setShowModal={setShowModal} />
      </Modal.Body>
    </Modal>
  )
}

export default TwittModal

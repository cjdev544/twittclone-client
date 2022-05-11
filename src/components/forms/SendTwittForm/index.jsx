import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { EmojiButton } from '@joeattardi/emoji-button'

import useAuth from '../../../hooks/useAuth'
import AvatarNoFound from '../../../assets/png/avatar.png'
import './SendTwittForm.scss'

const SendTwittForm = ({ setShowModal }) => {
  const [message, setMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { userAuth } = useAuth()

  const picker = new EmojiButton()

  const handleEmoji = () => {
    console.log('entro')
    picker.togglePicker()
    picker.on('emoji', (selection) => {
      setMessage(message + selection.emoji)
    })
  }

  const handleChange = (e) => {
    if (message.length < 258) {
      setMessage(e.target.value)
      if (message.length > 0) {
        setIsDisabled(false)
      }
    } else {
      setIsDisabled(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('enviando...')
    setShowModal(false)
  }
  console.log(userAuth)
  return (
    <Form onSubmit={handleSubmit} className='send-twitt-form'>
      <div className='body'>
        <img src={userAuth?.avatar || AvatarNoFound} alt='Avatar de usuario' />
        <Form.Control
          as='textarea'
          rows='6'
          placeholder='¿Qué está pensando?'
          value={message}
          onChange={handleChange}
        />
      </div>
      <span>{message.length}/258</span>
      <div className='footer'>
        <div className='icon'>
          <FontAwesomeIcon icon={faFaceSmile} onClick={handleEmoji} />
        </div>
        <Button type='submit' disabled={isDisabled}>
          Enviar
        </Button>
      </div>
    </Form>
  )
}

export default SendTwittForm

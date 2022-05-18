import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { EmojiButton } from '@joeattardi/emoji-button'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'
import useTwitt from '../../../hooks/useTwitt'
import AvatarNoFound from '../../../assets/png/avatar.png'
import './SendTwittForm.scss'

const SendTwittForm = ({ setShowModal }) => {
  const [message, setMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const { userAuth } = useAuth()
  const { goCreateTwitt } = useTwitt()

  const picker = new EmojiButton()

  const handleEmoji = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await goCreateTwitt(message)
      setShowModal(false)
      toast.success('Publicación creada correctamente')
    } catch (err) {
      console.log(err)
      toast.error('Error al crear la publicación. Intentelo de nuevo')
    }
    setLoading(false)
  }

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
          {loading ? <Spinner animation='border' /> : 'Enviar'}
        </Button>
      </div>
    </Form>
  )
}

export default SendTwittForm

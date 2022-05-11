import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, FormControl, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'
import { setToken } from '../../../utils/token'
import './LoginForm.scss'

const LoginForm = ({ setShowModal }) => {
  const { sigInUser, getUserLogin } = useAuth()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    initialErrors: { email: 'El correo es obligatorio' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Formato de correo no valido')
        .required('El correo es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await sigInUser(values)
        setToken(res.data.loginUser)
        getUserLogin(res.data.loginUser)
        setShowModal(false)
      } catch (err) {
        toast.error(err.message)
      }
      setLoading(false)
    },
  })

  // Errors verifications and notification
  const handleClick = () => {
    if (Object.keys(formik.errors).length !== 0) {
      toast.warning(formik.errors[Object.keys(formik.errors)[0]])
    }
  }

  return (
    <div className='login-form'>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <FormControl
            type='text'
            name='email'
            placeholder='Correo electrónico'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            type='password'
            name='password'
            placeholder='Contraseña'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleClick}>
          {loading ? <Spinner animation='border' /> : 'Iniciar sesión'}
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm

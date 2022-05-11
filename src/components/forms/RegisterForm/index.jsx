import { useState } from 'react'
import { Button, Col, Form, FormControl, Row, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'
import './RegisterForm.scss'

const RegisterForm = ({ setShowModal }) => {
  const { createNewUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    initialErrors: { name: 'El nombre es obligatorio' },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      lastname: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string()
        .email('Formato de correo no valido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener almenos 6 caracteres')
        .required('La contraseña es obligatoria'),
      repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await createNewUser(values)
        setShowModal(false)
        toast.success('¡Registro exitoso! Puedes iniciar sesión')
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
    <div className='register-form'>
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <FormControl
                type='text'
                name='name'
                placeholder='Nombre'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Col>
            <Col>
              <FormControl
                type='text'
                name='lastname'
                placeholder='Apellido'
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
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
          <Row>
            <Col>
              <FormControl
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Col>
            <Col>
              <FormControl
                type='password'
                name='repeatPassword'
                placeholder='Repetir Contraseña'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleClick}>
          {loading ? <Spinner animation='border' /> : 'Registrarse'}
        </Button>
      </Form>
    </div>
  )
}

export default RegisterForm

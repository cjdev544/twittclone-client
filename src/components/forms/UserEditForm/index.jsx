import { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDropzone } from 'react-dropzone'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import useUser from '../../../hooks/useUser'
import './UserEditForm.scss'

const UserEditForm = ({ dataUser, setShowModal }) => {
  const { updateDataUser } = useUser()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      banner: dataUser?.banner || '',
      name: dataUser?.name,
      lastname: dataUser?.lastname,
      biography: dataUser?.biography || '',
      website: dataUser?.website || '',
      ubication: dataUser?.ubication || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      lastname: Yup.string().required('El apellido es obligatorio'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      values.banner = bannerFile
      values.avatar = avatarFile
      await updateDataUser(dataUser.id, values)
      setLoading(false)
      setShowModal(false)
    },
  })

  const [newBanner, setNewBanner] = useState(formik.values.banner || null)
  const [bannerFile, setBannerFile] = useState(null)
  const [newAvatar, setNewAvatar] = useState(formik.values.avatar || null)
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    setNewBanner(dataUser?.banner)
  }, [])

  useEffect(() => {
    setNewAvatar(dataUser?.avatar)
  }, [])

  // Errors verifications and notification
  const handleClick = () => {
    if (Object.keys(formik.errors).length !== 0) {
      toast.warning(formik.errors[Object.keys(formik.errors)[0]])
    }
  }

  const onDropBanner = useCallback((acceptedFiles) => {
    setBannerFile(acceptedFiles[0])
    setNewBanner(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const onDropAvatar = useCallback((acceptedFiles) => {
    setAvatarFile(acceptedFiles[0])
    setNewAvatar(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  })

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  })

  return (
    <div className='user-edit-form'>
      <div
        className='banner'
        style={{ backgroundImage: `url('${newBanner}')` }}
        {...getRootBannerProps()}
      >
        <FontAwesomeIcon icon={faCamera} />
        <input {...getInputBannerProps()} />
      </div>

      <div
        className='avatar'
        style={{ backgroundImage: `url('${newAvatar}')` }}
        {...getRootAvatarProps()}
      >
        <FontAwesomeIcon icon={faCamera} />
        <input {...getInputAvatarProps()} />
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type='text'
                placeholder='Nombre'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                type='text'
                placeholder='Apellido'
                name='lastname'
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            row='3'
            placeholder='Agrega tu biografía'
            type='text'
            name='biography'
            value={formik.values.biography}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                placeholder='Sitio web'
                type='text'
                name='website'
                value={formik.values.website}
                onChange={formik.handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='Ubicación'
                type='text'
                name='ubication'
                value={formik.values.ubication}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <div className='btn-div'>
          <Button
            className='btn-submit'
            variant='primary'
            type='submit'
            onClick={handleClick}
          >
            {loading ? <Spinner animation='border' /> : 'Actualizar'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UserEditForm

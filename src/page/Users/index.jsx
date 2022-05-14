import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

import useFollow from '../../hooks/useFollow'
import './Users.scss'

const Users = () => {
  const [users, setUsers] = useState([])
  const { authFollow } = useFollow()

  const handleGetFolloweds = () => {
    setUsers(authFollow?.authFolloweds)
  }

  const handleGetNoFolloweds = () => {
    setUsers(authFollow?.authNoFolloweds)
  }
  console.log(users)

  return (
    <div className='users'>
      <div className='users__header'>
        <h2>Usuarios</h2>
        <input type='text' placeholder='Busca un usuario...' />
      </div>
      <ButtonGroup className='users__options'>
        <Button onClick={handleGetFolloweds}>Siguiendo</Button>
        <Button onClick={handleGetNoFolloweds}>Nuevos</Button>
      </ButtonGroup>
    </div>
  )
}

export default Users

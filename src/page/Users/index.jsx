import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

import useFollow from '../../hooks/useFollow'
import useUser from '../../hooks/useUser'
import UsersList from '../../components/UsersList'
import './Users.scss'

const Users = () => {
  const [users, setUsers] = useState(null)
  const [isActive, setIsActive] = useState(null)
  const { authFollow } = useFollow()
  const { allDataSearchUsers, getUsersSearch } = useUser()

  const handleSearch = (e) => {
    if (e.target.value.length > 1) {
      getUsersSearch(e.target.value)
      setIsActive(null)
      setUsers(allDataSearchUsers.data?.searchUsers)
    }
  }

  const handleGetFolloweds = () => {
    setUsers(authFollow?.authFolloweds)
    setIsActive('followeds')
  }

  const handleGetFollowers = () => {
    setUsers(authFollow?.authFollowers)
    setIsActive('followers')
  }

  const handleGetNoFolloweds = () => {
    setUsers(authFollow?.authNoFolloweds)
    setIsActive('newUsers')
  }

  return (
    <div className='users'>
      <div className='users__header'>
        <h2>Usuarios</h2>
        <input
          type='text'
          placeholder='Busca un usuario...'
          onChange={handleSearch}
        />
      </div>
      <ButtonGroup className='users__options'>
        <Button
          className={isActive === 'followeds' && 'active'}
          onClick={handleGetFolloweds}
        >
          Siguiendo
        </Button>
        <Button
          className={isActive === 'followers' && 'active'}
          onClick={handleGetFollowers}
        >
          Segidores
        </Button>
        <Button
          className={isActive === 'newUsers' && 'active'}
          onClick={handleGetNoFolloweds}
        >
          Nuevos
        </Button>
      </ButtonGroup>
      {users && <UsersList users={users} setUsers={setUsers} />}
    </div>
  )
}

export default Users

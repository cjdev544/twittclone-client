import User from './User'

const UsersList = ({ users, setUsers }) => {
  if (users?.length === 0)
    return <h2 className='text-center mt-5'>No se encontraron usuarios</h2>
  //console.log(users)
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} setUsers={setUsers} />
      ))}
    </div>
  )
}

export default UsersList

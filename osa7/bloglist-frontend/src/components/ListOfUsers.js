import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Title } from '../Styles'

const ListOfUsers =() => {
  const users = useSelector(state => state.users)

  return (
    <Table>
      <Title> Users</Title>
      <table>
        <thead>
          <tr>
            <td></td>
            <td> blogs created </td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  )


}

export default ListOfUsers
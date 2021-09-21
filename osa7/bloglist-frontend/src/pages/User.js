import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Title } from '../Styles'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if(!user) {
    return null
  }
  return(
    <div>
      <Title>{user.username}</Title>
      <h4>added blogs</h4>
      {user.blogs.map((blog, i) => {
        return(
          <li key={i}>{blog.title}</li>
        )
      })}
    </div>
  )
}

export default User
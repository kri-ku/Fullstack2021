import React, { useRef } from 'react'

import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Togglable'
import CreateBlogForm from '../components/CreateBlogForm'
import ListOfBlogs from '../components/ListOfBlogs'

const Blogs =({ user }) => {

  const createBlogRef = useRef()

  return (
    <div>
      <Notification></Notification>
      {user === null ?
        <div>
          <LoginForm></LoginForm>
        </div> :
        <div>
          <Togglable buttonlabel="add new blog" ref={createBlogRef}>
            <CreateBlogForm ></CreateBlogForm>
          </Togglable>
          <ListOfBlogs></ListOfBlogs>
        </div>
      }
    </div>
  )
}

export default Blogs
import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import ListOfBlogs from './components/ListOfBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: '', type: '' })
  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    // prevent user logging out ecvery time page re renders
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      handleMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added to the list!`, 'accepted')
    } catch (error) {
      console.log('ERROR', error)
      handleMessage('Blog could not be added', 'rejected')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      handleMessage('Welcome!', 'accepted')
    } catch (exception) {
      handleMessage('wrong credentials', 'rejected')
    }

  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    handleMessage('logged out, welcome again', 'accepted')
  }

  const handleMessage = (title, type) => {
    setMessage({ text: title, type: type })
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 5000)

  }

  const removeBlog = async (blog_id) => {
    try {
      await blogService.remove(blog_id)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (error) {
      console.log('ERROR', error)
      handleMessage('Blog could not be deleted', 'rejected')
    }

  }

  const addLikes = async (blog) => {
    try {
      const newLikes = blog.likes + 1
      await blogService.modify(blog.id, { likes: newLikes })
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )

    } catch(error) {
      console.log('ERROR', error)
    }
  }


  return (
    <div>
      <h2>This in bloglist app</h2>
      <Notification message={message.text} type={message.type}></Notification>
      {user === null ?
        <div>
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}></LoginForm>
        </div> :
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogOut()}>logout</button></p>
          <Togglable buttonlabel="add new blog" ref={createBlogRef}>
            <CreateBlogForm createBlog={createBlog}></CreateBlogForm>
          </Togglable>
          <ListOfBlogs blogs={blogs} removeBlog={removeBlog} handleMessage={handleMessage} user={user} addLikes={addLikes}></ListOfBlogs>
        </div>
      }



    </div>
  )
}

export default App

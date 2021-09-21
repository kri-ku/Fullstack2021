import React, { useState, useEffect } from 'react'
import User from './pages/User'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Users from './pages/Users'

import GlobalStyle from './GlobalStyle'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import { Navigation, LogoutButton } from './Styles'


const App = () => {
  const [user, setUser] = useState(null)
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    // prevent user logging out ecvery time page re renders
    const loggedUserObject = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserObject) {
      setUser(JSON.stringify(loggedUserObject))
      blogService.setToken(JSON.parse(loggedUserObject).token)
    }
  },[loggedUser])

  const handleLogOut = () => {
    dispatch(logOut())
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification({ text: 'logged out, welcome again', class: 'accepted' }))
  }

  const padding = {
    padding: 5
  }

  const NavigationMenu =() => {
    return(
      <Navigation>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding}to='/users'>users</Link>
        {loggedUser === null ? <></>: <p style={{ padding: 5, display: 'inline-block' }}>{loggedUser.username} logged in <LogoutButton onClick={() => handleLogOut()}>logout</LogoutButton></p> }
      </Navigation>
    )
  }

  return (
    < Router>
      <GlobalStyle></GlobalStyle>
      {loggedUser !== null ? <NavigationMenu></NavigationMenu> : null}
      <Switch>
        <Route path='/users/:id'>
          {user ? <User/> : <Redirect to="/" />}
        </Route>
        <Route path='/users'>
          {user ? <Users/> : <Redirect to="/" />}
        </Route>
        <Route path='/blogs/:id'>
          {user ? <Blog/> : <Redirect to="/" />}
        </Route>
        <Route path='/blogs'>
          <Blogs user={user}></Blogs>
        </Route>
        <Route path='/'>
          <Blogs user={user}></Blogs>
        </Route>
      </Switch>
    </Router>

  )
}

export default App


import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const user = window.localStorage.getItem('loggedBlogappUser')
const userJSON = JSON.parse(user)

const userReducer = (state = userJSON, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }

}

export const login = (user) => {
  return async dispatch => {

    try {
      const loggedinUser = await loginService.login({ username: user.username, password: user.password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedinUser))
      blogService.setToken(loggedinUser.token)
      dispatch({
        type: 'LOGIN',
        data: loggedinUser

      })
      dispatch(setNotification({ text: 'Welcome!', class: 'accepted' }))

    } catch(err) {
      console.log('ERROR IN LOGIN', err)
      dispatch(setNotification({ text: 'wrong credentials', class: 'rejected' }))
    }

  }

}

export const logOut =() => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }

}
export default userReducer
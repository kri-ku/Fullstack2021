import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Input, Button } from '../Styles'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginToApplication =(event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    dispatch(login(user))

    event.target.username.value= ''
    event.target.password.value = ''


  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginToApplication} id='loginform'>
        <div>
          username
          <Input
            id='username'
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <Input
            id='password'
            type="password"
            name="password"
          />
        </div>
        <Button
          type="submit"
          id='loginbutton'>login</Button>
      </form>
    </div>
  )
}

export default LoginForm
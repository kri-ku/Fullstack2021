import React from 'react'
import { addNew } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Title } from '../Styles'

const CreateBlogForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const addBlog = async(event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      comments: []
    }

    dispatch(addNew(newBlog, user))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

  }

  return (
    <div>
      <Title>Create new Blog</Title>
      <form onSubmit={addBlog}>

        <div>
          title:
          <Input
            id= 'title'
            type='text'
            name='title'></Input>
        </div>
        <div>
            author:
          <Input
            id = 'author'
            type='text'
            name='author'></Input>
        </div>
        <div>
            url:
          <Input
            id = 'url'
            type='text'
            name='url'></Input>
        </div>
        <Button green type="submit">create</Button>

      </form>
    </div>
  )}

export default CreateBlogForm
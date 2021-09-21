import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from '../components/CommentForm'
import { initializeBlogs } from '../reducers/blogReducer'
import { Title, Button } from '../Styles'



const Blog =() => {

  const dispatch = useDispatch()
  const history = useHistory()

  const blogs = (JSON.parse(window.localStorage.getItem('blogs')))
  const blogsFromState = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const [number, setNumber] = useState(0) // just for reloading page

  useEffect(() => {
    window.localStorage.setItem('blogs', JSON.stringify(blogs))
  }, [blogsFromState])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  const confirm = (blog) => {
    const BlogToDelete = blog
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      history.push('/')
      dispatch(setNotification({ text: `blog ${BlogToDelete.title} by ${BlogToDelete.author} deleted!`, class: 'accepted' }))
    }
  }

  const addLikes = () => {
    dispatch(likeBlog(blog))
    const newNumber = number +1
    setNumber(newNumber)

  }


  return(
    <div>
      <Title>{blog.title} by {blog.author}</Title>
      <p>{blog.url}</p>
      <p id="likes">likes <span id="number">{blog.likes}</span> <Button green onClick={() => addLikes(blog)}>like</Button></p>
      <p>added by {blog.user.username}</p>
      {blog.user.username === user.username ?
        <Button className="button" onClick={() => confirm(blog)}>delete</Button> : <></>}
      <CommentForm blog={blog} comments ={blog.comments}></CommentForm>
    </div>
  )

}

export default Blog
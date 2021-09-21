import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Title } from '../Styles'

const ListOfBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes )

  useEffect(() => {
    window.localStorage.setItem('blogs', JSON.stringify(blogs))
  }, [blogs])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  return (
    <div className="listOfBlogs">
      <Title>blogs</Title>
      {
        sortedBlogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', textTransform: 'lowercase' }}>
              <div className="blog">
                {blog.title}
              </div>
            </Link>
          </div>
        )}
    </div>

  )}

export default ListOfBlogs
import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const ListOfBlogs = ({ blogs, removeBlog, handleMessage, user, addLikes }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes )
  return (
    <div className="listOfBlogs">
      <h2>blogs</h2>
      {
        sortedBlogs.map(blog =>
          <div key={blog.id}>
            <Blog key={blog.id} blog={blog} removeBlog={removeBlog} handleMessage={handleMessage} user={user} addLikes={addLikes} />
          </div>
        )}
    </div>

  )}
ListOfBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  removeBlog: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default ListOfBlogs
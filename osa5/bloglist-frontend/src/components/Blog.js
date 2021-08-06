import React, { useState } from 'react'

const Blog = ({ blog, removeBlog, handleMessage, user, addLikes }) => {

  const [showAll, setShowAll] = useState(false)
  let blogAdder = ''
  if (blog.user !== undefined) {
    blogAdder = blog.user.username
  }

  const confirm = (blog) => {
    const BlogToDelete = blog
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
      handleMessage(`blog ${BlogToDelete.title} by ${BlogToDelete.author} deleted!`, 'accepted')
    }
  }

  return (
    showAll ?
      <div className="blog_show_all">
        <p onClick={() => setShowAll(!showAll)}>{blog.title}<button className="button" onClick={() => setShowAll(false)}>hide</button></p>
        {blog.url}<br></br>
        <p id="likes">likes <span id="number">{blog.likes}</span> <button onClick={() => addLikes(blog)}>like</button></p><br></br>
        {blog.author}<br></br>
        {blogAdder === user.username ?
          <button className="button" style={{ color: 'blue' }} onClick={() => confirm(blog)}>delete</button> : <></>}

      </div > :
      <div className="blog" onClick={() => setShowAll(!showAll)}>
        {blog.title}
        <button id='viewbutton' className="button" onClick={() => setShowAll(true)}>view</button>
      </div>
  )
}

export default Blog
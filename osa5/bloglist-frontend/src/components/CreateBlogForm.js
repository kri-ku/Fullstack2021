import React, { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id= 'title'
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}></input>
        </div>
        <div>
            author:
          <input
            id = 'author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}></input>
        </div>
        <div>
            url:
          <input
            id = 'url'
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}>
          </input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}

export default CreateBlogForm
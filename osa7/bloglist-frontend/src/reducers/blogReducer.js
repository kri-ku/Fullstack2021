import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'


const blogReducer = (state = [], action) => {
  switch (action.type) {

  case 'INIT_BLOGS': {
    return action.data
  }
  case 'NEW_BLOG': {
    const newBlog = {
      title: action.data.title,
      author: action.data.author,
      url: action.data.url,
      likes: 0,
      id: action.data.id,
      user: action.user

    }
    return [... state, newBlog]
  }
  case 'REMOVE_BLOG': {
    const id = action.id
    return state.filter(blog => blog.id !== id)
  }
  case 'LIKE_BLOG': {
    const id = action.data
    const blogToLike = state.find(blog => blog.id === id)
    const votedBlog = { ... blogToLike, likes: blogToLike.likes + 1 }
    return state.map(blog => blog.id !== id ? blog : votedBlog)
  }
  case 'ADD_COMMENT': {
    const id = action.id
    const comment = action.comment
    const blogToComment = state.find(blog => blog.id === id)
    const newComments = blogToComment.comments.concat(comment)
    const commentedBlog = { ... blogToComment, comments: newComments }
    return state.map(blog => blog.id !== id ? blog : commentedBlog)
  }
  default:
    return state

  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addNew =(content, user) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
        user
      })
      dispatch(setNotification({ text: `a new blog ${newBlog.title} by ${newBlog.author} added to the list!`, class: 'accepted' }))

    } catch(err) {
      console.log('ERRORORO',err)
      dispatch(setNotification({ text: 'error adding blog', class: 'rejected' }))
    }

  }

}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }

}

export const likeBlog =(blog) => {
  return async dispatch => {
    const newLikes = blog.likes + 1
    await blogService.modify(blog.id, { ...blog, likes: newLikes })
    dispatch({
      type: 'LIKE_BLOG',
      data: blog.id
    })
  }

}

export const addComment =( blog_id, newComment) => {
  return async dispatch => {
    await blogService.addComment(blog_id, newComment)
    dispatch({
      type: 'ADD_COMMENT',
      id: blog_id,
      comment: newComment
    })

  }
}

export default blogReducer
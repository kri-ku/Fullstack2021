import React from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Input } from '../Styles'

const CommentForm = ({ blog, comments }) => {
  const dispatch = useDispatch()

  const addNewComment = async(event) => {
    event.preventDefault()
    const newComment = {
      comment: event.target.comment.value,
      blogId: blog.id
    }
    dispatch(addComment(blog.id, newComment))
    event.target.comment.value=''

  }

  return(
    <div>
      <h3>Comments</h3>
      {comments ? comments.map((comment, i) =>
        <p key={i}>{comment.comment}</p>): null}
      <form onSubmit={addNewComment}>
        <Input
          id='comment'
          type='text'
          name='comment'></Input>
        <Button type="submit">add comment</Button>
      </form>
    </div>
  )
}

export default CommentForm


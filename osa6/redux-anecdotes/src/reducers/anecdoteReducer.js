import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToLike = state.find(anecdote => anecdote.id === id)
      const likedAnecdote = { ...anecdoteToLike, votes: anecdoteToLike.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : likedAnecdote)

    case 'ADD_ANECDOTE':
      const newAnecdote = {
        content: action.data.content,
        votes: 0,
        id: action.data.id
      }
      return state.concat(newAnecdote)

    default: return state
  }

}

export const vote = (anecdote) => {
  return async dispatch => {
    const newVotes = anecdote.votes + 1
    await anecdoteService.modify(anecdote.id, { ...anecdote, votes: newVotes })
    const id = anecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const addNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}



export default anecdoteReducer
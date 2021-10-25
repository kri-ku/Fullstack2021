import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import LoginForm from './components/Loginform'
import Notification from './components/Notification'
import { useApolloClient, useSubscription} from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const [chosenGenre, setChosenGenre] = useState(null)

  const client = useApolloClient()

  const { data, loading, errori } = useSubscription(BOOK_ADDED) // loading and error not used, fix?

  useEffect(() => {
    if (data) {
      window.alert(`New Book ${data.bookAdded.title} added!`)
      setChosenGenre(null)
      setPage('books')

    }
  }, [data])

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }


  if (!token) {
    return (
      <div>
        <Notification errorMessage={error}></Notification>
        <LoginForm
          setToken={setToken}
          setError={setError}></LoginForm>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>{'  '}
        <button style={{ color: 'red' }} onClick={() => logOut()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        setError={setError}
      />

      <Books
        show={page === 'books'}
        chosenGenre={chosenGenre}
        setChosenGenre={setChosenGenre}
      />

      <NewBook
        show={page === 'add'}
        chosenGenre={chosenGenre}
        setChosenGenre={setChosenGenre}
        setError={setError}
      />

      <Recommendations show={page === 'recommend'}></Recommendations>

    </div>
  )
}

export default App
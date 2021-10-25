
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries'



const Books = (props) => {
  const allBooks_result = useQuery(ALL_BOOKS)
  const [getGenreBooks, genreResult] = useLazyQuery(FIND_BOOKS_BY_GENRE, {
    fetchPolicy: "network-only" // no caching
  })
  const [books, setBooks] = useState(null)

  const showBooksByGenre = (genre) => {
    if(genre) {
      console.log('GENRE', genre)
      getGenreBooks({ variables: { genre: genre } })
      props.setChosenGenre(genre)

    } else {
      setBooks(null)
      props.setChosenGenre(null)
    }
  }

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult])



  const ListOfGenreButtons = () => {
    const listOfLists = allBooks_result.data.allBooks.map(b => b.genres)
    const genresInOneList = [].concat.apply([], listOfLists)
    const uniqueList = [...new Set(genresInOneList)]
    return (
      <div>
        {uniqueList.map(u => <button key={u} onClick={() => showBooksByGenre(u)}>{u}</button>)}
        <button onClick={() => showBooksByGenre(null)}>all genres</button>
      </div>
    )

  }

  const TableIfAllBooks = () => {
    return (

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {allBooks_result.data.allBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    )
  }

  const TableIfGenreChosen = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    )

  }


  if (!props.show) {
    return null
  }

  if (allBooks_result.loading || genreResult.loading) {
    return <div>loading ...</div>
  }

  return (
    <div>
    <h2>Books</h2>
    {props.chosenGenre ? <p>in genre <strong>{props.chosenGenre}</strong></p> : null}
    {books ? <TableIfGenreChosen></TableIfGenreChosen> : <TableIfAllBooks></TableIfAllBooks>}
    <ListOfGenreButtons></ListOfGenreButtons>
  </div>

  )
}

export default Books
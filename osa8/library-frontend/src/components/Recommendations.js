import React, { useEffect, useState} from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { LOGGED_IN_INFO, FIND_BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
    const result = useQuery(LOGGED_IN_INFO)
    const [getGenreBooks, genreResult] = useLazyQuery(FIND_BOOKS_BY_GENRE)


    const [favoriteGenre, setFavoriteGenre] = useState(null)
    const [books, setBooks] = useState([])


    useEffect(()=> {
        if(result.data) {
            console.log('DATA', result.data)
            setFavoriteGenre(result.data.me.favoriteGenre)
        }
    }, [result])

    useEffect(()=> {
        getGenreBooks({variables: { genre: favoriteGenre }})
    }, [favoriteGenre, getGenreBooks])

    useEffect(()=> {
        if(genreResult.data) {
            setBooks(genreResult.data.allBooks)
        }
    }, [genreResult])

    if (!props.show) {
        return null
    }

    if (result.loading || genreResult.loading) {
        return <div>loading...</div>
    }

   return (
        <div>
            <h2>Recommendations</h2>
            {favoriteGenre ? <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>: null}
            
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

        </div>
    ) 
}

export default Recommendations
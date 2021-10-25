import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'

const BirthYearForm = (props) => {
    const [name, setName] = useState('')
    const [setBornTo, setYear] = useState('')
    const result = useQuery(ALL_AUTHORS)
    const [updateAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
    })

    const submit = async (event) => {
        event.preventDefault()

        if (name.length < 1) {
            props.setError('hello')
            //return // reloads the page and user not logged in, fix?
        }
        updateAuthor({ variables: { name, setBornTo } })
        setName('')
        setYear('')

    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name:
                    <select value={name} onChange={({ target }) => setName(target.value)} >
                        <option key={''}>select...</option>
                        {result.data.allAuthors.map(a => {
                            return <option key={a.name}>{a.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    born:
                    <input
                        value={setBornTo}
                        type='number'
                        onChange={({ target }) => setYear(parseInt(target.value))}>
                    </input>
                </div>
                <button>update author</button>
            </form>
        </div>
    )

}

export default BirthYearForm
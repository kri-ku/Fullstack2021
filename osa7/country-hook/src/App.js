import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (countryName) => {

  const [data, setData] = useState({})
  const [found, setFound] = useState(false)

  const url = `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        setData(response.data[0])
        setFound(true)

      } catch (err) {
        console.log("ERROR", err)
        setFound(false)
      }

    }

    fetchData()

  }, [countryName, url])

  return {
    data, found
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
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

export const useResource = (url) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                setResources(response.data)
            } catch (e) {
                console.log("ERROR", e)
            }
        }

        fetchData()
    }, [url])

    const create = async (resource) => {
        const response = await axios.post(url, resource)
        setResources(resources.concat(response.data))
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}
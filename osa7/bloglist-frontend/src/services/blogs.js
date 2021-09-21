import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const remove = async (BlogToDelete_id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${BlogToDelete_id}`, config)
}

const modify = async(BlogToModify_id, modifiedBlog) => {
  await axios.put(`${baseUrl}/${BlogToModify_id}`, modifiedBlog)
}

const addComment = async (blog_id, newComment) => {
  await axios.post(`${baseUrl}/${blog_id}/comments`, newComment)

}


export default { setToken, create, getAll, remove, modify, addComment }
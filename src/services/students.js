import axios from 'axios'
const baseUrl = 'http://localhost:3001/profile'

const getIncomplete = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const exportedObject = { getIncomplete, update }

export default exportedObject
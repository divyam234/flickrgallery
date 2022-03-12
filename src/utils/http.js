import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.flickr.com',
})
export default http
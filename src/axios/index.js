import axios from 'axios'

const url = 'http://localhost:3000'

const axiosShot = axios.create({
  baseURL: url
})

export default axiosShot

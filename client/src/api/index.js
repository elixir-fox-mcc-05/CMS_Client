import axios from 'axios'

const server = axios.create({
  // baseURL: 'https://toko-bangun-beli-tidur.herokuapp.com/'
  baseURL: 'http://localhost:3000/'
})

export default server

import axios from 'axios'

const server = axios.create({
  baseURL: 'https://toko-bangun-beli-tidur.herokuapp.com/'
})

export default server

import Axios from 'axios'

const server = Axios.create({
    baseURL: "https://mighty-garden-53836.herokuapp.com"
})

export default server
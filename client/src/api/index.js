import axios from "axios";

const server = axios.create({
  baseURL: "https://safe-spire-19802.herokuapp.com/"
});

export default server;

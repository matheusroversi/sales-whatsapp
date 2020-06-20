import axios from "axios";

const SERVER_ADDRESS = "https://numenu-backend.herokuapp.com";

export default axios.create({
  baseURL: SERVER_ADDRESS,
  withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
});

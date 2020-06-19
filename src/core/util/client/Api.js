import axios from "axios";

const SERVER_ADDRESS = process.env.API_SERVER_ADDRESS || "http://localhost:8080";

export default axios.create({
  baseURL: SERVER_ADDRESS,
  withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
});

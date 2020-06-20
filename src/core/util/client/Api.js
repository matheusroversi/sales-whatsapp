import axios from "axios";

import { REACT_APP_API_ADDRESS } from "../../../helpers/environment";

export default axios.create({
  baseURL: REACT_APP_API_ADDRESS,
  withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
});

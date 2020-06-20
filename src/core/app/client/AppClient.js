import Api from "../../util/client/Api";

const API_SERVER_ADDRESS =
  process.env.API_SERVER_ADDRESS || "http://localhost:8080";

export default {
  async getLogin() {
    Api.get(`${API_SERVER_ADDRESS}/auth/google`);
  },
  async getMe() {
    return Api.get(`${API_SERVER_ADDRESS}/me`);
  },
  async getUser() {
    return Api.get(`${API_SERVER_ADDRESS}/user`, { withCredentials: true });
  },
  async getCategories() {
    return Api.get(`${API_SERVER_ADDRESS}/categories`);
  },
  async getProducts() {
    return Api.get(`${API_SERVER_ADDRESS}/products`);
    /* return await new Promise((resolve, reject) => {
			resolve(products)
		}) */
  },
};

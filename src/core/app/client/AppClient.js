import Api from "../../util/client/Api";

const SERVER_ADDRESS =
  process.env.API_SERVER_ADDRESS || "http://localhost:8080";

export default {
  async getLogin() {
    Api.get(`${SERVER_ADDRESS}/auth/google`);
  },
  async getMe() {
    return Api.get(`${SERVER_ADDRESS}/me`);
  },
  async getUser() {
    return Api.get(`${SERVER_ADDRESS}/user`, { withCredentials: true });
  },
  async getCategories() {
    return Api.get(`${SERVER_ADDRESS}/categories`);
  },
  async getProducts() {
    return Api.get(`${SERVER_ADDRESS}/products`);
    /* return await new Promise((resolve, reject) => {
			resolve(products)
		}) */
  },
};

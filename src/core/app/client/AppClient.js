import Api from "../../util/client/Api";
import categories from "../../../file/menu.categories.web.json";
import products from "../../../file/menu.products.web.json";

const API_SERVER_ADDRESS =
  process.env.API_SERVER_ADDRESS || "http://localhost:8080";

export default {
  async getLogin() {
    Api.get(`${API_SERVER_ADDRESS}/auth/google`);
  },
  async getMe() {
    return Api.get("/me");
  },
  async getUser() {
    return Api.get("/user", { withCredentials: true });
  },
  async getCategories() {
    return Api.get("/categories");
    /* return await new Promise((resolve, reject) => {
			resolve(categories)
		}) */
  },
  async getProducts() {
    return Api.get("/products");
    /* return await new Promise((resolve, reject) => {
			resolve(products)
		}) */
  },
};

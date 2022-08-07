import Api from "../../util/client/Api";

export default {
  async getLogin() {
    Api.get(`/auth/google`);
  },
  async getMe() {
    return Api.get(`/me`);
  },
  async getUser() {
    return Api.get(`/user`, { withCredentials: true });
  },
  async getCategories() {
    return Api.get(`/categories`);
  },
  async getProducts() {
    return Api.get(`/products`);
  },
  async saveProducts(object) {
    return Api.put(`/products`, object);
  },
  async deleteProduct(id) {
    return Api.delete(`/products/${id}`);
  }
};

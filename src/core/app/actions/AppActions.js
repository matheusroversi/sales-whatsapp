import AppClient from "../client/AppClient";
import ACTION_TYPES from "../action-types/AppActionTypes";
import { replace } from "connected-react-router";
// noinspection JSAnnotator

export default {
  requestMe() {
    return async (dispatch) => {
      var { data: me } = await AppClient.getMe();

      dispatch({
        type: ACTION_TYPES.REQUEST_ME,
        payload: me,
      });
    };
  },

  requestUser() {
    return async (dispatch) => {
      var { data: user } = await AppClient.getUser();
      dispatch({
        type: ACTION_TYPES.REQUEST_USER,
        payload: user,
      });
    };
  },

  requestChangePage(route, confirm) {
    return async (dispatch) => {
      dispatch(replace(route));
      this.requestCurrentPage(route);
    };
  },

  requestCategories() {
    return async (dispatch) => {
      let { data: categories } = await AppClient.getCategories();
      dispatch({
        type: ACTION_TYPES.REQUEST_CATEGORIES,
        payload: categories,
      });
    };
  },
  requestProducts() {
    return async (dispatch) => {
      let { data: products } = await AppClient.getProducts();
      dispatch({
        type: ACTION_TYPES.REQUEST_PRODUCTS,
        payload: products,
      });
    };
  },
  addCard(product, amount) {
    return async (dispatch) => {
      dispatch({
        type: ACTION_TYPES.ADD_CARD,
        payload: { product, amount },
      });
    };
  },
  subCard(product, amount) {
    return async (dispatch) => {
      dispatch({
        type: ACTION_TYPES.SUB_CARD,
        payload: { product, amount },
      });
    };
  },
  setSearchText(searchText) {
    return async (dispatch) => {
      dispatch({
        type: ACTION_TYPES.SET_SEARCH_TEXT,
        payload: { searchText },
      });
    };
  },
  requestLogin() {
    return async (dispatch) => {
      AppClient.login();
    };
  },
};

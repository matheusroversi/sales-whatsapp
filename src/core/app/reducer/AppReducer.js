import ACTION_TYPES from "../action-types/AppActionTypes";
import storage from "../storage/AppStorage";
import { getDefaultTheme, toggleTheme } from "../../../Themes";

export const initialState = {
  me: {},
  user: null,
  categories: [],
  products: [],
  card: [],
  theme: storage.getTheme(getDefaultTheme()),
  searchText: "",
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ACTION_TYPES.REQUEST_ME: {
      const me = payload;
      /* localStorage.setItem(
				'me',
				JSON.stringify({ company: data.companyId, email: data.user.email })
			) */
      return {
        ...state,
        me: me,
      };
    }
    case ACTION_TYPES.REQUEST_USER: {
      const user = payload;
      /* localStorage.setItem(
				  'me',
				  JSON.stringify({ company: data.companyId, email: data.user.email })
			  ) */
      return {
        ...state,
        user: user,
      };
    }

    /*
		case ACTION_TYPES.REQUEST_CHANGE_PAGE: {
			// const { route } = payload
			return { ...state }
		}
		case ACTION_TYPES.REQUEST_CURRENT_PAGE: {
			const { route, breadCrumbsSections, appHeaderTitle } = payload
			return {
				...state,
				route,
				breadCrumbsSections,
				appHeaderTitle,
			}
		} */
    case ACTION_TYPES.ADD_CARD:
      var { product, amount } = payload;

      var _card = JSON.parse(JSON.stringify(state.card));
      var index = state.card.findIndex((item) => item.id === product.id);

      if (index < 0) {
        product.amount = amount;
        _card.push(product);
      } else {
        _card[index].amount += amount;
      }

      return {
        ...state,
        card: _card,
      };
    case ACTION_TYPES.SUB_CARD:
      var { product, amount } = payload;

      var _card = state.card;
      var index = state.card.findIndex((item) => item.id === product.id);

      if (index < 0) {
        product.amount = amount;
        _card.push(product);
      } else {
        _card[index].amount -= amount;
      }

      return {
        ...state,
        card: _card,
      };
    case ACTION_TYPES.REQUEST_CATEGORIES:
      let categories = payload;
      return {
        ...state,
        categories: categories,
      };

    case ACTION_TYPES.REQUEST_PRODUCTS:
      let products = payload;
      return {
        ...state,
        products: products,
      };
    case ACTION_TYPES.SET_SEARCH_TEXT:
      let { searchText } = payload;
      return {
        ...state,
        searchText: searchText,
      };

    default:
      return state;
  }
};

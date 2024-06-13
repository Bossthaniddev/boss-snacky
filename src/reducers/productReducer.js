import { ActionType } from "../actions/productAction";

const initialState = {
  products: [],
  currentProduct: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
      
    case ActionType.EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => (product.id === action.payload.id ? action.payload : product)),
      };
    default:
      return state;
  }
};

export default productReducer;


import { ActionType } from "../actions/productAction";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  currentCart: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ActionType.GET_TOTAL_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

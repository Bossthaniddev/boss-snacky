import axios from "axios";

export const ActionType = {
  FETCH_PRODUCT: 'FETCH_PRODUCT',
  FETCH_PRODUCT_ERROR: 'FETCH_PRODUCT_ERROR',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  EDIT_PRODUCT_ERROR: 'EDIT_PRODUCT_ERROR',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  DELETE_ITEM_FROM_CART: 'DELETE_ITEM_FROM_CART',
  GET_TOTAL_CART: 'GET_TOTAL_CART',
};

const apiUrl = 'https://666415d3932baf9032a9e9a6.mockapi.io/api/v1/products';

export const fetchProduct = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: ActionType.FETCH_PRODUCT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.FETCH_PRODUCT_ERROR,
      payload: error.message,
    });
  }
};

export const editProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${product.id}`, product);
    dispatch({ type: ActionType.EDIT_PRODUCT, payload: response.data });
    return { success: true };
  } catch (error) {
    dispatch({ type: ActionType.EDIT_PRODUCT_ERROR, payload: error.message });
    return { success: false, message: error.message };
  }
};

export const fetchCart = (items) => ({
  type: ActionType.ADD_ITEM_TO_CART,
  payload: items,
});

export const fetchTotalCart = (items) => ({
  type: ActionType.GET_TOTAL_CART,
  payload: items,
});

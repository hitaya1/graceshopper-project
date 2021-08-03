import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';

/**
 * ACTION CREATORS
 */
const setProducts = products => ({type: SET_PRODUCTS, products});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products`);

      dispatch(setProducts(response.data));
    } catch (e) {
      //error page:
      //dispatch(errorProduct());
      console.error('I think the cats have eaten, broken, or otherwise disabled the products.');
      console.error(e);
    }
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

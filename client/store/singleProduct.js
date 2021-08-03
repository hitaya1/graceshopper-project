import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setSingleProduct = singleProduct => ({type: SET_SINGLE_PRODUCT, singleProduct});

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (productId) => async dispatch => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);

      dispatch(setSingleProduct(response.data));
    } catch (e) {
      //error page:
      //dispatch(errorProduct());
      console.error('I think the cats have eaten, broken, or otherwise disabled this product.');
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

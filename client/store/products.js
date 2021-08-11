import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const ORGANIZE_PRODUCTS = 'ORGANIZE_PRODUCTS';

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const makeProduct = (product) => ({ type: CREATE_PRODUCT, product });
const _deleteProduct = (product) => ({ type: DELETE_PRODUCT, product });
const organizeProducts = (products) => ({ type: ORGANIZE_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/products`);

			dispatch(setProducts(response.data));
		} catch (e) {
			console.error(
				'I think the cats have EATEN, broken, or otherwise disabled the products.'
			);
			console.error(e);
		}
	};
};

export const createProduct = (product, user, history) => {
	return async (dispatch) => {
		if (user.isAdmin){
			const { data: created } = await axios.post('/api/products', product);
			dispatch(makeProduct(created));
			history.push('/products');
		} else{
			history.push('/error');
			console.error('add product failed. admin required.');
		}
	};
};
export const deleteProduct = (id, user, history) => {
	return async (dispatch) => {
		if (user.isAdmin){
			const { data } = await axios.delete(`/api/products/${id}`);
			dispatch(_deleteProduct(data));
		} else{
			history.push('/error');
			console.error('delete failed. admin required.');
		}
	};
};

export const rearrangeProducts = (products) => {
  return (dispatch) => {
    try {
      dispatch(organizeProducts(products));
    } catch (e) {
      console.error('rearrange failed');
      console.error(e);
    }
  };
};
/**
 * REDUCER
 */
export default function (state = [], action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		case CREATE_PRODUCT:
			return [...state, action.product];
		case ORGANIZE_PRODUCTS:
			return action.products;
		case DELETE_PRODUCT:
			return state.filter(
				(product) => product.productId !== action.product.productId
			);
		default:
			return state;
	}
}

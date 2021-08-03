import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const makeProduct = (product) => ({ type: CREATE_PRODUCT, product });
const _deleteProduct = (product) => ({ type: DELETE_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async (dispatch) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/products`);

			dispatch(setProducts(response.data));
		} catch (e) {
			//error page:
			//dispatch(errorProduct());
			console.error(
				'I think the cats have eaten, broken, or otherwise disabled the products.'
			);
			console.error(e);
		}
	};
};

export const createProduct = (product) => {
	return async (dispatch) => {
		const { data: created } = await axios.post('/api/products', product);
		dispatch(makeProduct(created));
	};
};
export const deleteProduct = (id) => {
	return async (dispatch) => {
		const { data: product } = await axios.delete(`/api/products/${id}`);
		dispatch(_deleteProduct(product));
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
		case DELETE_PRODUCT:
			return state.filter((product) => product.id !== action.product.id);
		default:
			return state;
	}
}

import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
/**
 * ACTION CREATORS
 */
const setSingleProduct = (singleProduct) => ({
	type: SET_SINGLE_PRODUCT,
	singleProduct,
});
const _editProduct = (product) => ({ type: EDIT_PRODUCT, product });
/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (productId) => async (dispatch) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/products/${productId}`);

			dispatch(setSingleProduct(response.data));
		} catch (e) {
			//error page:
			//dispatch(errorProduct());
			console.error(
				'I think the cats have eaten, broken, or otherwise disabled this product.'
			);
			console.error(e);
		}
	};
};

export const editProduct = (product) => {
	return async (dispatch) => {
		const { data: edited } = await axios.put(
			`/api/products/${product.id}`,
			product
		);
		dispatch(_editProduct(edited));
	};
};

/**
 * REDUCER
 */
export default function (state = [], action) {
	switch (action.type) {
		case SET_SINGLE_PRODUCT:
			return action.products;
		case EDIT_PRODUCT:
			return state.map((product) =>
				product.id === action.product.id ? action.product : product
			);
		default:
			return state;
	}
}
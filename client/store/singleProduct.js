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
export const fetchSingleProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const response = await axios.get(`/api/products/${productId}`, {
				headers: {
					authorization: token
				}
			});
			dispatch(setSingleProduct(response.data));
		} catch (e) {
			window.location.replace('/error');
			console.error(e);
		}
	};
};

export const editProduct = (product, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data: edited } = await axios.put( `/api/products/${product.id}`, product, {
				headers: {
					authorization: token
				}
			});
			dispatch(_editProduct(edited));
			history.push(`/products/${product.id}`);
		} catch(e) {
			window.location.replace('/error');
			console.error(e);
		}
	};
};

export const updateProduct = (product) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data: edited } = await axios.put( `/api/products/${product.id}/checkout`, product, {
					headers: {
						authorization: token
					}
				});
			dispatch(_editProduct(edited));
		} catch(e) {
			window.location.replace('/error');
			console.error(e);
		}
	};
};
/**
 * REDUCER
 */
export default function (state = [], action) {
	switch (action.type) {
		case SET_SINGLE_PRODUCT:
			return action.singleProduct;
		case EDIT_PRODUCT:
			return action.product;
		default:
			return state;
	}
}

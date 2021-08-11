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
export const fetchProducts = (history) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const response = await axios.get(`/api/products`, {
				headers: {
					authorization: token
				}
			});

			dispatch(setProducts(response.data));
		} catch (e) {
			window.location.replace('/error');
			console.error(e);
		}
	};
};

export const createProduct = (product, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data: created } = await axios.post('/api/products', product, {
				headers: {
					authorization: token
				}
			});
			dispatch(makeProduct(created));
			history.push('/products');
		} catch(e){
			window.location.replace('/error');
			console.error(e);
		}
	};
};
export const deleteProduct = (id, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data } = await axios.delete(`/api/products/${id}`, {
				headers: {
					authorization: token
				}
			});
			dispatch(_deleteProduct(data));
		} catch(e){
			window.location.replace('/error');
			console.error(e);
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

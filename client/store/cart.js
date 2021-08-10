import { fetchProducts } from './products';
import axios from 'axios'
import { copy } from 'superagent';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART = 'UPDATE_CART';
const GET_CART = 'GET_CART';
const CART_CHECKOUT = 'CART_CHECKOUT'

export const _addToCart = (product) => {
	return {
		type: ADD_TO_CART,
		product
	};
};

export const _removeFromCart = (productId) => {
	return {
		type: REMOVE_FROM_CART,
		productId
	};
};

export const _updateCart = (product) => {
	return {
		type: UPDATE_CART,
		product
	};
};

export const _getCart = (cart) => {
	return {
		type: GET_CART,
		cart,
	};
};

export const _cartCheckout = (checkout) => {
	return {
		type: CART_CHECKOUT,
		checkout
	}
}

export const getCart = (userId) => {
	return async (dispatch) => {
		try {
			const {data} = await axios.get(`/api/users/${userId}/cart`)
			dispatch(_getCart(data))
		} catch (error) {
			console.log('cart thunk wrong', error)
		}
	}
}

export const addToCart = (userId, productId) => {
	return async (dispatch) => {
		try {
			const {data} = await axios.post(`/api/users/${userId}/cart`, {
				productId: productId,
			})
			dispatch(_addToCart(data))
		} catch (error) {
			console.log('cart thunk wrong', error)
		}
	}
}

export const updateCart = (userId, productId, quantity) => {
	return async (dispatch) => {
		try {
			const {data} = await axios.put(`/api/users/${userId}/cart`, {
				productId: productId,
				quantity: quantity
			})
			dispatch(_updateCart(data))
		} catch (error) {
			console.log('cart thunk wrong', error)
		}
	}
}

export const removeFromCart = (userId, productId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/users/${userId}/cart/${productId}`)
			dispatch(_removeFromCart(productId))
		} catch (error) {
			console.log('cart thunk wrong', error)
		}
	}
}

export const cartCheckout = (userId, orderId) => {
	return async (dispatch) => {
		try {
			const {data} = await axios.put(`/api/users/${userId}/order/${orderId}`)
			dispatch(_cartCheckout(data))
		} catch (error) {
			console.error(error)
		}
	}
}

const initialState = {
	cart: [],
}

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CART: {
			return {...state, cart: action.cart}
		}
		case ADD_TO_CART: {
			console.log('STATE INSIDE CART REDUCER', state)
			const inCart = state.cart.map((product) =>
			product.id).includes(action.product.id)

			if(inCart) {
				let copyCart = state.cart.map(product => {
					if(product.id === action.product.id) {
						return action.product
					} else {
						return product
					}
			})
			return {...state, cart: copyCart}
		} else {
			return {...state, cart: [...state.cart, action.product]}
			}
		}
		case UPDATE_CART: {
			let copyCart = state.cart.map(product => {
				if(product.product.id === action.product.id) {
					return action.product
				} else {
					return product
				}
			})
				return {...state, cart: copyCart}
			}
		case REMOVE_FROM_CART: {
			return {...state, cart: state.cart.filter(
				product => product.id !== action.product.id
			)}
		}
		case CART_CHECKOUT: {
			return initialState
		}
		default:
			return state;
	}
};

export default cartReducer;
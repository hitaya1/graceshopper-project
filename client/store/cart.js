import axios from 'axios';

const CREATE_CART = 'CREATE_CART';


const initialState = {
	cart: [],

};

export const _createCart = (cart) => {
	return {
		type: CREATE_CART,
		cart,
	};
};

export const createCart = (userId, cart) => {
	return async (dispatch) => {
		try {
			let obj = {userId, cart}
			const newOrder = await axios.post('/api/checkout', obj);
			dispatch(_createCart(newOrder));
		} catch (error) {
			console.error(error);
		}
	};
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_CART:
			return { ...state, cart: action.cart };
		
		default:
			return state;
	}
};

export default cartReducer;

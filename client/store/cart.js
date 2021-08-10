import axios from 'axios';
import { fetchProducts } from './products';

const ADD_TO_CART = 'ADD_TO_CART';
const CREATE_CART = 'CREATE_CART';
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// const ADJUST_QUANTITY = 'ADJUST_QUANTITY';
// const LOAD_CURR_ITEM = 'LOAD_CURR_ITEM';

const initialState = {
	// products: [],
	cart: [
		// { name: 'banana', id: '111', image: '/pics/download.png', quantity: 0 },
	],
	// currItem: null,
};

export const addToCart = (id, name, image, quantity) => {
	return {
		type: ADD_TO_CART,
		id,
		name,
		image,
		quantity,
	};
};

export const _createCart = (cart) => {
	return {
		type: CREATE_CART,
		cart,
	};
};

// export const removeFromCart = (id) => {
// 	return {
// 		type: REMOVE_FROM_CART,
// 		id,
// 	};
// };

// export const adjustQuantity = (id, qty) => {
// 	return {
// 		type: ADJUST_QUANTITY,
// 		product: {
// 			id,
// 			qty,
// 		},
// 	};
// };

// export const loadCurrItem = (product) => {
// 	return {
// 		type: LOAD_CURR_ITEM,
// 		product,
// 	};
// };


export const createCart = (userId, cart) => {
	return async (dispatch) => {
		try {
			//grab user by user id
			//create order(auto id, auto iscompleted='false')
			//assign order to the user
			let obj = {userId, cart}
			// const user = await axios.get(`/api/users/${userId}`);
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
		// case ADD_TO_CART: {
		// 	const item = state.products.find((product) => product.id === action.id);

		// 	const inCart = state.cart.find((item) =>
		// 		item.id === action.id ? true : false
		// 	);
		// 	return {
		// 		...state,
		// 		cart: inCart
		// 			? state.cart.map((item) =>
		// 					item.id === action.id
		// 						? {
		// 								...item,
		// 								quantity: item.quantity + 1,
		// 								name: action.name,
		// 								image: action.image,
		// 						  }
		// 						: item
		// 			  )
		// 			: [
		// 					...state.cart,
		// 					{ ...item, quantity: 1, name: action.name, image: action.image },
		// 			  ],
		// 	};
		// }
		default:
			return state;
	}
};

export default cartReducer;

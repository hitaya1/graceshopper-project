const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADJUST_QUANTITY = 'ADJUST_QUANTITY';
const LOAD_CURR_ITEM = 'LOAD_CURR_ITEM';

const initialState = {
	products: [],
	cart: [{ name: 'banana', id: '111', image: '/pics/cart.png' }],
	currItem: null,
};

export const addToCart = (id, name, image) => {
	return {
		type: ADD_TO_CART,
		id,
		name,
		image,
	};
};

export const removeFromCart = (id) => {
	return {
		type: REMOVE_FROM_CART,
		id,
	};
};

export const adjustQuantity = (id, qty) => {
	return {
		type: ADJUST_QUANTITY,
		product: {
			id,
			qty,
		},
	};
};

export const loadCurrItem = (product) => {
	return {
		type: LOAD_CURR_ITEM,
		product,
	};
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			// const item = state.products.find((product) => product.id === action.id);
			const item = { name: 'banana', id: '111', image: '/pics/cart.png' };
			// const inCart = state.cart.find((item) =>
			// 	item.id === action.id ? true : false
			// );
			return [
				...state.cart,
				{ ...item, qty: 1, name: item.name, image: item.image },
			];
		}
		// {
		// ...state,
		// cart: inCart
		// 	? state.cart.map((item) =>
		// 			item.id === action.id
		// 				? {
		// 						...item,
		// 						qty: item.qty + 1,
		// 						name: item.name,
		// 						image: item.image,
		// 				  }
		// 				: item
		// 	  ) :

		// };
		// }
		default:
			return state;
	}
};

export default cartReducer;

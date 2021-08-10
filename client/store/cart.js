import { fetchProducts } from './products';

const ADD_TO_CART = 'ADD_TO_CART';
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// const ADJUST_QUANTITY = 'ADJUST_QUANTITY';
// const LOAD_CURR_ITEM = 'LOAD_CURR_ITEM';

const initialState = {
	products: [],
	cart: [{ name: 'banana', id: '111', image: '/pics/download.png', quantity: 0}],
	currItem: null,
};

export const addToCart = (id, name, image, quantity) => {
	return {
		type: ADD_TO_CART,
		id,
		name,
		image,
		quantity
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

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			const item = state.products.find((product) => product.id === action.id);

			const inCart = state.cart.find((item) =>
				item.id === action.id ? true : false
			);
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
							item.id === action.id
								? {
										...item,
										quantity: item.quantity + 1,
										name: action.name,
										image: action.image,
								  }
								: item
					  )
					: [
							...state.cart,
							{ ...item, quantity: 1, name: action.name, image: action.image },
					  ],
			};
		}
		default:
			return state;
	}
};

export default cartReducer;

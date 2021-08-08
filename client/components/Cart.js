import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cartReducer from '../store/cart';

export const Cart = (props) => {
	// console.log('this is inside CART COMPONENET', props);
	let [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');

	const removeFromCart = (productId) => {
		let copyCart = [...cart];
		copyCart = copyCart.filter((product) => product.id !== productId);
		setCart(copyCart);

		let cartString = JSON.stringify(copyCart);
		localStorage.setItem('cart', cartString);
	};
	console.log('CART INSIDE CART COMPONENET', cart);

	// const inputAmount = (productId, amount) => {
	// 	let copyCart = [...cart];
	// 	let exisitingProd = copyCart.find((product) => product.id === productId);
	// 	if (!exisitingProd) return;
	// 	if(!amount) return;
	// 	exisitingProd.quantity += amount;

	// 	if (exisitingProd.quantity <= 0) {
	// 		copyCart = copyCart.filter((product) => product.id !== productId);
	// 	}

	// 	setCart(copyCart);
	// 	let cartString = JSON.stringify(copyCart);
	// 	localStorage.setItem('cart', cartString);
	// };

	const plusButton = (productId) => {
		let copyCart = [...cart];
		let exisitingProd = copyCart.find((product) => product.id === productId);
		if (!exisitingProd) return;
		exisitingProd.quantity++;

		setCart(copyCart);
		let cartString = JSON.stringify(copyCart);
		localStorage.setItem('cart', cartString);
	};

	const minusButton = (productId) => {
		let copyCart = [...cart];
		let exisitingProd = copyCart.find((product) => product.id === productId);
		if (!exisitingProd) return;
		exisitingProd.quantity--;

		if (exisitingProd.quantity <= 0) {
			copyCart = copyCart.filter((product) => product.id !== productId);
		}

		setCart(copyCart);
		let cartString = JSON.stringify(copyCart);
		localStorage.setItem('cart', cartString);
	};

	useEffect(() => {
		localCart = JSON.parse(localCart);
		if (localCart) {
			setCart(localCart);
		}
	}, []);

	let index = 0;
	return (
		<div>
			{cart && cart.length ? (
				<div>
					{cart.map((product) => {
						// console.log(product);
						index++;
						return (
							<div key={index} className="cartProducts">
								{product.name}
								<img src={product.image} />
								Price: {product.price}
								Total: {product.quantity * product.price}
								Quantity:
								<button
									onClick={() => {
										minusButton(product.id);
									}}
								>
									-
								</button>
								{/* <input
									type="number"
									onClick={() => {
										inputAmount(product.id, product.amount);
									}}
								></input> */}
								{product.quantity}
								<button
									onClick={() => {
										plusButton(product.id);
									}}
								>
									+
								</button>
								<button
									onClick={() => {
										removeFromCart(product.id);
									}}
								>
									remove
								</button>
							</div>
						);
					})}
					Cart Total:
					{cart.reduce((total, curr) => {
						total += curr.price * curr.quantity;
						return total;
					}, 0)}
				</div>
			) : (
				<div>Cats destroyed everything, run for your life!</div>
			)}
			<Link to="/checkout">
				<button>Checkout</button>
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart.cart,
		products: state.products,
	};
};
export default connect(mapStateToProps)(Cart);

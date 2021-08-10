import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cartReducer, { getCart, updateCart, removeFromCart, cartCheckout } from '../store/cart';

export const Cart = (props) => {
	let [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');
	console.log('this is FUNCTIONAL COMPONENT CART', props)

	const removeFromCart = (productId) => {
		let copyCart = [...cart];
		copyCart = copyCart.filter((product) => product.id !== productId);
		setCart(copyCart);

		let cartString = JSON.stringify(copyCart);
		localStorage.setItem('cart', cartString);
	};

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
	console.log('FROM MAPSTATE IN CART COMPONENt', props.state)

	let index = 0;
	return (
		<div>
			{cart && cart.length ? (
				<div>
					{cart.map((product) => {
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
				<div>Your cart is empty!</div>
			)}
			{cart && cart.length ? <Link to="/checkout">
				<button>Checkout</button>
			</Link> : <div></div>}

		</div>
	);
};

class Carts extends React.Component {
	constructor(props) {
		super(props)
		// this.handleClick = this.handleAdd.bind(this)
	}
	componentDidMount() 
	{
		console.log('THIS IS CARTS', this.props)
		this.props.getCart(this.props.match.params.userId)
	}

	// handleAdd() {
	// 	this.props.
	// }


	render() {
		console.log('CART INSIDE CART RENDER', this.props)
		const {cart} = this.props;
		let index = 0;
		if(cart.cart && cart.cart.length === 0) {
			return <div>Your Cart Is Empty</div>
		}
		if(cart.cart && cart.cart.length > 0) {
			return(
				<div>
					{cart.cart.map((product) => {
						index++;
						return (
							<div key={index} className="cartProducts">
								{product.name}
								<img src={product.image} />
								Price: {product.price}
								Total: {product.quantity * product.price}
							</div>)})}
				</div>
			)
		}
		return <div>Your Cart Is Empty</div>
	}
}

const mapState = (state) => {
	return {
		cart: state.cartReducer,
		products: state.products,
	};
};

const mapDispatch = (dispatch) => ({
	getCart: (id) => dispatch(getCart(id)),
	updateCart: (userId, productId, quantity) => dispatch(updateCart(userId, productId, quantity)),
	removeFromCart: (userId, productId) => dispatch(removeFromCart(userId, productId)),
	cartCheckout: (userId, orderId) => dispatch(cartCheckout(userId, orderId))
})

export default connect(mapState, mapDispatch)(Carts);

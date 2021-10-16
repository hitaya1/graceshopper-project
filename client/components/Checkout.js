import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { updateProduct } from '../store/singleProduct';
import UserCheckout from './userCheckoutInfo';
import { createCart } from '../store/cart';
export class Checkout extends React.Component {
	constructor() {
		super();
		this.checkoutHandler = this.checkoutHandler.bind(this);
	}
	componentDidMount() {
		this.props.getProducts();
		this.props.currentUser && this.props.currentUser.id
			? this.props.createCart(
					this.props.currentUser.id,
					JSON.parse(localStorage.getItem('cart'))
			  )
			: null;
	}
	async checkoutHandler() {
		let localCart = JSON.parse(localStorage.getItem('cart'));
		this.props.products.map((product) => {
			for (let i = 0; i < localCart.length; i++) {
				if (product.id === localCart[i].id && localCart[i].quantity > 0) {
					product.inventory -= localCart[i].quantity;
					this.props.updateProduct(product, this.props.currentUser);
				}
			}
		});
		localStorage.setItem('cart', '[]');
	}
	render() {
		const { products, currentUser } = this.props;
		const { checkoutHandler } = this;
		let localCart = JSON.parse(localStorage.getItem('cart'));
		let idOfCart = localCart.map((product) => {
			return product.id;
		});
		return (
			<div>
				{currentUser && currentUser.id ? <UserCheckout /> : null}
				<div>
					{products && products.length ? (
						<div className='user-checkout'>
							{products.map((product) => {
								for (let i = 0; i < idOfCart.length; i++) {
									if (product.id === idOfCart[i]) {
										return (
											<div key={product.id} id='user-checkout'>
												{product.name}
												{'  '}Quantity: {localCart[i].quantity}
												{'  '}Total: $
												{(localCart[i].quantity * localCart[i].price) / 100}
											</div>
										);
									}
								}
							})}
							<div>
								<div id='cat-tax'>(+ Cat Tax)</div>
								<div id='grand-total'>
									Grand Total: $
									{Math.floor(
										localCart.reduce((total, product) => {
											total += product.price * product.quantity;
											return total;
										}, 0) * 1.08
									) / 100}
								</div>
							</div>
							{currentUser && currentUser.id ? (
								<Link to='/placeOrder' style={{display: 'flex', 	justifyContent: 'flex-end', marginRight: '30px'}}>
									<button
										id='checkout'
										type='submit'
										onClick={() => checkoutHandler()}>
										Place Order
									</button>
								</Link>
							) : (
								<div>
									<br />
									Please log in in order to check out!
								</div>
							)}
						</div>
					) : (
						<div>Oops! You haven`t added anything to the cart yet!</div>
					)}
				</div>
			</div>
		);
	}
}
const mapState = (state) => ({
	products: state.products,
	currentUser: state.auth,
});
const mapDispatch = (dispatch) => {
	return {
		createCart: (userId, cart) => dispatch(createCart(userId, cart)),
		getProducts: () => dispatch(fetchProducts()),
		updateProduct: (product, user) => dispatch(updateProduct(product, user)),
	};
};
export default connect(mapState, mapDispatch)(Checkout);

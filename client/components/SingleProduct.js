import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';

export const AddToCart = (props) => {
	const [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');

	const addProduct = (product) => {
			let carts = [...cart];
			let {id} = product
			let currProdInCart = carts.find(product => product.id === id)
			if (currProdInCart) {
				currProdInCart.quantity++
			} else {
				carts.push(product)
			}

		setCart(carts);
		let stringCart = JSON.stringify(carts);
		localStorage.setItem('cart', stringCart);
	};

	useEffect(() => {
		localCart = JSON.parse(localCart);
		if (localCart) {
			setCart(localCart);
		}
	}, []);

	return (
		<div>
			<button
				id='add-to'
				type='submit'
				onClick={() => {
					addProduct(props.product);
				}}>
				Add to Cart
			</button>
		</div>
	);
};

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getProducts();
		this.props.loadOneProduct(this.props.match.params.productId);
	}
	render() {
		const { product, currentUser, addToCart } = this.props;

		let editButton = null;

		if (currentUser.isAdmin) {
			editButton = (
				<Link to={`/products/edit/${product.id}`}>
					<button type='submit' id='edit'>
						Make ModifiCATion
					</button>
				</Link>
			);
		}

		let ridiculousScale = '';

		if (product.category === 1) {
			ridiculousScale = 'realistic';
		} else if (product.category === 2) {
			ridiculousScale = 'silly';
		} else if (product.category === 3) {
			ridiculousScale = 'nonsensical';
		} else if (product.category === 4) {
			ridiculousScale = 'ridiculous';
		} else if (product.category === 5) {
			ridiculousScale = 'ludicrous';
		}

		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<h5 >A {ridiculousScale} product</h5>
				<div id='singlecat'>
					<img
						// src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsJAUX7QSaaVUy8NMJh-HmxKHF-bmsJnLZg&usqp=CAU'}
						src={product.image}
					/>
				</div>
				<h2>${product.price / 100}</h2>
				<h4>{product.description}</h4>
				{editButton}

				<AddToCart product={product} addToCart={addToCart} />
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth,
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(SingleProduct);

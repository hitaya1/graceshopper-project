import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';

export const AddToCart = (props) => {
	// console.log('this is from AddToCart', props)
	const [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');

	const addProduct = (product) => {
		// console.log('this is inside ADDPRODUCT FUNCTION', product)
		let carts = [...cart];
		let { id } = product;
		let currProdInCart = carts.find((product) => product.id === id);
		if (currProdInCart) {
			currProdInCart.quantity++;
		} else {
			carts.push(product);
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
		const { product, currentUser, addToCart, getProducts } = this.props;

		let editButton = null;

		if (currentUser.isAdmin) {
			editButton = (
				<Link to={`/products/edit/${product.id}`}>
					<button type='submit' id='edit'>
						Make ModifiCATion...
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
			<div>
				<h5>A {ridiculousScale} product</h5>
				<div id='singlecat'>
					<div>
						<img
							// src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsJAUX7QSaaVUy8NMJh-HmxKHF-bmsJnLZg&usqp=CAU'}
							src={product.image}
						/>
						<div id='single-product-view'>{product.name}</div>
					</div>
					<div id='single-product-view-price'>${product.price / 100}</div>
					<h4 id='description'>{product.description}</h4>
					{editButton}

					{/* <button
					type="submit"
					onClick={async () => {
						await getProducts();
						addToCart(product.id, product.name, product.image);
					}}
				>
					Add to Cart
				</button> */}
				</div>
				<AddToCart product={product} addToCart={addToCart} />
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth,
});

const mapDispatch = (dispatch, { history }) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id, history)),
	addToCart: (id, name, image, quantity) => dispatch(addToCart(id, name, image, quantity)),
	getProducts: () => dispatch(fetchProducts(history))
});

export default connect(mapState, mapDispatch)(SingleProduct);

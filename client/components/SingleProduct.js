import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';

export const AddToCart = (props) => {
	const [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');
	let isLoggedIn = props.isLoggedIn
console.log('props from SINGLEPRODUCT INSIDE HOOK', props)
	const addProduct = (product) => {
			let carts = [...cart];
			let {id} = product
			let currProdInCart = carts.find(product => product.id === id)

			if (currProdInCart) {
				currProdInCart.quantity++
			} else {
				carts.push(product)
			}
			setCart(carts)
			let stringCart = JSON.stringify(carts);
			localStorage.setItem('cart', stringCart)
		}

	useEffect (() => {
		localCart = JSON.parse(localCart);
			if(localCart) {
				setCart(localCart)
			}}, [])

	return (
	<div>
		<button
					type="submit"
					onClick={() => {
						addProduct(props.product);
					}}
				>
					Add to Cart
				</button>
	</div>
	)
	}


class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getProducts();
		this.props.loadOneProduct(this.props.match.params.productId);
	}
	render() {
		const { product, currentUser, addToCart, isLoggedIn } = this.props;
		console.log(this.props)


		let editButton = null;

		if (currentUser.isAdmin){
			editButton = (
				<Link to={`/products/edit/${product.id}`}>
					<button type="submit">Make ModifiCATion...</button>
				</Link>
			);
		}

		return (
			<div>
				<h3>{product.name}</h3>
				<h3>{product.category}</h3>
				<div id='singlecat'>
					<img
						src={
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsJAUX7QSaaVUy8NMJh-HmxKHF-bmsJnLZg&usqp=CAU'
						}
					/>
				</div>
				<h3>{product.price}</h3>
				<h3>{product.description}</h3>
				{editButton}

				<div>
		<button
					type="submit"
					onClick={() => {
						addToCart(currentUser.id, product.id);
					}}
				>
					Add to Cart
				</button>
	</div>

				{/* <AddToCart state = {this.state} product={product} addToCart={addToCart} isLoggedIn={isLoggedIn} /> */}
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth,
	isLoggedIn: !!state.auth.id
	// products: state.products
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
	getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(SingleProduct);

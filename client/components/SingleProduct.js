import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';

export const AddToCart = (props) => {
	console.log('this is from AddToCart', props)
	const [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');

	const addProduct = (product) => {
		console.log('this is inside ADDPRODUCT FUNCTION', product)
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
		// basic rendering for single product. just to view - sd
		const { product, addToCart, getProducts } = this.props;
		return (
			<div>
				<h3>{product.name}</h3>
				<h3>{product.category}</h3>
				<img src={'http://localhost:8080' + product.image} />
				<h3>{product.price}</h3>
				<h3>{product.description}</h3>
				<button type="submit">
					<Link to={`/products/edit/${product.id}`}>Edit</Link>
				</button>
				
				<AddToCart product={product} addToCart={addToCart} />
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	products: state.products
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	addToCart: (id, name, image, quantity) => dispatch(addToCart(id, name, image, quantity)),
	getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(SingleProduct);

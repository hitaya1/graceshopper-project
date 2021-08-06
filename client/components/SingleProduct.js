import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';
import { addToCart } from '../store/cart';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getProducts();
		this.props.loadOneProduct(this.props.match.params.productId);
	}
	render() {
		const { product, currentUser, addToCart, getProducts } = this.props;


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

				<button
					type="submit"
					onClick={async () => {
						await getProducts();
						addToCart(product.id, product.name, product.image);
					}}
				>
					Add to Cart
				</button>
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth,
	products: state.products
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	addToCart: (id, name, image) => dispatch(addToCart(id, name, image)),
	getProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(SingleProduct);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchProducts } from '../store/products';

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
	products: state.products
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	addToCart: (id, name, image) => dispatch(addToCart(id, name, image)),
	getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(SingleProduct);

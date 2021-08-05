import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.loadOneProduct(this.props.match.params.productId);
	}
	render() {
		// basic rendering for single product. just to view - sd
		const { product, addToCart } = this.props;
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
					onClick={() => addToCart(product.id, product.name, product.image)}
				>
					Add to Cart
				</button>
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
	addToCart: (id, name, image) => dispatch(addToCart(id, name, image)),
});

export default connect(mapState, mapDispatch)(SingleProduct);

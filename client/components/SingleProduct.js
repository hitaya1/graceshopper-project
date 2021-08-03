import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.loadOneProduct(this.props.match.params.product.id);
	}
	render() {
		const { product } = this.props;
		return (
			<div>
				<h3>{product.category}</h3>
				<h3>{product.name}</h3>
				<h3>{product.image}</h3>
				<h3>{product.price}</h3>
				<h3>{product.description}</h3>
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);

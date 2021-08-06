import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.loadOneProduct(this.props.match.params.productId);
	}
	render() {
		// basic rendering for single product. just to view - sd
		const { product, currentUser } = this.props;


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
			</div>
		);
	}
}

const mapState = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth
});

const mapDispatch = (dispatch) => ({
	loadOneProduct: (id) => dispatch(fetchSingleProduct(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);

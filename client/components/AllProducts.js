import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../store/products';
import axios from 'axios';

class AllProducts extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}
	render() {
		const { products, deleteProduct, getProducts, currentUser } = this.props;

		let deleteButton = null;
		let createButton = null;

		if (currentUser.isAdmin){
			deleteButton = (
				<button type="submit" onClick={ async () => {
					await deleteProduct(product.id);
					getProducts();
				}}> Remove from CATalogue </button>
			);

			createButton = (
				<Link to={`/products/create`}>
					<button className="product">Add to CATalogue</button>
				</Link>
			);
		}

		return (
			<div>
				<h1>SHOP MEOW!</h1>
				<div>
					{products && products.length ? (
						<div>
							{products.map((product) => {
								return (
									<div key={product.id} className="products">
										<Link to={`/products/${product.id}`}>
											<img
												className="product-image"
												src={
													product.imageUrl ||
													'http://localhost:8080/pics/download.png'
												}
											/>
											<p>{product.name}</p>
										</Link>
										{deleteButton}
									</div>
								);
							})}
						</div>
					) : (
						<div>Cats destroyed everything, run for your life!</div>
					)}
				</div>
				{createButton}
			</div>
		);
	}
}

const mapState = (state) => ({
	products: state.products,
	currentUser: state.auth
});

const mapDispatch = (dispatch) => ({
	getProducts: () => dispatch(fetchProducts()),
	deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapState, mapDispatch)(AllProducts);

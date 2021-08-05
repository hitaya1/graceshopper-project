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
		console.log(this.props);
		const { products, deleteProduct, getProducts } = this.props;
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
										<button
											type="submit"
											onClick={() => {
												deleteProduct(product.id);
												getProducts();
											}}
										>
											X
										</button>
									</div>
								);
							})}
						</div>
					) : (
						<div>Cats destroyed everything, run for your life!</div>
					)}
				</div>
				<p>
					<Link to={`/products/create`}>
						<button className="product">create product</button>
					</Link>
				</p>
			</div>
		);
	}
}

const mapState = (state) => ({
	products: state.products,
});

const mapDispatch = (dispatch) => ({
	getProducts: () => dispatch(fetchProducts()),
	deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapState, mapDispatch)(AllProducts);

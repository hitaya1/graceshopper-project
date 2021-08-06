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
		const { products, deleteProduct, getProducts } = this.props;
		return (
			<div>
				<div>
					{products && products.length ? (
						<div className='products'>
							{products.map((product) => {
								return (
									<div key={product.id} className='product'>
										<Link to={`/products/${product.id}`}>
											<img
												className='product-image'
												src={
													product.imageUrl ||
													'https://apluspetsitting.com/wp-content/uploads/2016/03/cats-150x150.jpg'
												}
											/>
										</Link>
										<div>{product.name}</div>
										<button
											type='submit'
											onClick={async () => {
												await deleteProduct(product.id);
												getProducts();
											}}>
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
				<div>
					<Link to={`/products/create`}>
						<button>create product</button>
					</Link>
				</div>
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

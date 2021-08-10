import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../store/products';

class AllProducts extends React.Component {
	constructor() {
		super();
		this.clickDelete = this.clickDelete.bind(this);
	}
	componentDidMount() {
		this.props.getProducts();
	}

	async clickDelete(event) {
		await this.props.deleteProduct(event.target.name, this.props.currentUser);
		this.props.getProducts();
	}

	render() {
		const { products, currentUser } = this.props;

		let createButton = null;

		if (currentUser.isAdmin) {
			// deleteButton = (
			// 	<button type="submit" onClick={ async () => {
			// 		await deleteProduct(product.id);
			// 		getProducts();
			// 	}}> Remove from CATalogue </button>
			// );

			createButton = (
				<Link to={`/products/create`}>
					<button id='create-button'>Add to CATalogue</button>
				</Link>
			);
		}

		return (
			<div>
				<Link to={`/products/create`}>
					<button className='product'>create product</button>
				</Link>
				<div>
					{products && products.length ? (
						<div className='products'>
							{products.map((product) => {
								return (
									<div key={product.id} id='product'>
										<img className='product-image' src={product.image} />
										<Link to={`/products/${product.id}`}>
											<div id='productName'>{product.name}</div>
										</Link>
										{/* <button type="submit" className='delete' onClick={ async () => {
												await deleteProduct(product.id);
												getProducts();
											}}
										>
											X
										</button> */}
										{currentUser.isAdmin ? (
											<div>
												{' '}
												<button
													type='submit'
													id='delete-button'
													name={product.id}
													onClick={this.clickDelete}>
													Remove
												</button>
											</div>
										) : (
											<p></p>
										)}
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
	currentUser: state.auth,
});

const mapDispatch = (dispatch, { history }) => ({
	getProducts: () => dispatch(fetchProducts()),
	deleteProduct: (id, user) => dispatch(deleteProduct(id, user, history)),
});

export default connect(mapState, mapDispatch)(AllProducts);

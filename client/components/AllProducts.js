import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../store/products';

class AllProducts extends React.Component {
  constructor(){
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

		if (currentUser.isAdmin){
			// deleteButton = (
			// 	<button type="submit" onClick={ async () => {
			// 		await deleteProduct(product.id);
			// 		getProducts();
			// 	}}> Remove from CATalogue </button>
			// );

			createButton = (
				<Link to={`/products/create`}>
					<button className="product">Add to CATalogue</button>
				</Link>
			);
		}

		return (
			<div>
				<h1>SHOP MEOW!</h1>
				{createButton}
				<div>
					{products && products.length ? (
						<div className='products'>
							{products.map((product) => {
								return (
									<div key={product.id} className='product'>
										<Link to={`/products/${product.id}`}>
											<img className="product-image" src={product.image || 'https://apluspetsitting.com/wp-content/uploads/2016/03/cats-150x150.jpg'} />
											<div>{product.name}</div>
										</Link>
										{/* <button type="submit" className='delete' onClick={ async () => {
												await deleteProduct(product.id);
												getProducts();
											}}
										>
											X
										</button> */}
										{currentUser.isAdmin ? (
											<button type="button" className="delete-button" name={product.id} onClick={this.clickDelete}>Remove from CATalogue</button>
										) :
										(
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
			</div>
		);
	}
}

const mapState = (state) => ({
	products: state.products,
	currentUser: state.auth
});

const mapDispatch = (dispatch, { history }) => ({
	getProducts: () => dispatch(fetchProducts()),
	deleteProduct: (id, user) => dispatch(deleteProduct(id, user, history)),
});

export default connect(mapState, mapDispatch)(AllProducts);

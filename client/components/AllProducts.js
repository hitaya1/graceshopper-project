import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../store/products';
import axios from 'axios';

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
				<div>
					{products && products.length ? (
						<div>
							{products.map((product) => {
								return (
									<div key={product.id} className="products">
										<Link to={`/products/${product.id}`}>
											<img className="product-image" src={product.image || 'http://localhost:8080/pics/download.png'} />
											<p>{product.name}</p>
										</Link>
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
	deleteProduct: (id, user) => dispatch(deleteProduct(id, user)),
});

export default connect(mapState, mapDispatch)(AllProducts);

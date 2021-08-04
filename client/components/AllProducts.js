import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';

class AllProducts extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const { products } = this.props;
		return (
			<div>
				<h1>SHOP MEOW!</h1>
				<div>
					{products.length > 0 ? (
						<div>
							{products.map((product) => {
								return (
									<div key={product.id}>
										<Link to={`/products/${product.id}`}>
											<img className="product-image" src={product.imageUrl} />
										</Link>
										<Link to={`/products/${product.id}`}>
											<p>{product.name}</p>
										</Link>
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
});

export default connect(mapState, mapDispatch)(AllProducts);

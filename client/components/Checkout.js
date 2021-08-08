import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

export class Checkout extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}
	render() {
		const { products } = this.props;
		console.log(products);
		let localCart = localStorage.getItem('cart');
		// console.log(localCart);
		localCart = JSON.parse(localCart);
		// console.log(localCart);
		return products && products.length ? (
			<div className="products">
				{products.map((product) => {
					return (
						<div key={product.id} className="product">
						kitty</div>
					);
				})}
			</div>
		) : (
			<div>hi</div>
		);
	}
  //(compare localStorage cart with our products)  --- maybe array.filter
  //only display items inside of cart
  //button - 'finalize' type='submit' &&
  //update inventory, cc, address
}

const mapState = (state) => ({
	products: state.products,
});

const mapDispatch = (dispatch) => {
	return {
		getProducts: () => dispatch(fetchProducts()),
	};
};

export default connect(mapState, mapDispatch)(Checkout);

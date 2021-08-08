import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

export class Checkout extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}
	render() {
		const { products } = this.props;
		let localCart = JSON.parse(localStorage.getItem('cart'));
		let idOfCart = localCart.map((product) => {return product.id})
		console.log('trying to grab id', idOfCart)
		return products && products.length ? (
			<div className="products">
				{products.map((product) => {
					console.log('inside the map', idOfCart);
					for(let i = 0; i < idOfCart.length; i++) {
						if(product.id === idOfCart[i]) {
							return (<div key={product.id} className="product">
							{product.name}
							<div>
								Quantity: {product.quantity}
							</div>
						</div>)
						}
					}
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

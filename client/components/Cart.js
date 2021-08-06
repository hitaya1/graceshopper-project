import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Cart extends React.Component {
	render() {
		let index = 0;
		console.log(this.props.cart);
		const { cart } = this.props;
		return (
			<div>
				{cart && cart.length ? (
					<div>
						{cart.map((product) => {
							index++;
							return (
								<div key={index} className="cartProducts">
									{product.name}
									<img src={product.image} />
								</div>
							);
						})}

					</div>
				) : (
					<div>Cats destroyed everything, run for your life!</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		cart: state.cart.cart,
		products: state.products
	};
};
export default connect(mapStateToProps)(Cart);

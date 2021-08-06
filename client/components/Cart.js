import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Cart = (props) => {
	console.log('this is inside CART COMPONENET',props)
	const [cart, setCart] = useState([]);
	let localCart = localStorage.getItem('cart');

	console.log('CART INSIDE CART COMPONENET', cart)

	useEffect (() => {
		localCart = JSON.parse(localCart);
		if(localCart) {
			setCart(localCart)
		}}, [])

		let index = 0;
		return (	<div>
			{cart && cart.length ? (
				<div>
					{cart.map((product) => {
						index++;
						return (
							<div key={index} className="cartProducts">
								{product.name}
								<img src={product.image} />
								{product.quantity}
							</div>
						);
					})}

				</div>
			) : (
				<div>Cats destroyed everything, run for your life!</div>
			)}
		</div>)
		}

// return (
// 			<div>
// 				{cart && cart.length ? (
// 					<div>
// 						{cart.map((product) => {
// 							index++;
// 							return (
// 								<div key={index} className="cartProducts">
// 									{product.name}
// 									<img src={product.image} />
// 								</div>
// 							);
// 						})}

// 					</div>
// 				) : (
// 					<div>Cats destroyed everything, run for your life!</div>
// 				)}
// 			</div>
// )
// }

const mapStateToProps = (state) => {
	console.log(state)
	return {
		cart: state.cart.cart,
		products: state.products
	};
};
export default connect(mapStateToProps)(Cart);

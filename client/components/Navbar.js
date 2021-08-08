import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const Navbar = ({ isLoggedIn }) => (
// 	<div>
// 		<h2>welcome to catsco!</h2>
// 		<nav>
// 			{isLoggedIn ? (
// 				<div>
// 					{/* The navbar will show these links after you log in */}
// 					<Link to="/home">
// 						<img src="/pics/catsco.png" id="catsco"></img>
// 					</Link>
// 				</div>
// 			) : (
// 				<div>
// 					{/* The navbar will show these links before you log in */}
// 					<Link to="/login">Login</Link>
// 					<Link to="/signup">Sign Up</Link>
// 				</div>
// 			)}
// 			<Link to="/products">Products</Link>
// 			<Link to="/cart">
// 				<img src="/pics/cart.png" id="catCart"></img>
// 			</Link>
// 		</nav>
// 		<hr />
// 	</div>
// );

class Navbar extends React.Component {
	render() {
		const { handleClick, isLoggedIn, currentUser } = this.props;

		let allUsersButton = null;

		if (currentUser.isAdmin) {
			allUsersButton = (
				<button type="submit">
					<Link to={`/users`}>All Users</Link>
				</button>
			);
		}
		const howManyItemsInTheCart = JSON.parse(
			localStorage.getItem('cart')
		).reduce((total, product) => {
			total += product.quantity;
			return total;
		}, 0);
		console.log(howManyItemsInTheCart);
		return (
			<div>
				<h1>Welcome to Catsco!</h1>
        {howManyItemsInTheCart && <h2>You have {howManyItemsInTheCart} items in your cart</h2>}
				<nav>
					{isLoggedIn ? (
						<div>
							{/* The navbar will show these links after you log in */}
							<Link to="/home">Home</Link>
							<a href="#" onClick={handleClick}>
								Logout
							</a>
							{allUsersButton}
						</div>
					) : (
						<div>
							{/* The navbar will show these links before you log in */}
							<Link to="/login">Login</Link>
							<Link to="/signup">Sign Up</Link>
						</div>
					)}
					<Link to="/products">Products</Link>
					<Link to="/cart">
						<img src="/pics/cart.png" id="catCart"></img>
					</Link>
				</nav>
				<hr />
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		currentUser: state.auth,
	};
};

export default connect(mapState)(Navbar);

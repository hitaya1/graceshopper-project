import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => (
	<div>
		<h2>welcome to catsco!</h2>
		<nav>
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to="/home">
						<img src="/pics/catsco.png" id="catsco"></img>
					</Link>
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

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
	};
};

export default connect(mapState)(Navbar);

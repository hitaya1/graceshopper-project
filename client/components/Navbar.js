import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

class Navbar extends React.Component {
	render() {
		const { handleClick, isLoggedIn, currentUser } = this.props;

		let allUsersButton = null;

		if (currentUser.isAdmin) {
			allUsersButton = (
				<button type='submit' id='all-users'>
					<Link to={`/users`}>All Users</Link>
				</button>
			);
		}
		// const howManyItemsInTheCart = JSON.parse(
		// 	localStorage.getItem('cart')
		// ).reduce((total, product) => {
		// 	total += product.quantity;
		// 	return total;
		// }, 0);
		return (
			<div>
				<nav>
					<div id='banner'>
						<img src='pics/catsco_2x.png' />
					</div>
					<div id='nav-items'>
						{isLoggedIn ? (
							<div>
								{/* The navbar will show these links after you log in */}
								<Link to='/home'>Home</Link>
								<a href='#' onClick={handleClick}>
									Logout
								</a>
								{allUsersButton}
							</div>
						) : (
							<div>
								{/* The navbar will show these links before you log in */}
								<Link to='/login'>Login</Link>
								<Link to='/signup'>Sign Up</Link>
							</div>
						)}
						<Link to='/products'>Products</Link>
						<Link to='/cart'>
							<img src='/pics/catcart.png' id='catCart'></img>
							{/* {isLoggedIn && howManyItemsInTheCart  ?(
							<h2>You have {howManyItemsInTheCart} items in your cart</h2>
						) : ''} */}
						</Link>
					</div>{' '}
				</nav>
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
const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);

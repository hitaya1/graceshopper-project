import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
/**
 * COMPONENT
 */
export const Home = (props) => {
	console.log(props);
	const { username, isLoggedIn, handleClick } = props;

	return (
		<div>
			<h3>Welcome, {username}</h3>
			<h1>SHOP MEOW!</h1>
			{isLoggedIn && (
				<a href="#" onClick={handleClick}>
					Logout
				</a>
			)}
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};
export default connect(mapState, mapDispatch)(Home);

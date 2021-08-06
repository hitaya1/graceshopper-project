import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username, isLoggedIn, handleClick } = props;

	return (
		<div>
			<h3>Welcome, {username}</h3>
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

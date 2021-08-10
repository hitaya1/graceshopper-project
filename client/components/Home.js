import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username, userId } = props;

	return (
		<div>
			<h3>Welcome, {username}</h3>
			<Link to={`/users/${userId}`}>
					<button type="button">Full Profile</button>
				</Link>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
		userId: state.auth.id,
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

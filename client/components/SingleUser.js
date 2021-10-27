import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUser';

class User extends React.Component {
	componentDidMount() {
		this.props.getSingleUser(this.props.match.params.userId);
	}

	render() {
		const { user, currentUser } = this.props;

		let editUserButton = null;

		if (currentUser.isAdmin || currentUser.id === user.id) {
			editUserButton = (
				<Link to={`/users/edit/${user.id}`}>
					<button type='button' id='edit-button' name={user.id}>
						Edit Cat
					</button>
				</Link>
			);
		}

		let ifUser = <div>The cats are free! Run for your lives!</div>;
		let cardStars = 'No credit card on file';
		let fullName = user.firstName;
		if (user.firstName) {
			fullName += ' ';
		}
		fullName += user.lastName;

		if (user.cc) {
			cardStars = '**** - **** - **** - ****';
		}

		if (user.id === currentUser.id || currentUser.isAdmin) {
			ifUser = (
				<div className='single-user-entry'>
					<div key={user.id} style={{fontSize: '17px'}}>
						<h2 className='single-user'>
							Welcome, {user.username}! What a purrfect day!
						</h2>
						<h4>Name: {fullName || 'No name on file'}</h4>
						<h4>
							Shipping Address:{' '}
							{user.shippingAddress || 'No shipping address on file'}
						</h4>
						<h4>
							Billing Address:{' '}
							{user.billingAddress || 'No billing address on file'}
						</h4>
						<h4>Credit Card: {cardStars}</h4>
					<div style={{display: 'flex', justifyContent: 'center'}}>{editUserButton}</div>
					</div>

					<div style={{ paddingRight: '30px', fontSize: '17px' }}>
							{/* The navbar will show these links after you log in */}
{currentUser.id === user.id && <a href="#" onClick={handleClick} style={{ paddingRight: '30px', fontSize: '17px' }}>
								Logout
							</a>}

						</div>

				</div>
			);
		}
		return ifUser;
	}
}

const mapState = (state) => ({
	user: state.singleUser,
	currentUser: state.auth,
});
const mapDispatch = (dispatch, { history }) => {
	return {
		getSingleUser: (userId) => dispatch(fetchSingleUser(userId, history)),
	};
};

export default connect(mapState, mapDispatch)(User);

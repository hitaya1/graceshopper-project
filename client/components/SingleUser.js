import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUser';

//import ErrorHandler from './ErrorHandler';
//import LoadingScreen from './LoadingScreen';

class User extends React.Component {
	componentDidMount() {
		if (this.props.currentUser) {this.props.getSingleUser(this.props.match.params.userId, this.props.currentUser);}
	}

	render() {
		const { user, currentUser } = this.props;

		let editUserButton = null;

		if (currentUser.isAdmin){
			editUserButton = (
				<Link to={`/users/edit/${user.id}`}>
					<button type="button" className='edit-button' name={user.id}>Edit Cat...</button>
				</Link>
			);
		}

		let ifUser = <div>The cats are free! Run for your lives!</div>;
		let cardStars = 'No credit card on file';
		let fullName = user.firstName;
		if (user.firstName) { fullName += ' '; }
		fullName += user.lastName;

		if (user.cc) { cardStars = '**** - **** - **** - ****'; }

		if (user.id === currentUser.id || currentUser.isAdmin){
			ifUser = (
			<div id='single-user'>
			<div key={user.id} className='single-user-entry'>
				<h2 className='user-name'>
					Welcome, {user.username}! What a purrfect day!
				</h2>
				<h4>Name: {fullName || 'No name on file'}</h4>
				<h4>Shipping Address: {user.shippingAddress || 'No shipping address on file'}</h4>
				<h4>Billing Address: {user.billingAddress || 'No billing address on file'}</h4>
				<h4>Credit Card: {cardStars}</h4>
					{editUserButton}
			</div>
		</div>
			)
		}

		//if (this.props.robot[0] === 'error') { return <ErrorHandler /> }
		//else if (!this.props.robot.id) { return <LoadingScreen />}
		return (
			ifUser
		);
	}
}

const mapState = (state) => ({
	user: state.singleUser,
	currentUser: state.auth
});
const mapDispatch = (dispatch, { history }) => {
	return {
		getSingleUser: (userId, user) => dispatch(fetchSingleUser(userId, user, history))
	};
};

export default connect(mapState, mapDispatch)(User);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/user';
//import ErrorHandler from './ErrorHandler';
//import LoadingScreen from './LoadingScreen';

class User extends React.Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			cc: null,
			shippingAddress: null,
			billingAddress: null,
			cart: [],
			prevOrders: [],
			favProducts: [],
			isAdmin: false,
		};
	}

	componentDidMount() {
		this.props.getSingleUser(this.state.userId, this.state.username);
	}

	componentDidUpdate(prevProps) {
		//we might need this?
		// if (!Array.isArray(this.props.robot.projects) || !Array.isArray(prevProps.robot.projects) || (prevProps.robot.projects.length !== this.props.robot.projects.length)) {
		//   this.props.getSingleRobot(this.props.match.params.robotId);
		// }
	}

	render() {
		//if (this.props.robot[0] === 'error') { return <ErrorHandler /> }
		//else if (!this.props.robot.id) { return <LoadingScreen />}

		return (
			//
			//insert cart component somewhere that makes sense

			<div id='single-user'>
				<div key={thisUser.id} className='single-user-entry'>
					<h2 className='user-name'>
						Welcome, {thisUser.name}! What a purrfect day!
					</h2>
					<div>
						<Link to={`/user/edit/${thisUser.id}`}>
							<button type='button' className='edit-button' name={thisUser.id}>
								Edit Profile
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return { user: state.user };
};
const mapDispatch = (dispatch) => {
	return {
		getUser: (userId, username) => dispatch(fetchUser(userId, username)),
		//,
		//edit thunk?
	};
};

export default connect(mapState, mapDispatch)(User);

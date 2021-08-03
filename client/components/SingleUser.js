import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUser';

//import ErrorHandler from './ErrorHandler';
//import LoadingScreen from './LoadingScreen';

class User extends React.Component {
	// constructor() { -- sd
	// 	super();
	//may not need for store??? refer to store???
	// this.state = {
	// 	username: '',
	// 	password: '',
	// 	cc: null,
	// 	shippingAddress: null,
	// 	billingAddress: null,
	// 	cart: [],
	// 	prevOrders: [],
	// 	favProducts: [],
	// 	isAdmin: false,
	// };
	//}

	componentDidMount() {
		this.props.getSingleUser(this.props.user.userId, this.props.user.username);
	}

	//idk if we need this yet. - sd
	// componentDidUpdate(prevProps) {
	// 	//we might need this?
	// 	// if (!Array.isArray(this.props.robot.projects) || !Array.isArray(prevProps.robot.projects) || (prevProps.robot.projects.length !== this.props.robot.projects.length)) {
	// 	//   this.props.getSingleRobot(this.props.match.params.robotId);
	// 	// }
	// }

	render() {
		const { user } = this.props;
		//if (this.props.robot[0] === 'error') { return <ErrorHandler /> }
		//else if (!this.props.robot.id) { return <LoadingScreen />}

		return (
			// basic render for single user -sd
			//insert cart component somewhere that makes sense

			<div id='single-user'>
				<div key={thisUser.id} className='single-user-entry'>
					<h2 className='user-name'>
						Welcome, {thisUser.name}! What a purrfect day!
					</h2>
					<h3>{user.username}</h3>
					<h3>{user.shippingAddress}</h3>
					<h3>{user.billingAddress}</h3>
					<h3>{user.prevOrders}</h3>
					<h3>{user.favProducts}</h3>
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

//Notes for later - SD

// if admin can display can see "user look up/ enter id".
// make local state in here, that says "admin looking at user". this.state.admin-something
// going to use local state to look up the user information.
// write to local state from store
// admin can change state, regular user cannot and doesn't even know it's a thing.

const mapState = (state) => {
	return { user: state.user };
};
const mapDispatch = (dispatch) => {
	return {
		getSingleUser: (userId, username) =>
			dispatch(fetchSingleUser(userId, username)),

		//,
		//edit thunk?
	};
};

export default connect(mapState, mapDispatch)(User);

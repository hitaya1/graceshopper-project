import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../store/allUsers';
import axios from 'axios';

class AllUsers extends React.Component {
	componentDidMount() {
		this.props.getUsers();
	}
	render() {
		const { allUsers, deleteUser, getUsers, currentUser } = this.props;

		let deleteUserButton = null;
		let createUserButton = null;

		if (currentUser.isAdmin){
			deleteUserButton = (
				<button type="submit" onClick={ async () => {
					await deleteUser(user.id);
					getUsers();
				}}> Curtail Cat </button>
			);

			createUserButton = (
				<Link to={`/users/create`}>
					<button>Add More Cats...</button>
				</Link>
			);
		}

		return (
			<div>
				<h1>SHOP MEOW!</h1>
				<div>
					{allUsers && allUsers.length ? (
						<div>
							{allUsers.map((element) => {
		{console.log(allUsers)}
		{console.log(element)}
								return (
									<div key={element.id} className="users">
										<Link to={`/users/${element.id}`}>
											<p>{element.username}</p>
										</Link>
										{deleteUserButton}
									</div>
								);
							})}
						</div>
					) : (
						<div>Cats destroyed everything, run for your life!</div>
					)}
				</div>
				{createUserButton}
			</div>
		);
	}
}

const mapState = (state) => ({
	allUsers: state.allUsers,
	currentUser: state.auth
});

const mapDispatch = (dispatch) => ({
	getUsers: () => dispatch(getAllUsers()),
	deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(mapState, mapDispatch)(AllUsers);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../store/allUsers';

class AllUsers extends React.Component {
  constructor(){
    super();
    this.clickDelete = this.clickDelete.bind(this);
  }
	componentDidMount() {
		this.props.getUsers(this.props.currentUser);
	}

	async clickDelete(event) {
    await this.props.deleteUser(event.target.name, this.props.currentUser);
    this.props.getUsers(this.props.currentUser);
  }

	render() {
		const { allUsers, currentUser } = this.props;

		let createUserButton = null;

		if (currentUser.isAdmin){
			// deleteUserButton = (
			// 	<button type="submit" onClick={ async () => {
			// 		await deleteUser(element.id);
			// 		getUsers();
			// 	}}> Curtail Cat </button>
			// );

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
				{createUserButton}
					{allUsers && allUsers.length ? (
						<div>
							{allUsers.map((element) => {
								return (
									<div key={element.id} className="users">
										<Link to={`/users/${element.id}`}>
											<p>{element.username}</p>
										</Link>
										<button type="button" className="delete-button" name={element.id} onClick={this.clickDelete}>Curtail Cat</button>
									</div>
								);
							})}
						</div>
					) : (
						<div>Cats destroyed everything, run for your life!</div>
					)}
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	allUsers: state.allUsers,
	currentUser: state.auth
});

const mapDispatch = (dispatch, { history }) => ({
	getUsers: (user) => dispatch(getAllUsers(user, history)),
	deleteUser: (id, user) => dispatch(deleteUser(id, user, history)),
});

export default connect(mapState, mapDispatch)(AllUsers);

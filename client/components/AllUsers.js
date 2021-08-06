import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../store/allUsers';
import axios from 'axios';

class AllUsers extends React.Component {
  constructor(){
    super();
    this.clickDelete = this.clickDelete.bind(this);
  }
	componentDidMount() {
		this.props.getUsers();
	}

	async clickDelete(event) {
		console.log(event.target.name)
    await this.props.deleteUser(event.target.name);
    this.props.getUsers();
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

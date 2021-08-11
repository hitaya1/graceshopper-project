import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../store/allUsers';

class AllUsers extends React.Component {
	constructor() {
		super();
		this.state = {
			search: '',
		};
		this.clickDelete = this.clickDelete.bind(this);
		this.search = this.search.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}
	componentDidMount() {
		this.props.getUsers(this.props.currentUser);
	}

	handleSearchChange(event) {
		this.setState({ search: event.target.value });
	}

	search(origiRay) {
		let mutaRay = [...origiRay];

		if (this.state.search !== '') {
			mutaRay = mutaRay.filter((element) =>
				element.username.startsWith(this.state.search)
			);
		}

		return mutaRay;
	}

	async clickDelete(event) {
		await this.props.deleteUser(event.target.name, this.props.currentUser);
		this.props.getUsers(this.props.currentUser);
	}

	render() {
		const { allUsers, currentUser } = this.props;

		let createUserButton = null;

		if (currentUser.isAdmin) {
			// deleteUserButton = (
			// 	<button type="submit" onClick={ async () => {
			// 		await deleteUser(element.id);
			// 		getUsers();
			// 	}}> Curtail Cat </button>
			// );

			createUserButton = (
				<Link to={`/users/create`}>
					<button id='create'>Add More Cats...</button>
				</Link>
			);
		}

		return (
			<div>
				<div>
					{createUserButton}

					<div className='search'>
						<form id='search-form'>
							<label htmlFor='search' className='search-input-label'></label>
							<input
								id='search-bar'
								type='text'
								name='search'
								className='search-input-box'
								onChange={this.handleSearchChange}
								value={this.state.search || ''}
							/>
						</form>
					</div>
					{allUsers && allUsers.length ? (
						<div className='users'>
							{this.search(allUsers).map((element) => {
								return (
									<div key={element.id} id='user'>
										<Link to={`/users/${element.id}`}>
											<p>{element.username}</p>
										</Link>
										<button
											type='button'
											id='delete-user'
											name={element.id}
											onClick={this.clickDelete}>
											Curtail Cat
										</button>
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
	currentUser: state.auth,
});

const mapDispatch = (dispatch, { history }) => ({
	getUsers: (user) => dispatch(getAllUsers(user, history)),
	deleteUser: (id, user) => dispatch(deleteUser(id, user, history)),
});

export default connect(mapState, mapDispatch)(AllUsers);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser, editUser } from '../store/singleUser';

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.user.id,
      username: this.props.user.username || '',
			email: this.props.user.email || '',
      password: this.props.user.password || '',
      cc: this.props.user.cc || 0,
      shippingAdress: this.props.user.shippingAdress || '',
      billingAdress: this.props.user.billingAdress || '',
      isAdmin: this.props.user.isAdmin || false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		try {
			const { userId } = this.props.match.params;
			this.props.getUser(userId, this.props.currentUser);
		} catch (error) {
			console.log(error);
		}
	}

	componentDidUpdate(prevProp) {
		if (prevProp.user.userId !== this.props.user.userId) {
			this.setState({
        id: this.props.user.id,
				username: this.props.user.username || '',
				email: this.props.user.email || '',
				password: this.props.user.password || '',
				cc: this.props.user.cc || 0,
				shippingAdress: this.props.user.shippingAdress || '',
				billingAdress: this.props.user.billingAdress || '',
				isAdmin: this.props.user.isAdmin || false
			});
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.editUser({ ...this.props.user, ...this.state }, this.props.currentUser);
	}

	render() {
		const { username, email, password, cc, shippingAddress, billingAddress, isAdmin } = this.state;
		const { handleSubmit, handleChange } = this;

		let adminSelect = null;

		if (this.props.currentUser.isAdmin){
			adminSelect = (
				<div>
					<label htmlFor="isAdmin">isAdmin:</label>
					<select name="isAdmin" onChange={handleChange}>
						<option value={false}>False</option>
						<option value={true}>True</option>
					</select>
				</div>
			);
		}

		return (
			<div className="editUser">
				<form id="edit-user-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
				<input name="username" onChange={handleChange} value={username} />

				<label htmlFor="email"> Email:</label>
				<input name="email" onChange={handleChange} value={email} />

				<label htmlFor="password"> Password:</label>
				<input name="password" onChange={handleChange} value={password} />

        <label htmlFor="cc"> Credit Card #:</label>
				<input name="cc" onChange={handleChange} value={cc} />

        <label htmlFor="shippingAddress"> Shipping Address:</label>
				<input name="shippingAddress" onChange={handleChange} value={shippingAddress} />

        <label htmlFor="billingAddress"> Billing Address:</label>
				<input name="billingAddress" onChange={handleChange} value={billingAddress} />

        {adminSelect}

					<button type="submit">Submit</button>
				</form>
				<form onSubmit={(ev) => ev.preventDefault()} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.singleUser,
	currentUser: state.auth
});

const mapDispatchToProps = (dispatch, { history }) => ({
	editUser: (editting, user) => dispatch(editUser(editting, user, history)),
	getUser: (id, user) => dispatch(fetchSingleUser(id, user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

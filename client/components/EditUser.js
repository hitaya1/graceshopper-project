import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser, editUser } from '../store/singleUser';

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.user.id,
			firstName: this.props.user.firstName || '',
			lastName: this.props.user.lastName || '',
			username: this.props.user.username || '',
			email: this.props.user.email || '',
			password: this.props.user.password || '',
			cc: this.props.user.cc || 0,
			shippingAdress: this.props.user.shippingAdress || '',
			billingAdress: this.props.user.billingAdress || '',
			isAdmin: this.props.user.isAdmin || false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		try {
			const { userId } = this.props.match.params;
			this.props.getUser(userId);
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
				isAdmin: this.props.user.isAdmin || false,
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
		this.props.editUser({ ...this.props.user, ...this.state });
	}

	render() {
		const {
			firstName,
			lastName,
			username,
			email,
			password,
			cc,
			shippingAddress,
			billingAddress,
			isAdmin,
		} = this.state;
		const { handleSubmit, handleChange } = this;

		let adminSelect = null;

		if (this.props.currentUser.isAdmin) {
			adminSelect = (
				<div>
					<label htmlFor='isAdmin'>isAdmin:</label>
					<select name='isAdmin' onChange={handleChange}>
						<option value={false}>False</option>
						<option value={true}>True</option>
					</select>
				</div>
			);
		}

		return (
			<div className='editUser'>
				<form id='edit-user-form' onSubmit={handleSubmit}>
					<div className='edit-column'>
						<label htmlFor='firstName'>First Name:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='firstName'
							onChange={handleChange}
							value={firstName}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='lastName'>Last Name:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='lastName'
							onChange={handleChange}
							value={lastName}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='username'>Username:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='username'
							onChange={handleChange}
							value={username}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='email'> Email:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='email'
							onChange={handleChange}
							value={email}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='password'> Password:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='password'
							onChange={handleChange}
							value={password}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='cc'> Credit Card #:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='cc'
							onChange={handleChange}
							value={cc}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='shippingAddress'> Shipping Address:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='shippingAddress'
							onChange={handleChange}
							value={shippingAddress}
						/>
					</div>
					<div className='edit-column'>
						<label htmlFor='billingAddress'> Billing Address:</label>
					</div>
					<div className='edit-column-2'>
						<input
							id='user-edit-form'
							type='text'
							name='billingAddress'
							onChange={handleChange}
							value={billingAddress}
						/>
					</div>

					{adminSelect}

					<button id='edit-user' type='submit'>
						Submit
					</button>
				</form>
				<form onSubmit={(ev) => ev.preventDefault()} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.singleUser,
	currentUser: state.auth,
});

const mapDispatchToProps = (dispatch, { history }) => ({
	editUser: (editting) => dispatch(editUser(editting, history)),
	getUser: (id) => dispatch(fetchSingleUser(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

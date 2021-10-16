import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { createUser } from '../store/allUsers';

class CreateUser extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			cc: 0,
			shippingAdress: '',
			billingAdress: '',
			isAdmin: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	async handleSubmit(evt) {
		evt.preventDefault();
		const username = evt.target.username.value;
		const password = evt.target.password.value;
		try {
			//await dispatch(authenticate(username, password));
			this.props.createUser({ ...this.state });
		} catch (e) {
			console.error('improper input');
		}
	}

	render() {
		const {
			username,
			email,
			password,
			cc,
			shippingAddress,
			billingAddress,
			isAdmin,
		} = this.state;
		const { handleSubmit, handleChange } = this;

		return (
			<div style={{display: 'flex', justifyContent: 'center'}}>
			<form className='user-form' id='create-user-form' onSubmit={handleSubmit}>
				<label htmlFor='username' className='newUser'>Username:</label>
				<input name='username' onChange={handleChange} value={username} />

				<label htmlFor='email' className='newUser'> Email:</label>
				<input name='email' onChange={handleChange} value={email} />

				<label htmlFor='password' className='newUser'> Password:</label>
				<input name='password' onChange={handleChange} value={password} />

				<label htmlFor='cc' className='newUser'>  Credit Card #:</label>
				<input name='cc' onChange={handleChange} value={cc} />

				<label htmlFor='shippingAddress' className='newUser'> Shipping Address:</label>
				<input
					name='shippingAddress'
					onChange={handleChange}
					value={shippingAddress}
				/>

				<label htmlFor='billingAddress' className='newUser'> Billing Address:</label>
				<input
					name='billingAddress'
					onChange={handleChange}
					value={billingAddress}
				/>

				<label htmlFor='isAdmin' className='newUser'>isAdmin:</label>
				<select name='isAdmin' onChange={handleChange}>
					<option value={false}>False</option>
					<option value={true}>True</option>
				</select>

				<button type='submit' className='newUser'>Submit</button>
			</form></div>
		);
	}
}

const mapState = (state) => ({
	currentUser: state.auth,
});

const mapDispatchToProps = (dispatch, { history }) => ({
	createUser: (adding) => dispatch(createUser(adding, history)),
});

export default connect(mapState, mapDispatchToProps)(CreateUser);

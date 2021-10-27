import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
	render() {
		const { name, displayName, handleSubmit, error } = this.props

		let emailField = null

		if (name === 'signup') {
			emailField = (
				<div>
					<label htmlFor="email">
						<small>Email:</small>
					</label>
					<input name="email" type="email" />
				</div>
			)
		}

		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div id="formSub">
					<div id="log-in-form">
						<form onSubmit={handleSubmit} name={name}>
							<div>
								<label htmlFor="username">
									<small>Username: </small>
								</label>
								<input id="logging-in" name="username" type="text" />
							</div>
							{emailField}
							<div>
								<label htmlFor="password">
									<small>Password: </small>
								</label>
								<input id="logging-in" name="password" type="password" />
							</div>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<button type="submit" id="log-in">
									{displayName}
								</button>
							</div>
							{error && error.response && <div> {error.response.data} </div>}
						</form>
					</div>
					{name === 'signup' ? (
						<div>
							{' '}
							Already have an account?
							<Link
								to="/login"
								style={{ paddingRight: '30px', fontSize: '17px' }}
							>
								Log in
							</Link>
						</div>
					) : (
						<div>
							{' '}
							Don't have an account yet?
							<Link
								to="/signup"
								style={{ paddingRight: '30px', fontSize: '17px' }}
							>
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</div>
		)
	}
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.auth.error,
	}
}

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error,
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			const formName = evt.target.name
			const username = evt.target.username.value
			const password = evt.target.password.value
			let email = null

			if (evt.target.email) {
				email = evt.target.email.value
			}

			let allowDispatch = true

			if (!username || !password) {
				window.alert('Paws a moment to fill out all fields')
				allowDispatch = false
			}
			if (formName === 'signup' && !email) {
				window.alert('Paws a moment to fill out all fields')
				allowDispatch = false
			}
			if (allowDispatch) {
				dispatch(authenticate(username, password, email, formName))
			}
		},
	}
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

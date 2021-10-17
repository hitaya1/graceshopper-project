import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'
import { Link } from 'react-router-dom'
/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username, userId, user } = props
let editUserButton = (
	<Link to={`/users/edit/${user.id}`}>
		<button type='button' id='edit-button' name={user.id}>
			Edit Cat
		</button>
	</Link>
);
	return (
		<div>
			<div id="welcome">
				{/* <div>Welcome, {username}</div> */}
				<h3 className='single-user'>
							Welcome, {user.username}! What a purrfect day!
						</h3>
				<div>
					{/* <button id="full_profile">
						<Link to={`/users/${userId}`}>
							<button id='full-prof' type='button'>
							Full Profile
							</button>
						</Link>
					</button> */}
				</div><img id="hi_cat" src="/pics/cat-eric-the-cat.gif" />

			</div>
			<div className='single-user-entry'>
					<div key={user.id} style={{fontSize: '17px'}}>

						<h4>Name: {user.fullName || 'No name on file'}</h4>
						<h4>
							Shipping Address:{' '}
							{user.shippingAddress || 'No shipping address on file'}
						</h4>
						<h4>
							Billing Address:{' '}
							{user.billingAddress || 'No billing address on file'}
						</h4>
						<h4>Credit Card: {user.cardStars}</h4>
					<div style={{display: 'flex', justifyContent: 'center'}}>{editUserButton}</div>
					</div>
				</div>
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.auth,
		username: state.auth.username,
		userId: state.auth.id,
		isLoggedIn: !!state.auth.id,
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout())
		},
	}
}
export default connect(mapState, mapDispatch)(Home)

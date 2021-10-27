import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'
import { Link } from 'react-router-dom'
/**
 * COMPONENT
 */
export const Home = (props) => {
	const { handleClick, username, userId, user, isLoggedIn } = props
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
				<h3 className='single-user' style={{display: 'flex', justifyContent: 'center'}}>
							Welcome, {user.username}!
						</h3>
						<h4 style={{display: 'flex', justifyContent: 'center', color: '#f35a5b'}}> What a puuurrrfect day!</h4>
				<div>
					{/* <button id="full_profile">
						<Link to={`/users/${userId}`}>
							<button id='full-prof' type='button'>
							Full Profile
							</button>
						</Link>
					</button> */}
				</div>

			</div>
			<div className='single-user-entry' style={{color: 'black', display: 'flex', justifyContent: 'center'}}><img id="hi_cat" src="/pics/cat-eric-the-cat.gif" />
					<div key={user.id} style={{fontSize: '17px'}}>

						<h5>Name: {user.fullName || 'No name on file'}</h5>
						<h5>
							Shipping Address:{' '}
							{user.shippingAddress || 'No shipping address on file'}
						</h5>
						<h5>
							Billing Address:{' '}
							{user.billingAddress || 'No billing address on file'}
						</h5>
						<h5>Credit Card: {user.cardStars}</h5>
					<div style={{display: 'flex', justifyContent: 'center'}}>{editUserButton}</div>
					{	isLoggedIn &&
						// <div style={{ paddingRight: '30px', fontSize: '17px' }}>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
<a href="#" onClick={handleClick}><button id='logout-button'>

								Logout
						</button>	</a></div>

			}	</div>
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

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Navbar extends React.Component {
	render() {
		const { handleClick, isLoggedIn, currentUser } = this.props


		return (
			// <div>
			<nav>
				<div id="banner" style={{ paddingTop: '17px' }}>
					<Link to="/home">
						<img src="pics/catsco.png" />
					</Link>
				</div>

				<div id="nav-items">	{isLoggedIn && (
					<Link to="/profile" style={{ paddingRight: '30px', fontSize: '17px' }}>
						My profile
					</Link>
				)}
					<Link to="/products" style={{ paddingRight: '30px', fontSize: '17px' }}>
						Products
					</Link>


		{currentUser.isAdmin &&
				<button type="submit" id="all-users">
					<Link to={`/users`}>All Users</Link>
				</button>
			}
					{!isLoggedIn  &&
					// ? (
					// 	<div style={{ paddingRight: '30px', fontSize: '17px' }}>
					// 		{/* The navbar will show these links after you log in */}

					// 		<a href="#" onClick={handleClick} style={{ paddingRight: '30px', fontSize: '17px' }}>
					// 			Logout
					// 		</a>
					// 	</div>
					// ) :
					(
						<div>
							{/* The navbar will show these links before you log in */}
							<Link to="/login" style={{ paddingRight: '30px', fontSize: '17px' }}>
								Login
							</Link>
						</div>
					)}

					<Link to="/cart" style={{ paddingRight: '20px' }}>
						<img src="/pics/catcart.png" id="catCart"></img>
					</Link>
				</div>
			</nav>
			// </div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		currentUser: state.auth,
	}
}
const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout())
		},
	}
}

export default connect(mapState, mapDispatch)(Navbar)

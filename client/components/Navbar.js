import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Navbar extends React.Component {
	render() {
		const { handleClick, isLoggedIn, currentUser } = this.props

		let allUsersButton;

		if (currentUser.isAdmin) {
			allUsersButton = (
				<button type="submit" id="all-users">
					<Link to={`/users`}>All Users</Link>
				</button>
			)
		}
		return (
			// <div>
			<nav>
				<div id="banner">
					<Link to="/home">
						<img src="pics/catsco_2x.png" />
					</Link>
				</div>
				<div id="nav-items">
					<Link to="/products">Products</Link>
					<div>{allUsersButton}</div>
					{isLoggedIn ? (
						<div>
							{/* The navbar will show these links after you log in */}
							<a href="#" onClick={handleClick}>
								Logout
							</a>
						</div>
					) : (
						<div>
							{/* The navbar will show these links before you log in */}
							<Link to="/login">Login</Link>
							<Link to="/signup">Sign Up</Link>
						</div>
					)}

					<Link to="/cart">
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

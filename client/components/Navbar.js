import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


class Navbar extends React.Component{

  render(){
    const { handleClick, isLoggedIn, currentUser } = this.props;

    let allUsersButton = null;

    if (currentUser.isAdmin){
			allUsersButton = (
				<button type="submit">
					<Link to={`/users`}>All Users</Link>
				</button>
			);
		}

    return(
      <div>
    <h1>Welcome to Catsco!</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {allUsersButton}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <Link to="/products">Products</Link>
    </nav>
    <hr />
  </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    currentUser: state.auth
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

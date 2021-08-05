import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import SingleUser from './components/SingleUser';
import SingleProduct from './components/SingleProduct';
import CreateProduct from './components/CreateProduct';
import EditUser from './components/EditUser';
//import EditProduct from './components/EditProduct';
//import ErrorHandler from './components/ErrorHandler';
import { me } from './store';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route exact path="/home" component={Home} />
						{/* <Redirect to="/home" /> */}
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
					</Switch>
				)}
				{/* <main> */}
				<Switch>
					<Route exact path="/products/create" component={CreateProduct} />
					<Route exact path="/products/edit/:productId" component={EditProduct} />
					<Route exact path="/users/:userId" component={SingleUser} />
					<Route exact path="/products/:productId" component={SingleProduct} />
					{/* <Route exact path="/users/edit/:userId" component={EditUser} /> */}
					<Route exact path="/products" component={AllProducts} />
					<Route path="/cart" component={Cart} />
					{/* <Route component={ErrorHandler} /> */}
				</Switch>
				{/* </main> */}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

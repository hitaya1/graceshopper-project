import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/singleUser';

export class UserCheckout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ccNumber: this.props.currentUser.cc || '',
			shippingAddress: this.props.currentUser.shippingAddress || '',
			billingAddress: this.props.currentUser.billingAddress || '',
			cardholdersName:
				this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName ||
				' ',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  // componentDidMount() {
  //   this.props.getSingleUser(this.props.currentUser.id, this.props.currentUser)
  // }
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		// console.log('hi submit');
		// this.props.createProduct({ ...this.state }, this.props.currentUser);
	}
	render() {
    // console.log(this.props)
		const { cardholdersName, ccNumber, shippingAddress, billingAddress } =
			this.state;
		const { handleSubmit, handleChange } = this;

		return (
			<form id="place-order-form" onSubmit={handleSubmit}>
				<label htmlFor="cardholdersName">Cardholder's name:</label>
				<input
					name="cardholdersName"
					onChange={handleChange}
					value={cardholdersName}
				/>

				<label htmlFor="ccNumber"> Card Number:</label>
				<input name="ccNumber" onChange={handleChange} value={ccNumber} />

				<label htmlFor="shippingAddress"> Shipping Address:</label>
				<input
					name="shippingAddress"
					onChange={handleChange}
					value={shippingAddress}
				/>

				<label htmlFor="billingAddress"> Billing Address:</label>
				<input
					name="billingAddress"
					onChange={handleChange}
					value={billingAddress}
				/>

				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapState = (state) => ({
	currentUser: state.auth,
});

// const mapDispatch = (dispatch, { history }) => {
// 	return {
// 		getSingleUser: (userId, user) => dispatch(fetchSingleUser(userId, user, history))
// 	};
// };
export default connect(mapState)(UserCheckout);

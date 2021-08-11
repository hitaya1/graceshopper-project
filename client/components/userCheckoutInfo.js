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
				this.props.currentUser.firstName +
					' ' +
					this.props.currentUser.lastName || ' ',
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
		// this.props.createProduct({ ...this.state }, this.props.currentUser);
	}
	render() {
		const { cardholdersName, ccNumber, shippingAddress, billingAddress } =
			this.state;
		const { handleSubmit, handleChange } = this;

		return (
			<div className='container'>
				<form id='place-order-form' onSubmit={handleSubmit}>
					<div className='column'>
						<label htmlFor='cardholdersName'>Cardholder's name:</label>
					</div>
					<div className='column-2'>
						<input
							id='checkout-form'
							type='text'
							name='cardholdersName'
							onChange={handleChange}
							value={cardholdersName}
						/>
					</div>
					<div className='column'>
						<label htmlFor='ccNumber'> Card Number:</label>
					</div>
					<div className='column-2'>
						<input
							id='checkout-form'
							type='text'
							name='ccNumber'
							onChange={handleChange}
							value={ccNumber}
						/>
					</div>
					<div className='column'>
						<label htmlFor='shippingAddress'> Shipping Address:</label>
					</div>
					<div className='column-2'>
						<input
							id='checkout-form'
							type='text'
							name='shippingAddress'
							onChange={handleChange}
							value={shippingAddress}
						/>
					</div>
					<div className='column'>
						<label htmlFor='billingAddress'> Billing Address:</label>
					</div>
					<div className='column-2'>
						<input
							id='checkout-form'
							type='text'
							name='billingAddress'
							onChange={handleChange}
							value={billingAddress}
						/>
					</div>

					<button type='submit' id='user-checkout-cart'>
						Submit
					</button>
				</form>
			</div>
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

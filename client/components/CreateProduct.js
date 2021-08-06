import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store/products';

class CreateProduct extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			price: 0,
      image: '',
      quantity: 0,
      category: '1',
      description: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.createProduct({ ...this.state }, this.props.currentUser);
	}

	render() {
		const { name, price, image, quantity, category, description } = this.state;
		const { handleSubmit, handleChange } = this;

		return (
			<form id="product-form" onSubmit={handleSubmit}>
				<label htmlFor="name">Product:</label>
				<input name="name" onChange={handleChange} value={name} />

				<label htmlFor="price"> Price:</label>
				<input name="price" onChange={handleChange} value={price} />

				<label htmlFor="image"> Image:</label>
				<input name="image" onChange={handleChange} value={image} />

        <label htmlFor="quantity"> Quantity:</label>
				<input name="quantity" onChange={handleChange} value={quantity} />

        <label htmlFor="category"> Category:</label>
				<input name="category" onChange={handleChange} value={category} />

        <label htmlFor="description"> Description:</label>
				<input name="description" onChange={handleChange} value={description} />

				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapState = (state) => ({
	currentUser: state.auth
});
const mapDispatchToProps = (dispatch) => ({
	createProduct: (product, user) => dispatch(createProduct(product, user))
});

export default connect(mapState, mapDispatchToProps)(CreateProduct);

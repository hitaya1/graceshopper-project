import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, editProduct } from '../store/singleProduct';

class EditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.product.id,
			name: this.props.product.name || '',
			price: this.props.product.price || 0,
			image: this.props.product.image || '',
			quantity: this.props.product.quantity || 0,
			category: this.props.product.category || '1',
			description: this.props.product.description || ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		try {
			const { productId } = this.props.match.params;
			this.props.getProduct(productId);
		} catch (error) {
			console.log(error);
		}
	}

	componentDidUpdate(prevProp) {
		if (prevProp.product.productId !== this.props.product.productId) {
			this.setState({
				id: this.props.product.id,
				name: this.props.product.name || '',
				price: this.props.product.price || 0,
				image: this.props.product.image || '',
				quantity: this.props.product.quantity || 0,
				category: this.props.product.category || 1,
				description: this.props.product.description || '',
			});
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.editProduct({ ...this.state });
	}

	render() {
		const { name, price, image, quantity, category, description } = this.state;
		const { handleSubmit, handleChange } = this;
		return (
			<div className="editProduct">
				<form id="product-form" onSubmit={handleSubmit}>
					<label htmlFor="name">Product: </label>
					<input name="name" onChange={handleChange} value={name} />

					<label htmlFor="price">Price: </label>
					<input name="price" onChange={handleChange} value={price} />
					<label htmlFor="image">image: </label>
					<input name="image" onChange={handleChange} value={image} />

					<label htmlFor="quantity">quantity: </label>
					<input name="quantity" onChange={handleChange} value={quantity} />

					<label htmlFor="category">category: </label>
					<input name="category" onChange={handleChange} value={category} />

					<label htmlFor="description">description: </label>
					<input
						name="description"
						onChange={handleChange}
						value={description}
					/>

					<button type="submit">Submit</button>
				</form>
				<form onSubmit={(ev) => ev.preventDefault()} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	product: state.singleProduct,
	currentUser: state.auth
});

const mapDispatchToProps = (dispatch, { history }) => ({
	editProduct: (product) => dispatch(editProduct(product, history)),
	getProduct: (id) => dispatch(fetchSingleProduct(id, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts, rearrangeProducts } from '../store/products';
import axios from 'axios';

class AllProducts extends React.Component {
  constructor(){
    super();
    this.state = {
      arrange: '',
      filter: [],
      filterDisplay: 'None',
      practicalityFilter: 0,
      priceFilterMin: 0,
      priceFilterMax: 0,
      currentPage: 1,
      totalProducts: 0
    }
    this.clickDelete = this.clickDelete.bind(this);
    this.priceOrder = this.priceOrder.bind(this);
    this.practicalityOrder = this.practicalityOrder.bind(this);
    this.priceOrder = this.priceOrder.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filter = this.filter.bind(this);
    this.handlePracticalityChange = this.handlePracticalityChange.bind(this);
    this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
    this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
    this.updateActiveFilters = this.updateActiveFilters.bind(this);
    // this.pageUp = this.pageUp.bind(this);
    // this.pageDown = this.pageDown.bind(this);
    this.getProductTotal = this.getProductTotal.bind(this);
  }
	componentDidMount() {
		this.props.getProducts();
    this.getProductTotal();
	}
  async getProductTotal() {
    try {
      const response = await axios.get(`/api/products`);
      this.setState({ totalProducts: response.data.length })
    } catch (e) {
      console.error('Danger! Danger! Inoperable request detected! Self-destruct initiated!');
      console.error(e);
    }
  }

	async clickDelete(event) {
    await this.props.deleteProduct(event.target.name, this.props.currentUser);
    this.props.getProducts();
    this.getProductTotal();
  }

practicalityOrder(){
	const reoRay = [];
	const theseProducts = this.props.products;

	if (this.state.arrange !== 'practicality descending'){
		this.setState({ arrange: 'practicality descending' });
		for (let i = 1; i < 6; i++){
			for (let j = 0; j < theseProducts.length; j++){
				if (theseProducts[j].category === i){ reoRay.push(theseProducts[j]); }
			}
		}
	}
	else {
		this.setState({ arrange: 'practicality ascending' });
		for (let i = 5; i > 0; i--){
			for (let j = 0; j < theseProducts.length; j++){
				if (theseProducts[j].category === i){ reoRay.push(theseProducts[j]); }
			}
		}
	}
	this.props.arrangeProducts(reoRay);
}

priceOrder(){
	const reoRay = [];
	const priceRay = [];
	const priceRayCopy = [];
	const indexRay = [];
	const usedIndexRay = [];
	let minDex = -1;
	let minDexCopy = -1;
	let nextDue = -1;
	const theseProducts = this.props.products;

	if (this.state.arrange !== 'price ascending'){
		this.setState({ arrange: 'price ascending' });
	}
	else {
		this.setState({ arrange: 'price descending' });
	}

	for (let i = 0; i < theseProducts.length; i++){
		priceRay.push(theseProducts[i].price);
		priceRayCopy.push(theseProducts[i].price);
	}
	for (let i = 0; i < priceRay.length; i++){
		if (this.state.arrange === 'price descending') { nextDue = Math.min(...priceRayCopy); }
		else { nextDue = Math.max(...priceRayCopy); }

		minDex = priceRay.indexOf(nextDue);
		const tempPriceRay = [...priceRay];

		while (usedIndexRay.includes(minDex)){
			tempPriceRay.splice(minDex, 1, NaN);
			minDex = tempPriceRay.indexOf(nextDue);
		}
		usedIndexRay.push(minDex);

		minDexCopy = priceRayCopy.indexOf(nextDue);
		indexRay.push(minDex);
		priceRayCopy.splice(minDexCopy, 1);
	}
	for (let i = 0; i < indexRay.length; i++){
		reoRay.push(theseProducts[indexRay[i]]);
	}
	this.props.arrangeProducts(reoRay);
}

handlePracticalityChange(event) {
	const currentFilters = this.state.filter;
	this.setState({ practicalityFilter: event.target.value }, () => {
		if (this.state.practicalityFilter > 0 && this.state.practicalityFilter <= 5){
			if (!currentFilters.includes('Practicality')){
				this.setState({ filter: [...currentFilters, 'Practicality'] }, () => this.updateActiveFilters());
			}
		}
		else {
			this.setState({ filter: currentFilters.filter((element) => element !== 'Practicality')}, () => this.updateActiveFilters());
		}
	});
}

handlePriceMinChange(event) {
	const currentFilters = this.state.filter;
	this.setState({ priceFilterMin: event.target.value }, () => {
		if (this.state.priceFilterMin > 0){
			if (!currentFilters.includes('Price: min')){
				this.setState({ filter: [...currentFilters, 'Price: min'] }, () => this.updateActiveFilters());
			}
		}
		else {
			this.setState({ filter: currentFilters.filter((element) => element !== 'Price: min')}, () => this.updateActiveFilters());
		}
	});
}

handlePriceMaxChange(event) {
	const currentFilters = this.state.filter;
	this.setState({ priceFilterMax: event.target.value }, () => {
		if (this.state.priceFilterMax > 0){
			if (!currentFilters.includes('Price: max')){
				this.setState({ filter: [...currentFilters, 'Price: max'] }, () => this.updateActiveFilters());
			}
		}
		else {
			this.setState({ filter: currentFilters.filter((element) => element !== 'Price: max')}, () => this.updateActiveFilters());
		}
	});
}

handleFilter(event){
	const currentFilter = this.state.filter;
	const newFilter = event.target.name;

	if (!this.state.filter.includes(newFilter)){
		this.setState({ filter: [...currentFilter, newFilter] }, () => this.updateActiveFilters() );
	}
	else {
		this.setState({ filter: currentFilter.filter((element) => element !== newFilter)}, () => this.updateActiveFilters() );
	}
}

filter(origiRay){
	let mutaRay = [...origiRay];

	if (this.state.practicalityFilter > 0 && this.state.practicalityFilter <= 5){
		mutaRay = mutaRay.filter((element) => element.category === parseInt(this.state.practicalityFilter))
	}
	if (this.state.priceFilterMin > 0){
		mutaRay = mutaRay.filter((element) => element.price >= this.state.priceFilterMin)
	}
	if (this.state.priceFilterMax > 0){
		mutaRay = mutaRay.filter((element) => element.price <= this.state.priceFilterMax)
	}

	return mutaRay;
}

updateActiveFilters(){
	let activeFilters = 'None';
	if (this.state.filter.length > 0){
		activeFilters = this.state.filter.join(', ');
	}
	this.setState({ filterDisplay: activeFilters });
}

// pageUp(){
// 	const newPage = this.state.currentPage + 1;
// 	if ((newPage * 10 - 10) < this.state.totalProducts){
// 		this.setState({ currentPage: newPage }, () =>
// 		this.props.getProducts(`page=${this.state.currentPage}`));
// 	}
// }
// pageDown(){
// 	const newPage = this.state.currentPage - 1;
// 	if (this.state.currentPage > 1){
// 		this.setState({ currentPage: newPage }, () =>
// 		this.props.getProducts(`page=${this.state.currentPage}`));
// 	}
// }

	render() {
    const turnDown = '<<';
    const turnUp = '>>';
		const { products, currentUser } = this.props;

		let createButton = null;

		if (currentUser.isAdmin){
			createButton = (
				<Link to={`/products/create`}>
					<button className="product">Add to CATalogue</button>
				</Link>
			);
		}

		return (
			<div>
				<h1>SHOP MEOW!</h1>
				{createButton}

				<div className="sort-and-filter">
					<div className="sort">
						<h2>Sort by:</h2>
						<button type="button" className="arrange-button" onClick={this.practicalityOrder}>Practicality</button>
						<button type="button" className="arrange-button" onClick={this.priceOrder}>Price</button>
					</div>
					<div className="filter">

					<form id="filter-practicality-form">
						<label htmlFor="Practicality">Practicality:</label>
						<select name="Practicality" onChange={this.handlePracticalityChange}>
							<option value={0}>Show All</option>
							<option value={1}>1: Realistic</option>
							<option value={2}>2: Silly</option>
							<option value={3}>3: Nonsensical</option>
							<option value={4}>4: Ridiculous</option>
							<option value={5}>5: Ludicrous</option>
						</select>
					</form>

						<form id="filter-price-min-form">
							<label htmlFor="priceFilterMin" className="filter-input-label">Price min:</label>
							<input name="priceFilterMin" className="filter-input-box" onChange={this.handlePriceMinChange} value={this.state.priceFilterMin || 0} />
						</form>
						<form id="filter-price-max-form">
							<label htmlFor="priceFilterMax" className="filter-input-label">Price max:</label>
							<input name="priceFilterMax" className="filter-input-box" onChange={this.handlePriceMaxChange} value={this.state.priceFilterMax || 0} />
						</form>
					</div>
      	</div>
				<div className="page-turn">
					<button type="button" className="page-button" name="down" onClick={this.pageDown}>{turnDown}</button>
					<h3 className="page-label">Page: {this.state.currentPage} / {Math.ceil((this.state.totalProducts) / 10)}</h3>
					<button type="button" className="page-button" name="up" onClick={this.pageUp}>{turnUp}</button>
				</div>



				<div>
					{products && products.length ? (
						<div className='products'>
							{this.filter(products).map((product) => {
								return (
									<div key={product.id} className='product'>
										<Link to={`/products/${product.id}`}>
											<img className="product-image" src={product.image || 'https://apluspetsitting.com/wp-content/uploads/2016/03/cats-150x150.jpg'} />
											<div>{product.name}</div>
										</Link>
										{currentUser.isAdmin ? (
											<button type="button" className="delete-button" name={product.id} onClick={this.clickDelete}>Remove from CATalogue</button>
										) :
										(
											<p></p>
										)}
										<div>${product.price /100}</div>
										<h5>Praticatily Rating: {product.category}</h5>
									</div>
								);
							})}
						</div>
					) : (
						<div>Cats destroyed everything - run for your life!</div>
					)}
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	products: state.products,
	currentUser: state.auth
});

const mapDispatch = (dispatch, { history }) => ({
	getProducts: () => dispatch(fetchProducts()),
	deleteProduct: (id, user) => dispatch(deleteProduct(id, user, history)),
	arrangeProducts: (orderedProducts) => dispatch(rearrangeProducts(orderedProducts))
});

export default connect(mapState, mapDispatch)(AllProducts);

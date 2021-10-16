import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	deleteProduct,
	fetchProducts,
	rearrangeProducts,
} from '../store/products'
import axios from 'axios'

class AllProducts extends React.Component {
	constructor() {
		super()
		this.state = {
			arrange: '',
			filter: [],
			filterDisplay: 'None',
			practicalityFilter: 0,
			priceFilterMin: 0,
			priceFilterMax: 0,
			currentPage: 1,
			totalProducts: 0,
		}
		this.clickDelete = this.clickDelete.bind(this)
		this.priceOrder = this.priceOrder.bind(this)
		this.practicalityOrder = this.practicalityOrder.bind(this)
		this.priceOrder = this.priceOrder.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.filter = this.filter.bind(this)
		this.handlePracticalityChange = this.handlePracticalityChange.bind(this)
		this.handlePriceMinChange = this.handlePriceMinChange.bind(this)
		this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this)
		this.updateActiveFilters = this.updateActiveFilters.bind(this)
		// this.pageUp = this.pageUp.bind(this);
		// this.pageDown = this.pageDown.bind(this);
		this.getProductTotal = this.getProductTotal.bind(this)
	}
	componentDidMount() {
		this.props.getProducts()
		this.getProductTotal()
	}
	async getProductTotal() {
		try {
			const response = await axios.get(`/api/products`)
			this.setState({ totalProducts: response.data.length })
		} catch (e) {
			console.error('get product total failed')
			console.error(e)
		}
	}

	async clickDelete(event) {
		await this.props.deleteProduct(event.target.name)
		this.props.getProducts()
		this.getProductTotal()
	}

	practicalityOrder() {
		const reoRay = []
		const theseProducts = this.props.products

		if (this.state.arrange !== 'Practicality (descending)') {
			this.setState({ arrange: 'Practicality (descending)' })
			for (let i = 1; i < 6; i++) {
				for (let j = 0; j < theseProducts.length; j++) {
					if (theseProducts[j].category === i) {
						reoRay.push(theseProducts[j])
					}
				}
			}
		} else {
			this.setState({ arrange: 'Practicality (ascending)' })
			for (let i = 5; i > 0; i--) {
				for (let j = 0; j < theseProducts.length; j++) {
					if (theseProducts[j].category === i) {
						reoRay.push(theseProducts[j])
					}
				}
			}
		}
		this.props.arrangeProducts(reoRay)
	}

	priceOrder() {
		const reoRay = []
		const priceRay = []
		const priceRayCopy = []
		const indexRay = []
		const usedIndexRay = []
		let minDex = -1
		let minDexCopy = -1
		let nextDue = -1
		const theseProducts = this.props.products

		if (this.state.arrange !== 'Price (descending)') {
			this.setState({ arrange: 'Price (descending)' })
		} else {
			this.setState({ arrange: 'Price (ascending)' })
		}

		for (let i = 0; i < theseProducts.length; i++) {
			priceRay.push(theseProducts[i].price)
			priceRayCopy.push(theseProducts[i].price)
		}
		for (let i = 0; i < priceRay.length; i++) {
			if (this.state.arrange === 'Price (descending)') {
				nextDue = Math.min(...priceRayCopy)
			} else {
				nextDue = Math.max(...priceRayCopy)
			}

			minDex = priceRay.indexOf(nextDue)
			const tempPriceRay = [...priceRay]

			while (usedIndexRay.includes(minDex)) {
				tempPriceRay.splice(minDex, 1, NaN)
				minDex = tempPriceRay.indexOf(nextDue)
			}
			usedIndexRay.push(minDex)

			minDexCopy = priceRayCopy.indexOf(nextDue)
			indexRay.push(minDex)
			priceRayCopy.splice(minDexCopy, 1)
		}
		for (let i = 0; i < indexRay.length; i++) {
			reoRay.push(theseProducts[indexRay[i]])
		}
		this.props.arrangeProducts(reoRay)
	}

	handlePracticalityChange(event) {
		const currentFilters = this.state.filter
		this.setState({ practicalityFilter: event.target.value }, () => {
			if (
				this.state.practicalityFilter > 0 &&
				this.state.practicalityFilter <= 5
			) {
				if (!currentFilters.includes('Practicality')) {
					this.setState({ filter: [...currentFilters, 'Practicality'] }, () =>
						this.updateActiveFilters()
					)
				}
			} else {
				this.setState(
					{
						filter: currentFilters.filter(
							(element) => element !== 'Practicality'
						),
					},
					() => this.updateActiveFilters()
				)
			}
		})
	}

	handlePriceMinChange(event) {
		const currentFilters = this.state.filter
		this.setState({ priceFilterMin: event.target.value }, () => {
			if (this.state.priceFilterMin > 0) {
				if (!currentFilters.includes('Price: min')) {
					this.setState({ filter: [...currentFilters, 'Price: min'] }, () =>
						this.updateActiveFilters()
					)
				}
			} else {
				this.setState(
					{
						filter: currentFilters.filter(
							(element) => element !== 'Price: min'
						),
					},
					() => this.updateActiveFilters()
				)
			}
		})
	}

	handlePriceMaxChange(event) {
		const currentFilters = this.state.filter
		this.setState({ priceFilterMax: event.target.value }, () => {
			if (this.state.priceFilterMax > 0) {
				if (!currentFilters.includes('Price: max')) {
					this.setState({ filter: [...currentFilters, 'Price: max'] }, () =>
						this.updateActiveFilters()
					)
				}
			} else {
				this.setState(
					{
						filter: currentFilters.filter(
							(element) => element !== 'Price: max'
						),
					},
					() => this.updateActiveFilters()
				)
			}
		})
	}

	handleFilter(event) {
		const currentFilter = this.state.filter
		const newFilter = event.target.name

		if (!this.state.filter.includes(newFilter)) {
			this.setState({ filter: [...currentFilter, newFilter] }, () =>
				this.updateActiveFilters()
			)
		} else {
			this.setState(
				{ filter: currentFilter.filter((element) => element !== newFilter) },
				() => this.updateActiveFilters()
			)
		}
	}

	filter(origiRay) {
		let mutaRay = [...origiRay]

		if (
			this.state.practicalityFilter > 0 &&
			this.state.practicalityFilter <= 5
		) {
			mutaRay = mutaRay.filter(
				(element) =>
					element.category === parseInt(this.state.practicalityFilter)
			)
		}
		if (this.state.priceFilterMin > 0) {
			mutaRay = mutaRay.filter(
				(element) => element.price / 100 >= this.state.priceFilterMin
			)
		}
		if (this.state.priceFilterMax > 0) {
			mutaRay = mutaRay.filter(
				(element) => element.price / 100 <= this.state.priceFilterMax
			)
		}

		return mutaRay
	}

	updateActiveFilters() {
		let activeFilters = 'None'
		if (this.state.filter.length > 0) {
			activeFilters = this.state.filter.join(', ')
		}
		this.setState({ filterDisplay: activeFilters })
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
		const turnDown = '<<'
		const turnUp = '>>'
		const { products, currentUser } = this.props

		let createButton = null

		if (currentUser.isAdmin) {
			createButton = (
				<Link to={`/products/create`}>
					<button id="create-button">Add to CATalogue</button>
				</Link>
			)
		}

		return (
			<div>


				<div>
					<div className="sort-and-filter">	<div style={{display: 'flex', justifyContent: 'flex-start'}}>{createButton}</div>
						<div className="sort">
							<div id="sort"></div>
							<button
								type="button"
								id="arrange-button"
								onClick={this.practicalityOrder}
							>
								Practicality
							</button>
							<button
								type="button"
								id="arrange-button"
								onClick={this.priceOrder}
							>
								Price
							</button>
							<div className="filter">
								<h2>
									Sorted by:{' '}
									{this.state.arrange ? this.state.arrange : 'Cuteness'}{' '}
								</h2>
								<form id="filter-practicality-form">
									<label htmlFor="Practicality">Practicality:</label>
									<select
										id="select-bar"
										name="Practicality"
										onChange={this.handlePracticalityChange}
									>
										<option value={0}>Show All</option>
										<option value={1}>1: Realistic</option>
										<option value={2}>2: Silly</option>
										<option value={3}>3: Nonsensical</option>
										<option value={4}>4: Ridiculous</option>
										<option value={5}>5: Ludicrous</option>
									</select>
								</form>

								<form id="filter-price-min-form">
									<label
										htmlFor="priceFilterMin"
										className="filter-input-label"
									>
										Price min:
									</label>
									<input
										id="product-filter"
										type="text"
										name="priceFilterMin"
										className="filter-input-box"
										onChange={this.handlePriceMinChange}
										value={this.state.priceFilterMin || 0}
									/>
								</form>
								<form id="filter-price-max-form">
									<label
										htmlFor="priceFilterMax"
										className="filter-input-label"
									>
										Price max:
									</label>
									<input
										id="product-filter"
										type="text"
										name="priceFilterMax"
										className="filter-input-box"
										onChange={this.handlePriceMaxChange}
										value={this.state.priceFilterMax || 0}
									/>
								</form>
							</div>{' '}
						</div>
					</div>
					<div className="page-turn">
						<button
							type="button"
							id="page-button"
							name="down"
							onClick={this.pageDown}
						>
							{turnDown}
						</button>
						<div className="page-label">
							Page: {this.state.currentPage} /{' '}
							{Math.ceil(this.state.totalProducts / 10)}
						</div>
						<button
							type="button"
							id="page-button"
							name="up"
							onClick={this.pageUp}
						>
							{turnUp}
						</button>
					</div>{' '}
				</div>

				<div>
					{products && products.length ? (
						<div className="products">
							{this.filter(products).map((product) => {
								return (
									<div key={product.id} id="product">
										<img className="product-image" src={product.image} />
										<Link to={`/products/${product.id}`}>
											<div id="productName">{product.name}</div>
										</Link>
										{currentUser.isAdmin && (
											<div>
												{' '}
												<button
													type="submit"
													id="delete-button"
													name={product.id}
													onClick={this.clickDelete}
												>
													x
												</button>
											</div>
										)}
										<div id="product-price">${product.price / 100}</div>
										<div id="praticatily-rating">
											Praticatily Rating: {product.category}
										</div>
									</div>
								)
							})}
						</div>
					) : (
						<div>Cats destroyed everything - run for your life!</div>
					)}
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	products: state.products,
	currentUser: state.auth,
})

const mapDispatch = (dispatch, { history }) => ({
	getProducts: () => dispatch(fetchProducts(history)),
	deleteProduct: (id) => dispatch(deleteProduct(id, history)),
	arrangeProducts: (orderedProducts) =>
		dispatch(rearrangeProducts(orderedProducts)),
})

export default connect(mapState, mapDispatch)(AllProducts)

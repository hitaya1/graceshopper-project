//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const ProdOrder = require('./models/ProductOrder');

//associations could go here!

User.hasMany(Order)
Order.belongsTo(User)
Product.belongsToMany(Order, {through: ProdOrder})
Order.belongsToMany(Product, {through: ProdOrder})

module.exports = {
	db,
	models: {
		User,
		Product,
		ProdOrder,
		Order
	},
};

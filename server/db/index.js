//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

//associations could go here!

Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });

module.exports = {
	db,
	models: {
		User,
		Product,
		Cart,
	},
};
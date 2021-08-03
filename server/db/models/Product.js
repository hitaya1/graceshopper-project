const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: './public/pics/download.png',
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
		},
		defaultValue: 0,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

module.exports = Product;

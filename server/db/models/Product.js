const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		//add minimum
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: '/pics/download.png',
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
		},
		defaultValue: 1,
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
		},
		defaultValue: 0,
	},
	category: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5
		},
	},
	description: {
		type: Sequelize.TEXT,
		defaultValue: 'No description? Cat got your tongue?',
	},
});

module.exports = Product;

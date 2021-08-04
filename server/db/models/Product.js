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
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 10
		}
	},
	description: {
		type: Sequelize.TEXT,
		defaultValue: 'Looks like the description is missing!'
	},
});

module.exports = Product;

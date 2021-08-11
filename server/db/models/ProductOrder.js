const Sequelize = require('sequelize');
const db = require('../db');

const ProdOrder = db.define('ProdOrder', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	}
});

module.exports = ProdOrder;

const Sequelize = require('sequelize');
const db = require('../db');

const ProdOrder = db.define('ProdOrder', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	totalPrice: {
		type: Sequelize.INTEGER,
		allowNull: false,
	}
});

module.exports = ProdOrder;

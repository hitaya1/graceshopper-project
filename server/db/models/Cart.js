const Sequelize = require('sequelize');
const db = require('../db');

//convert into order table
const Cart = db.define('cart', {
	//create product-order table and move quantity to it

	//order table should have {id: integer, isCompleted: bool}
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports = Cart;

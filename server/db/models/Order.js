const Sequelize = require('sequelize');
const db = require('../db')

const Order = db.define('order', {
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order;
//Maybe put total Price on the Order db table

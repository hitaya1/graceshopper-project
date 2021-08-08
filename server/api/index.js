const router = require('express').Router()
module.exports = router

const Order = require('../db/models/Order')

router.use('/users', require('./users'))
router.use('/products', require('./products'))
// router.use('/order', require('./order'))

// router.get('/cart', (req, res, next) => {
//   try {
//     const order = Order.findAll()[0];
//     res.send(order)
//   } catch (error) {
//     next(error)
//   }
// } )

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

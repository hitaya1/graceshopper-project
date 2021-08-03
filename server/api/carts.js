const router = require('express').Router()
const { models: { Cart, Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.send(carts);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.send(await Product.create(req.body))
  } catch (error) {
    next(error)
  }
})
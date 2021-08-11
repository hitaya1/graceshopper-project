const router = require('express').Router()
const { models: { Product }} = require('../db')
const { requireToken, requireAdmin } = require('./gatekeepingMiddleware');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (e) {
    next(e)
  }
})

router.post ('/', requireToken, requireAdmin, async (req, res, next) => {
  try {
    res.send(await Product.create(req.body))
  } catch (e) {
    next (e)
  }
})

router.put('/:id/checkout', requireToken, async (req, res, next) => {
  try {
    const updateproduct = await Product.findByPk(req.params.id);
    res.send(await updateproduct.update(req.body))
  } catch(e) {
    next(e)
  }
})

router.put('/:id', requireToken, requireAdmin, async (req, res, next) => {
  try {
    const updateproduct = await Product.findByPk(req.params.id);
    res.send(await updateproduct.update(req.body))
  } catch(e) {
    next(e)
  }
})


router.delete('/:id', requireToken, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
      res.send(product)
  } catch (error) {
    next(error)
  }
})

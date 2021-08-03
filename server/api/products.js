const router = require('express').Router()
const { models: { Product, User }} = require('../db')
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

router.post ('/create', async (req, res, next) => {
  try {
    // WE NEED TO CHECK IF THE USER IS AN ADMIN TO CREATE NEW PRODUCTS!!!
    res.send(await Product.create(req.body))
  } catch (e) {
    next (e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updateproduct = await Product.findByPk(req.params.id);
    res.send(await updateproduct.update(req.body))
  } catch(e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
     // WE NEED TO CHECK IF THE USER IS AN ADMIN TO DELETE PRODUCTS!!!
    const product = await Product.findByPk(req.params.id);
    if (product.isAdmin === true) {
      await product.destroy();
      res.send(product)
    } else {
      res.send("Nice try, maybe next time")
    }
  } catch (error) {
    next(error)
  }
})
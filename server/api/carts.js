const router = require('express').Router()
const { models: { Cart }} = require('../db');
module.exports = router

router.get('/:id/cart', async (req, res, next) => {
  try {

    const carts = await Cart.findAll({
      include: {
        where: {
          userId: req.params.id
        }
      }
    });
    res.send(carts);
  } catch (error) {
    next(error)
  }
})

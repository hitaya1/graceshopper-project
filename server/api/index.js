const router = require('express').Router();
module.exports = router;

const Order = require('../db/models/Order');
const User = require('../db/models/User');

router.use('/users', require('./users'));
router.use('/products', require('./products'));
// router.get('/cart', (req, res, next) => {
//   try {
//     const order = Order.findAll()[0];
//     res.send(order)
//   } catch (error) {
//     next(error)
//   }
// } )

router.post(':id/checkout', async (req, res, next) => {
	try {
		const order = await Order.create();
		// const user = await User.findByPk(req.params.id);
		// await user.createOrder(order);
		// res.send(user);
    res.send
	} catch (error) {
		next(error);
	}
});

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

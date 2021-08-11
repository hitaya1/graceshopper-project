const router = require('express').Router();
module.exports = router;

const Order = require('../db/models/Order');
const User = require('../db/models/User');
const Product = require('../db/models/Product')
const ProdOrder = require('../db/models/ProductOrder')


router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.post('/checkout', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.body.userId);
		const order = await Order.create();
		order.setUser(user)

		const newProdOrder = req.body.cart.map(product => {
			ProdOrder.create({
				productId: product.id,
				orderId: order.id,
				quantity: product.quantity,
				price: product.price
			})
		})
		res.send(newProdOrder)
	} catch (error) {
		next(error);
	}
});

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

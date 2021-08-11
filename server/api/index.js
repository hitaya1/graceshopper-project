const router = require('express').Router();
module.exports = router;

const Order = require('../db/models/Order');
const User = require('../db/models/User');
const Product = require('../db/models/Product')
const ProdOrder = require('../db/models/ProductOrder')

// console.log(Object.keys(Order.prototype))
// console.log('this is from PRODORDER', Object.keys(ProdOrder.prototype));
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

		// console.log('this is order', order)
		// console.log('this is prodOrder', prodOrder)
		// await order.setUser(user);
		// await order.addProducts(req.body.cart)
		// const ok = req.body.cart.forEach((product) => {
		// 	order.addProduct(product)
		// })
		// console.log(ok)
		res.send(newProdOrder)
	} catch (error) {
		next(error);
	}
});

// router.post(':id/checkout', async (req, res, next) => {
// 	try {
// 		const order = await Order.create();
// 		const user = await User.findByPk(req.params.id);
// 		await user.createOrder(order);
// 		res.send(user);
//     res.send
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

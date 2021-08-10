const router = require('express').Router();
const {
	models: { User, ProdOrder, Order, Product },
} = require('../db');
const { requireToken, requireAdmin, userIsUser } = require('./gatekeepingMiddleware');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.send(user);
	} catch (e) {
		next(e);
	}
});

// router.post ('/create', async (req, res, next) => {
//   try {
//     res.send(await User.create(req.body))
//   } catch (e) {
//     next (e)
//   }
// })

router.put('/:id', async (req, res, next) => {
	try {
		const updateUser = await User.findByPk(req.params.id);
		res.send(await updateUser.update(req.body));
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
			await user.destroy();
			res.send(user);
	} catch (error) {
		next(error);
	}
});

//doesn't register order
router.get('/:id/cart', async (req, res, next) => {
	try {
		const cart = await Order.findOne({
			where: {
				userId: req.params.id,
				isCompleted: false
			},
			include: {
				model: ProdOrder,
				include: [Product]
			}
		});
		res.send(cart);
	} catch (error) {
		next(error);
	}
});

router.post('/:id/cart', async (req, res, next) => {
	try {
		console.log('THIS IS REQ.BODY FROM API', req.body)
		const product = await Product.findByPk(req.body.productId)
		res.send(product)
	} catch (error) {
		next(error)
	}
})

// router.delete('/:id/cart', userIsUser, async (req, res, next) => {
// 	try {
// 	} catch (error) {
// 		next(error)
// 	}
// })


router.get('/:id/order-history', async (req, res, next) => {
	try {
		const orderHistory = await Order.findAll({
			where: {
				userId: req.params.id,
				isCompleted: true
			}
		});
		res.send(orderHistory);
	} catch (error) {
		next(error);
	}
});

// //NEED TO REVIEW THIS LOGIC IN THE CODE
// router.get('/:id/order-history', async (req, res, next) => {
// 	try {
// 		const orderHistory = await ProdOrder.findAll({
// 			// include: {
// 			//   where: {
// 			//     orderId: {
// 			//       userId: req.params.id
// 			//       }
// 			//     }
// 			//   }
// 			where: {
// 				orderId: req.params.id,
// 			},
// 		});
// 		res.send(orderHistory);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get('/:id/order-history/:ProdOrderId', async (req, res, next) => {
// 	try {
// 		const orderHistory = await ProductOrder.findOne({
// 			// include: {
// 			//   where: {
// 			//     orderId: {
// 			//       userId: req.params.id
// 			//       },
// 			//       id: req.params.ProdOrderId
// 			//     }
// 			//   },
// 			where: {
// 				orderId: req.params.id,
// 				productId: req.params.ProdOrderId,
// 			},
// 		});
// 		res.send(orderHistory);
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = router;

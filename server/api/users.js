const router = require('express').Router();
const {
	models: { User, ProdOrder, Order },
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

router.post ('/', async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (e) {
    next (e)
  }
})

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
router.get('/:id/order', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				userId: req.params.id,
			},
		});
		res.send(orders);
	} catch (error) {
		next(error);
	}
});

router.get('/:id/order/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params, {
			where: {
				userId: req.params.id,
				id: req.params.orderId,
			},
		});
		res.send(order);
	} catch (error) {
		next(error);
	}
});

//NEED TO REVIEW THIS LOGIC IN THE CODE
router.get('/:id/order-history', async (req, res, next) => {
	try {
		const orderHistory = await ProdOrder.findAll({
			// include: {
			//   where: {
			//     orderId: {
			//       userId: req.params.id
			//       }
			//     }
			//   }
			where: {
				orderId: req.params.id,
			},
		});
		res.send(orderHistory);
	} catch (error) {
		next(error);
	}
});

router.get('/:id/order-history/:ProdOrderId', async (req, res, next) => {
	try {
		const orderHistory = await ProdOrder.findOne({
			// include: {
			//   where: {
			//     orderId: {
			//       userId: req.params.id
			//       },
			//       id: req.params.ProdOrderId
			//     }
			//   },
			where: {
				orderId: req.params.id,
				productId: req.params.ProdOrderId,
			},
		});
		res.send(orderHistory);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

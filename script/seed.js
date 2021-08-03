'use strict';

const {
	db,
	models: { User },
	models: { Product }
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

 const users = [
	{ username: 'cody', password: '123' },
	{ username: 'murphy', password: '123' },
	{ username: 'jae', password: '123' },
	{ username: 'steph', password: '123' },
	{ username: 'andrew', password: '123' },
	{ username: 'taya', password: '123' },
	{ username: 'tenzing', password: '123' },
	{ username: 'albina', password: '123' },
	{ username: 'mike', password: '123' },
	{ username: 'jason', password: '123' },
	{ username: 'sung', password: '123' },
];

const products = [{
	name: 'cat toy',
	price: 15.99,
	quantity: 0,
	category: 'toy',
	description: 'toy for cats'
}, {
	name: 'cat tower',
	price: 100.00,
	quantity: 0,
	category: 'furniture',
	description: 'tower for cats'
}, {
	name: 'catnip',
	price: 1000.00,
	quantity: 0,
	category: 'toy',
	description: 'weed for cats'
}, {
	name: 'cat pan',
	price: 10000.00,
	quantity: 0,
	category: 'kitchen',
	description: 'cat shaped pan'
}, {
	name: 'cat toy1',
	price: 15.99,
	quantity: 0,
	category: 'toy',
	description: 'toy for cats1'
}, {
	name: 'cat toy2',
	price: 19.99,
	quantity: 0,
	category: 'toy',
	description: 'toy for cats2'
}, {
	name: 'cat toy3',
	price: 7.99,
	quantity: 0,
	category: 'toy',
	description: 'toy for cats3'
}]

async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);

	let newUsers = await Promise.all(users.map(user => User.create(user)))
	let newProducts = await Promise.all(products.map(product => Product.create(product)))

	await Promise.all(newUsers.map(user => user.addProduct(newProducts[Math.floor(Math.random() * newProducts.length)])));
	await Promise.all(newProducts.map(product => product.addUser(newUsers[Math.floor(Math.random() * newUsers.length)])));
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

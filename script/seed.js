'use strict';

//const { camelizeIf } = require('sequelize/types/lib/utils');
const {
	db,
	models: { User },
	models: { Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
	{
		username: 'cody',
		password: '123',
		shippingAddress: '456 fake st',
		isAdmin: true,
		email: 'fake1@fake.com',
		firstName: 'Cody',
		lastName: 'The Pup',
	},
	{
		username: 'murphy',
		password: '123',
		email: 'fake2@fake.com',
		firstName: 'Murphy',
		lastName: 'H',
	},
	{
		username: 'jae',
		password: '123',
		email: 'fake3@fake.com',
		firstName: 'Jae',
		lastName: 'Jung',
	},
	{
		username: 'steph',
		password: '123',
		email: 'fake4@fake.com',
		firstName: 'Steph',
		lastName: 'Durino',
	},
	{
		username: 'andrew',
		password: '123',
		email: 'fake5@fake.com',
		firstName: 'Andrew',
		lastName: 'Kerr',
	},
	{
		username: 'taya',
		password: '123',
		email: 'fake6@fake.com',
		isAdmin: true,
		firstName: 'Taya',
		lastName: 'Ugay',
	},
	{
		username: 'tenzing',
		password: '123',
		email: 'fake7@fake.com',
		firstName: 'Tenzing',
		lastName: 'O',
	},
	{
		username: 'albina',
		password: '123',
		email: 'fake8@fake.com',
		firstName: 'Albina',
		lastName: 'Usmanova',
	},
	{
		username: 'mike',
		password: '123',
		email: 'fake9@fake.com',
		firstName: 'Mike',
		lastName: 'Alessi',
	},
	{
		username: 'jason',
		password: '123',
		email: 'fake10@fake.com',
		firstName: 'Jason',
		lastName: 'N',
	},
	{
		username: 'sung',
		password: '123',
		email: 'fake11@fake.com',
		firstName: 'Sung',
		lastName: 'Paik',
	},
];

const products = [
	{
		name: 'Catnip - 3oz',
		price: 637,
		image: '/pics/catnip.jpg',
		inventory: 1000,
		category: 1,
		description:
			"-100% NATURAL: pure, potent, and without chemicals, pesticides or fillers\n-PREMIUM: Planted, grown, and harvested at the highest peak of season\n-SAFE: Non-toxic, healthy way to play\n\n Bat and claw at your servants' toes until they give you some today!",
	},
	{
		name: 'Cat Condo',
		price: 2499,
		image: '/pics/condo.jpg',
		inventory: 100,
		category: 1,
		description:
			'COMFORTABLE & FUN\n\nThis multi-level unit is perfect for both sleep and play. Require your servants to place one in every room!',
	},
	{
		name: 'Cat Claw Clippers',
		price: 700,
		image: '/pics/clippers.jpg',
		inventory: 1500,
		category: 2,
		description:
			'Tired of your servants grabbing you and ruthlessly hacking away at your extremities only to make them feel better about serving you treats afterward? Paw at your servants until they see and order you this life-altering product allowing YOU to clip your own claws! No more will your obvious power hierarchy be shamelessly disregarded.',
	},
	{
		name: 'Cat Can Opener',
		price: 2399,
		image: '/pics/Can_opener.jpg',
		inventory: 500,
		category: 2,
		description:
			'Open your cans of food by yourself and no longer be at the whims of your slothful servants. There is no need to sit at your food dish and look adorable while you wait to be fed when you can just do it yourself!',
	},
	{
		name: 'Cat Nail Polish',
		price: 599,
		image: '/pics/nail_polish.jpg',
		inventory: 100,
		category: 2,
		description:
			"Whether you're going out for a night at the club or just want to look fancy at home, this easy claw-coloring polish will make you the center of attention -- not that you need it!",
	},
	{
		name: 'Cat Hat',
		price: 999,
		image: '/pics/cathat.jpg',
		inventory: 1000,
		category: 2,
		description:
			'This 100% wool cap will keep you warm during those cold winter nights patrolling your land. Show pride in your territory by donning this Cat Hat for Cats!',
	},
	{
		name: 'Cat Pen & Paper set',
		price: 1199,
		image: '/pics/pen_paper.jpg',
		inventory: 200,
		category: 3,
		description:
			'Whether you need to jot down some thoughts on what your servant has been up to for the past hour while you sat and stared or you need to catalogue a dream you just had during the 18 hours you sleep in a day, pen and paper is a must-have for any cat who fancies himself a scholar. Each set comes with a 500 page binder and 3 pens.',
	},
	{
		name: 'Cat Court',
		price: 24999,
		image: '/pics/basketball.jpg',
		inventory: 50,
		category: 3,
		description:
			'Tired of chasing the little baby toys your servants throw for you? Challenge them to a basketball game! Set comes with 2 hoops, a cement court, 2 side benches, and a basketball. Assembly required.',
	},
	{
		name: 'Cat Tool Set',
		price: 12599,
		image: '/pics/power_tool.jpg',
		inventory: 100,
		category: 3,
		description:
			'A compact and effective set of tools for the cat on the go. Never be caught with your tail down when at the edge of your territory and the need arises to build a wall.',
	},
	{
		name: 'Cat Scooter',
		price: 14967,
		image: '/pics/scooter.jpg',
		inventory: 70,
		category: 4,
		description:
			'-Innovative Power Core Technology\n-Rechargeable 12V sealed lead-acid battery provides an extended ride time of up to 80 minutes of continuous use\n-Rear-wheel drive delivers balance control and traction\n-Features a lightweight, all-steel frame and fork and flat-free, airless rear tire\n-Additional features include hand-operated, front brake and retractable kickstand',
	},
	{
		name: 'Cat Wok',
		price: 4999,
		image: '/pics/wok.jpg',
		inventory: 100,
		category: 4,
		description:
			'Hand-hammered by Siamese professionals, this wok is specially balanced for meats rather than vegetables. Insulated handle will not burn when you stir fry over high heat. Blast your beef and salmon to a delicious sear while maintaining a healthy medium-rare inside.',
	},
	{
		name: 'Cat Car',
		price: 2999598,
		image: '/pics/car.jpg',
		inventory: 20,
		category: 4,
		description:
			"Once you've claimed territory beyond your means to travel, it may be time to stop -- or is it? Hop into your cat car and get to where you need to be in a fraction of the time.",
	},
	{
		name: 'Adopt-a-Baby',
		price: 89999,
		image: '/pics/baby.jpg',
		inventory: 3,
		category: 5,
		//does anyone care if I site my source or not? Adapted from https://go-solutions.com/en-us/7-reasons-to-adopt-a-cat
		description:
			"Adopting a baby is one of the most rewarding things you can do for yourself and your household – and, of course, the baby! There's plenty to decide when rehoming a baby, such as whether your pet will be an outdoor or indoor baby and the best baby food to feed it. While you're making these decisions, here are 6 reasons why baby adoption is such a great idea: 1. Babies are good for you. Becoming a baby owner could be good for your mental health. Psychological reports suggest that babies can reduce loneliness in those who live on their own, plus having to feed and groom a baby can lend routine to your day and help you restructure your life.\n\n<b>2. Babies are low maintenance. Babies enjoy your company, but they also love a little \"me time\" and like their own space. That makes them a low-maintenance pet that's ideal for busy people lovers. Just feed them the best baby food and fresh water, keep a clean diaper, get them some stimulating toys, and show them plenty of love and affection. 3. Babies and kittens go together. Babies can help kittens learn about caring for people, social skills, and routines – especially if they help out at baby's feeding time. Studies show that younger babies, in particular, become affectionate with the kittens in the family. 4. Babies can keep you active</b>\nMany babies enjoy charging around the home and climbing up their teething posts or trees and fences if you have the outdoor space for them. They encourage you to get up and about yourself, which has a range of health benefits, both physical and mental. 5. Babies keep you young</b>\nAccording to Harvard, mental stimulation keeps your mind fit and helps stave off cognitive decline – keeping you young for longer. Babies love to play and will enjoy chasing a toy, looking for something you hide, and gently \"wrestling\" with your hand- all great mentally stimulating acts for pet and owner. 6.Babies adoption saves lives. Every baby that gets adopted is a baby's life that you've saved. Plus, taking your new baby home frees up more space for other babies in need.\n\nWhat could be more worthwhile than that?",
	},
];

//nameless user generator
for (let i = 0; i < 101; i++) {
	const sequentialUsername = 'Anonymous_Cat' + i;

	let randoLastName = '';
	let randoRoll = Math.ceil(Math.random() * 30);

	while (randoRoll >= 10) {
		randoLastName += 'X';
		randoRoll -= 10;
	}
	if (randoRoll === 9) {
		randoLastName += 'IX';
		randoRoll -= 9;
	}
	if (randoRoll === 4) {
		randoLastName += 'IV';
		randoRoll -= 4;
	}
	if (randoRoll >= 5) {
		randoLastName += 'V';
		randoRoll -= 5;
	}
	while (randoRoll > 0) {
		randoLastName += 'I';
		randoRoll--;
	}
	randoLastName = ' the ' + randoLastName;

	const randoAddress = Math.ceil(Math.random() * 100) + ' Fake St.';
	const staticAdmin = false;
	const randoMail = 'fake' + (i + 12) + '@fake.com';

	users.push({
		username: sequentialUsername,
		password: '123',
		shippingAddress: randoAddress,
		isAdmin: staticAdmin,
		email: randoMail,
		firstName: 'Wilson',
		lastName: randoLastName,
	});
}

//nameless product generator
const madlibs1 = [
	'Big',
	'Small',
	'Huge',
	'Cute',
	'Rigid',
	'Long',
	'Short',
];
const madlibs2 = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'indigo',
	'violet',
];
const madlibs3 = [
	'cookie',
	'brownie',
	'pretzel',
	'pizza',
	'rum',
	'noodle',
	'pie',
];

for (let i = 0; i < 101; i++) {
	let randoProductName =
		madlibs1[Math.floor(Math.random() * 6.99)] +
		' ' +
		madlibs2[Math.floor(Math.random() * 6.99)] +
		' ' +
		madlibs3[Math.floor(Math.random() * 6.99)];

	for (let j = 0; j < products.length; j++) {
		if (products[j].name === randoProductName) {
			randoProductName += i;
		}
	}

	const randoPrice = Math.floor(Math.random() * 100000) + 1;
	const randoInventory = (Math.ceil(Math.random() * 9) + 1) * 10;
	const randoCategory = Math.ceil(Math.random() * 4) + 1;
	const giygDescription = 'You cannot grasp the true form of this product!';

	products.push({
		name: randoProductName,
		price: randoPrice,
		inventory: randoInventory,
		category: randoCategory,
		description: giygDescription,
	});
}

async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);

	await Promise.all(users.map((user) => User.create(user)));
	await Promise.all(products.map((product) => Product.create(product)));

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

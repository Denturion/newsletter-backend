const UserModel = require('../models/user');
let express = require('express');
const app = require('../app');
let router = express.Router();
const cors = require('cors');

router.use(cors());

/* GET users listing. */
// router.get('/', function (req, res, next) {
// 	req.app.locals.db
// 		.collection('users')
// 		.find()
// 		.toArray()
// 		.then((results) => {
// 			console.log(results);
// 		});

// 	res.send('respond with a resource');
// });

/* Create new user */
router.post('/', async (req, res) => {
	try {
		let user = {
			email: req.body.email,
			pw: req.body.pw,
			subscription: req.body.subscription,
		};
		const newUser = new UserModel(user);
		await newUser.save();
		res.status(201).json(user);
	} catch (err) {
		console.error(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userFromDB =
			(await UserModel.findOne({ email: req.body.email })) || '';
		if (req.body.email != null && req.body.pw != null) {
			if (userFromDB.pw === req.body.pw) {
				console.log('Inloggad');
				console.log(userFromDB.email);
				console.log(userFromDB.subscription);
				res.json({
					user: {
						email: userFromDB.email,
						subscription: userFromDB.subscription,
					},
				});
				return;
			} else {
				console.log('Wrong username or password');
				return;
			}
		}
	} catch (err) {
		console.error(err);
	}
	return;
});

/* Edit subscription */
router.put('/editSubscription', (req, res) => {
	try {
		res.send(req.body);
		UserModel.findOneAndUpdate(
			{ email: req.body.email },
			{ subscription: req.body.subscription },
			() => {}
		);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;

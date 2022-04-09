const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const { urlencoded } = require('body-parser');


router.get('/portfolio', (req, res) => {
	console.log('Hello from the portfolio page');
	res.render('../views/portfolio.ejs');
});

router.get('/app-profile', (req, res) => {
	console.log('Hello from the app-profile page');
	res.render('../views/app-profile.ejs');
});

router.get('/chart-chartist', (req, res) => {
	console.log('Hello from the chart-chartist page');
	res.render('../views/chart-chartist.ejs');
});

router.get('/chart-chartjs', (req, res) => {
	console.log('Hello from the chart-chartjs page');
	res.render('../views/chart-chartjs.ejs');
});

router.get('/coin-details', (req, res) => {
	console.log('Hello from the coin-details page');
	res.render('../views/coin-details.ejs');
});


router.get('/market-capital', (req, res) => {
	console.log('Hello from the market-capital page');
	res.render('../views/market-capital.ejs');
});


const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
	PORT = 4000,
	NODE_ENV = 'development',
	session_Name = 'sid',
	session_Secret = 'hello world',
	session_Lifetime = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === 'production';
const users = [
	{
		id: 1,
		name: 'Alex',
		email: 'alex@gmail.com',
		password: 'helloalex',
	},
	{
		id: 2,
		name: 'bean',
		email: 'bean@gmail.com',
		password: 'hellobean',
	},
	{
		id: 3,
		name: 'jane',
		email: 'jane@gmail.com',
		password: 'hellojane',
	},
];
router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
router.use(
	session({
		name: session_Name,
		resave: false,
		saveUninitialized: false,
		secret: session_Secret,
		cookie: {
			maxAge: session_Lifetime,
			sameSite: true, // 'strict'
			secure: IN_PROD,
		},
	})
);

const redirectLogin = (req, res, next) => {
	if (!req.session.userId) {
		res.redirect('/login');
	} else {
		next();
	}
};

const redirectHome = (req, res, next) => {
	if (req.session.userId) {
		res.redirect('/home');
	} else {
		next();
	}
};

router.use((req, res, next) => {
	const { userId } = req.session;
	if (userId) {
		res.locals.user = users.find((user) => user.id === req.session.userId);
	}
	next();
});

router.get('/', (req, res) => {
	console.log('Homepage of admin panel');
	const { userId } = req.session;
	res.render('../views/root', { userId });
});

router.get('/home', redirectLogin, (req, res) => {
	const { user } = res.locals;
	console.log(req.sessionID);
	res.render('../views/index', { user });
});

// login route
router.get('/login', redirectHome, (req, res) => {
	// req.session.user_Id =
	res.render('../views/login');
});

// register
router.get('/register', redirectHome, (req, res) => {
	res.render('../views/registration');
});

router.post('/login', redirectHome, (req, res) => {
	const { email, password } = req.body;

	if (email && password) {
		const user = users.find(
			(user) => user.email === email && user.password === password
		); // todo: hash and validation

		if (user) {
			req.session.userId = user.id;
			return res.redirect('/home');
		}
	}
	res.redirect('/login');
});

router.post('/register', redirectHome, (req, res) => {
	const { name, email, password } = req.body;
	// todo: hash and validation

	if (name && email && password) {
		const exists = users.some((user) => user.email === email);
		console.log(exists);
		if (!exists) {
			const user = {
				id: users.length + 1,
				name,
				email,
				password, // todo : hash
			};
			users.push(user); //pushing to array
			//in actual app u gotaa push to DB
			req.session.userId = user.id;
			return res.redirect('/home');
		}
	}
	res.redirect('/register'); //todo: /register?error
});

router.post('/logout', redirectLogin, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.redirect('/home');
		}
		res.clearCookie(session_Name);
		res.redirect('/login');
	});
});

module.exports = router;

require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
//const response = require('../config/responseSchema');
// const model = require('../models/proschema')
require('./auth/passport');
const app = express();

const port = process.env.PORT || 5000;

require('./auth/passport');
const DB_URL = process.env.DB_URI;
const authRoutes = require('./routes/authRoutes.js');
app.use(express.json());
app.use(cors());

mongoose
	.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('✅ Database Connected!');
	})
	.catch((err) => {
		console.log('DB connect error:', err);
	});

//ejs templating
app.set('view engine', 'ejs');
app.use(express.static('./public/'));
app.use(express.static('./public-cryto/'));
app.use('/', require('./routes/routes.js'));

app.use('/auth', authRoutes);

app.listen(port);
console.log('Server started at http://localhost:' + port);

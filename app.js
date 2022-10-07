const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const router = express.Router();

const adminRouter = require('./routes/admin');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

const app = express();

async function init() {
	try {
		await mongoose.connect(
			'mongodb+srv://DavidFunck:Dragon666@newsletter.iphiywt.mongodb.net/?retryWrites=true&w=majority'
		);
		console.log('Connected to database.');
	} catch (err) {
		console.error(err);
	}
}

init();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app;

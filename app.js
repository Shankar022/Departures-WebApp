const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // whatever in the specified folder, can access in root route
app.use((req, res, next) => {
	req.currentTime = new Date().toISOString();
	next();
});


// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// For all UNHANDLED ROUTES
app.all('*', (req, res, next) => {
	// res.status(404).json({
	// 	status: 'Fail ❌',
	// 	message: `Can't find ${req.originalUrl} on the server!`
	// })
	next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// Error handling MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;

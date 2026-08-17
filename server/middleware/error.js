// Handles requests to routes that don't exist
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// Central error handler
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
	let message = err.message || "Server error";

	// Mongoose validation error
	if (err.name === "ValidationError") {
		statusCode = 400;
		message = Object.values(err.errors)
			.map((val) => val.message)
			.join(", ");
	}

	// Mongoose duplicate key error (e.g. unique email)
	if (err.code === 11000) {
		statusCode = 400;
		const field = Object.keys(err.keyValue)[0];
		message = `${field} already in use`;
	}

	res.status(statusCode).json({
		message: message || "Server error",
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

module.exports = { notFound, errorHandler };

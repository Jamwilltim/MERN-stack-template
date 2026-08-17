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

	if (err.name === "ValidationError") {
		statusCode = 400;
		message = Object.values(err.errors)
			.map((val) => val.message)
			.join(", ");
	}

	if (err.code === 11000) {
		statusCode = 400;
		const field = Object.keys(err.keyValue)[0];
		message = `${field} already in use`;
	}

	// Log unexpected server errors — not routine 400/401/404s
	if (statusCode >= 500) {
		console.error(err.stack);
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

module.exports = { notFound, errorHandler };

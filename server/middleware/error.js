// Handles requests to routes that don't exist
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// Central error handler
const errorHandler = (err, req, res, next) => {
	// If a status code was already set (e.g. res.status(400) before throwing), use it.
	// Otherwise default to 500.
	const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

	res.status(statusCode).json({
		message: err.message || "Server error",
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

module.exports = { notFound, errorHandler };

// Middleware for handling errors
const ErrorHandler = require("../utlis/errorHandler");

module.exports = (err, req, res, next) => {
    // Set a default status code (500 Internal Server Error) if not provided
    err.statusCode = err.statusCode || 500;

    // In development mode, send detailed error information (including stack trace)
    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }

    // In production mode, handle specific error cases
    if (process.env.NODE_ENV === "production") {
        let message = err.message;
        let error = new ErrorHandler(message);

        // Handle validation errors (e.g., missing required fields)
        if (err.name === "ValidationError") {
            message = Object.values(err.errors).map((value) => value.message);
            error = new ErrorHandler(message);
            err.statusCode = 400;
        }

        // Handle cast errors (e.g., invalid MongoDB ObjectId)
        if (err.name === "CastError") {
            message = `Resource not found: ${err.path}`;
            error = new ErrorHandler(message);
            err.statusCode = 400;
        }

        // Handle duplicate key errors (e.g., unique index violation)
        if (err.code === 11000) {
            message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // Handle JSON Web Token (JWT) errors
        if (err.name === "JSONWebTokenError") {
            message = `JSON Web Token is invalid. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // Handle expired JWT tokens
        if (err.name === "TokenExpiredError") {
            message = `JSON Web Token is expired. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // Send a concise error response
        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

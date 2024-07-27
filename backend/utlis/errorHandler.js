// Custom error handler class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
      super(message); // Call the parent class (Error) constructor with the provided message
      this.statusCode = statusCode; // Set the HTTP status code for the error response
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}

module.exports = ErrorHandler;

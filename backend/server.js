// Import necessary modules
const app = require('./app'); // Your Express application
const dotenv = require('dotenv'); // Environment variables
const path = require('path'); // Path module for file paths
const connectDatabase = require('./config/database'); // Database connection

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Connect to the database
connectDatabase();

// Start the server and listen on the specified port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});

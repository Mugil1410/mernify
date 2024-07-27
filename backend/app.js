// Import necessary modules
const express = require('express');
const app = express(); // Create an Express application
const cookieParser = require('cookie-parser') // Middleware for handling cookies
const path = require('path')
const products = require('./routes/products'); // Products route
const users = require('./routes/auth'); // Users (authentication) route
const orders = require('./routes/order'); //orders route
const payment = require('./routes/payment')
const errorMiddleware = require('./middlewares/error'); // Custom error handling middleware
const dotenv = require('dotenv'); // Environment variables
const cors = require('cors')

// Enable CORS
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Middleware: Parse incoming JSON data
app.use(express.json());

// Middleware: Parse cookies
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

// Routes: Use the users (authentication) route
app.use('/', users);

// Middleware: Authenticate user (applies to subsequent routes)
app.use('/', products);

// Routes: Use the orders route

app.use('/', orders);

//
app.use('/',payment)

// Middleware: Handle errors (applies to all routes)
app.use(errorMiddleware);

// Export the Express application
module.exports = app;

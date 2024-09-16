// Import necessary modules and configuration
const Products = require('../data/proucts.json'); // File contains product data
const Product = require('../models/productModel'); // Product model
const dotenv = require('dotenv'); // Environment variables
const connectDatabase = require('../config/database'); // Database connection

// Load environment variables from config.env
dotenv.config({ path: 'backend/config/config.env' });

// Connect to the database
connectDatabase();

// Function to seed products into the database
const seedProducts = async () => {
    try {
        // Clear existing products collection
        await Product.deleteMany();
        console.log("Product collection cleared");

        // Insert new products into the collection
        const createdProducts = await Product.insertMany(Products);
        console.log(`${createdProducts.length} products created`);
    } catch (error) {
        console.error(error);
    }
    process.exit(); // Exit the script
};

// Execute the seeding function
seedProducts();

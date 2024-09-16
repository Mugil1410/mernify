const express = require("express");
const Router = express.Router();

const { authenticatedUser, authorizeRoles } = require('../middlewares/authenticate')
const { paymentProcess, sendStripeApi,} = require("../controllers/paymentController");



Router.post('/payment/process',authenticatedUser,paymentProcess)

Router.get('/payment/stripe', authenticatedUser, sendStripeApi)

module.exports = Router;

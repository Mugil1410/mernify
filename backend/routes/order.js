const express = require('express')
const Router = express.Router()
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder} = require('../controllers/orderController');
const { authenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

Router.post('/order/new',authenticatedUser,newOrder)
Router.get('/myorders',authenticatedUser,myOrders)
Router.get('/order/:id',authenticatedUser,getSingleOrder)

//Admin Routes
Router.route('/admin/orders').get(authenticatedUser, authorizeRoles('admin'), orders)
// Common route for order by ID
Router.route('/admin/order/:id').put(authenticatedUser, authorizeRoles('admin'), updateOrder)
                                .delete(authenticatedUser, authorizeRoles('admin'), deleteOrder)


module.exports = Router;
const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const Order = require('../models/orderModel');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache')

/**
 * Add one order
 * @route POST /order
 * @summary Respond with string "ok"
 * @group Order
 * @param {Order.model} object.body.required Object containiing the property to insert
 * @return {String} 200 - "ok"
 * @returns {String} 500  - An error message 
 */

router.post('/order', checkJwt, flush, orderController.createOrder);

/**
 * Get all orders
 * @route GET /order
 * @summary Respond with all orders
 * @group Order
 * @return {Array<Order>} 200 - an array of orders
 * @returns {String} 500 - An error message 
 */

router.get('/order', cache, orderController.getAllOrders);

/**
 * Get order by id
 * @route GET /order
 * @summary Respond with all orders
 * @group Order
 * @return {Array<Order>} 200 - an array of orders
 * @returns {String} 500 - An error message 
 */

router.get('/order/:orderId', cache, orderController.getOrderById);

/**
 * Delete one order 
 * @route DELETE /order/{id}
 * @summary Respond with string "order removed"
 * @group Order
 * @param {string} id.path.required the id of order to update must be valid objectID
 * @return {String} 200 -  string The order removed
 * @returns {String} 500 - An error message 
 */
router.delete('/order/:orderId', checkJwt, flush, orderController.deleteOrderById);

/**
 * Update one order 
 * @route Update /order/{id}
 * @summary Respond with string "order Update"
 * @group Order
 * @param {string} id.path.required the id of order to update must be valid objectID
 * @return {String} 200 -  string The order removed
 * @returns {String} 500 - An error message 
 */
router.put('/order/:orderId', checkJwt, flush, orderController.updateOrderById);


module.exports = router;
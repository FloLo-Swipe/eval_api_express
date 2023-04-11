const express = require('express');

const router = express.Router();

const paymentController = require('../controllers/paymentController');
const Payment = require('../models/paymentModel');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache')

/**
 * Add one payment
 * @route POST /payment
 * @summary Respond with string "ok"
 * @group Payment
 * @param {Payment.model} object.body.required Object containiing the property to insert
 * @return {String} 200 - "ok"
 * @returns {String} 500  - An error message 
 */

router.post('/payment', checkJwt, flush, paymentController.createPayment);

/**
 * Get all payments
 * @route GET /payment
 * @summary Respond with all payments
 * @group Payment
 * @return {Array<Payment>} 200 - an array of payments
 * @returns {String} 500 - An error message 
 */

router.get('/payment', cache, paymentController.getAllPayments);

/**
 * Get payment by id
 * @route GET /payment
 * @summary Respond with all payments
 * @group Payment
 * @return {Array<Payment>} 200 - an array of payments
 * @returns {String} 500 - An error message 
 */

router.get('/payment/:paymentId', cache, paymentController.getPaymentById);

/**
 * Delete one payment 
 * @route DELETE /payment/{id}
 * @summary Respond with string "payment removed"
 * @group Payment
 * @param {string} id.path.required the id of payment to update must be valid objectID
 * @return {String} 200 -  string The payment removed
 * @returns {String} 500 - An error message 
 */
router.delete('/payment/:paymentId', checkJwt, flush, paymentController.deletePaymentById);

/**
 * Update one payment 
 * @route Update /payment/{id}
 * @summary Respond with string "payment Update"
 * @group Payment
 * @param {string} id.path.required the id of payment to update must be valid objectID
 * @return {String} 200 -  string The payment removed
 * @returns {String} 500 - An error message 
 */
router.put('/payment/:paymentId', checkJwt, flush, paymentController.updatePaymentById);


module.exports = router;
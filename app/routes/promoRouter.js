const express = require('express');

const router = express.Router();

const promoController = require('../controllers/promoController');
const Promo = require('../models/promoModal');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache')

/**
 * Add one promo
 * @route POST /promo
 * @summary Respond with string "ok"
 * @group Promo
 * @param {Promo.model} object.body.required Object containiing the property to insert
 * @return {String} 200 - "ok"
 * @returns {String} 500  - An error message 
 */

router.post('/promo', checkJwt, flush, promoController.createPromo);

/**
 * Get all promos
 * @route GET /promo
 * @summary Respond with all promos
 * @group Promo
 * @return {Array<Promo>} 200 - an array of promos
 * @returns {String} 500 - An error message 
 */

router.get('/promo', cache, promoController.getAllPromos);

/**
 * Get promo by id
 * @route GET /promo
 * @summary Respond with all promos
 * @group Promo
 * @return {Array<Promo>} 200 - an array of promos
 * @returns {String} 500 - An error message 
 */

router.get('/promo/:promoId', cache, promoController.getPromoById);

/**
 * Delete one promo 
 * @route DELETE /promo/{id}
 * @summary Respond with string "promo removed"
 * @group Promo
 * @param {string} id.path.required the id of promo to update must be valid objectID
 * @return {String} 200 -  string The promo removed
 * @returns {String} 500 - An error message 
 */
router.delete('/promo/:promoId', checkJwt, flush, promoController.deletePromoById);

/**
 * Update one promo 
 * @route Update /promo/{id}
 * @summary Respond with string "promo Update"
 * @group Promo
 * @param {string} id.path.required the id of promo to update must be valid objectID
 * @return {String} 200 -  string The promo removed
 * @returns {String} 500 - An error message 
 */
router.put('/promo/:promoId', checkJwt, flush, promoController.updatePromoById);


module.exports = router;
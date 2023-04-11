const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const Product = require('../models/productModel');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache')

/**
 * Add one article
 * @route POST /article
 * @summary Respond with string "ok"
 * @group Article
 * @param {Product.model} object.body.required Object containiing the property to insert
 * @return {String} 200 - "ok"
 * @returns {String} 500  - An error message 
 */

router.post('/product', checkJwt, flush, productController.addProduct);

/**
 * Get all articles
 * @route GET /article
 * @summary Respond with all articles
 * @group Article
 * @return {Array<Product>} 200 - an array of articles
 * @returns {String} 500 - An error message 
 */

router.get('/product', cache, productController.getAllProducts);


/**
 * Update one article 
 * @route PUT /article/{id}
 * @summary Respond with string "article updated"
 * @group Article
 * @param {string} id.path.required the id of article to update must be valid objectID
 * @param {Product.model} object.body.required - the propertie to update 
 * @return {String} 200 -  string The article updated 
 * @returns {String} 500 - An error message 
 */
router.put('/product/:id', checkJwt, flush, productController.updateProduct);


/**
 * Delete one article 
 * @route DELETE /article/{id}
 * @summary Respond with string "article removed"
 * @group Article
 * @param {string} id.path.required the id of article to update must be valid objectID
 * @return {String} 200 -  string The article removed
 * @returns {String} 500 - An error message 
 */
router.delete('/product/:id', checkJwt, flush, productController.deleteProduct);

/**
 * Get all articles
 * @route GET /article/{category}
 * @summary Respond with all articles by category
 * @group Article
 * @param {String} category.path.required - the category of the article to retrieve
 * @return {Array<Product>} 200 - an array of Products
 * @returns {String} 500 - An error message 
 */
router.get('/product/:category', cache, productController.getProductByCategory);

/**
 * Get all Products
 * @route GET /searchArticle/search
 * @summary Respond with all Products taht match with the search query 
 * @group Article
 * @param {String} search.query.required - the cseatch query to match Products
 * @return {Array<Product>} 200 - an array of Products
 * @returns {String} 500 - An error message 
 */
router.get('/searchProduct/search', cache, productController.searchProduct)

module.exports = router;
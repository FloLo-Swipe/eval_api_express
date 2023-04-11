const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const checkJwt = require('../../middlewares/checkJwt');
const User = require('../models/userModel');


/**
 * Signin route 
 * @route POST /signin
 * @summary Respond with signin succes 
 * @group User 
 * @param {User.model} object.body.required Object containing propertis to insert
 * @return {String} 200 - Signin succes 
 * @returns {String} 500 - An error message 
 */
router.post('/signin', userController.signin)

/**
 * Login route 
 * @route POST /login
 * @summary Respond with login success 
 * @group User 
 * @param {User.model} object.body.required Object containing propertis to insert
 * @return {String} 200 - login success 
 * @returns {String} 500 - An error message 
 */
router.post('/login', userController.login);

/**
 * Login route 
 * @route POST /signout
 * @summary Respond with signout success 
 * @group User 
 * @return {String} 200 - login success 
 * @returns {String} 500 - An error message 
 */
router.get('/signout', checkJwt, userController.signout)

module.exports = router
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const checkJwt = require('../../middlewares/checkJwt');

/**
 * Add a comment to a product
 * @route POST /comment/{id}
 * @group Comment
 * @param {string} id.path.required - The id of the product
 * @param {Comment.model} comment.body.required - The comment object
 * @returns {Object} 200 - Comment added
 * @returns {Error} 500 - Unexpected error
 */
router.post('/comment/:id', checkJwt, commentController.addComment);

/**
 * Get all comments of a product
 * @route GET /comment/{id}
 * @group Comment
 * @param {string} id.path.required - The id of the product
 * @returns {Array.<Comment>} 200 - List of comments
 * @returns {Error} 500 - Unexpected error
 */
router.get('/comment', commentController.getAllComments);

/**
 * Get a comment by id
 * @route GET /comment/{id}/:commentId
 * @group Comment
 * @param {string} id.path.required - The id of the product
 * @param {string} commentId.path.required - The id of the comment
 * @returns {Comment} 200 - The comment
 * @returns {Error} 500 - Unexpected error
 */
router.get('/comment/:commentId', commentController.getCommentById);

/**
 * Update a comment by id
 * @route PUT /comment/{id}/:commentId
 * @group Comment
 * @param {string} id.path.required - The id of the product
 * @param {string} commentId.path.required - The id of the comment
 * @param {Comment} comment.body.required - The comment object
 * @returns {Object} 200 - Comment updated
 * @returns {Error} 500 - Unexpected error
 */
router.put('/comment/:commentId', checkJwt, commentController.updateComment);

/**
 * Delete a comment by id
 * @route DELETE /comment/{id}/:commentId
 * @group Comment
 * @param {string} id.path.required - The id of the product
 * @param {string} commentId.path.required - The id of the comment
 * @returns {Object} 200 - Comment deleted
 * @returns {Error} 500 - Unexpected error
 */
router.delete('/comment/:commentId', checkJwt, commentController.deleteComment);

module.exports = router;

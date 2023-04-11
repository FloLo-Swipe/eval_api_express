const commentModel = require('../models/commentModel');
const productModel = require('../models/productModel')

// add comment 
async function addComment(req, res) {
  try {
    const { id, content } = req.body;
    const productId = req.params.id;

    // Vérifier l'existence du produit
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const comment = new commentModel({
      id: id,
      user_id: req.payload._id,
      product_id: productId,
      content: content
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get all comments
async function getAllComments(req, res) {
  try {
    const comments = await commentModel.find();
    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get comment by id
async function getCommentById(req, res) {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// update comment
async function updateComment(req, res) {
  try {
    const {content} = req.body;
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    comment.content = content;

    await comment.save();
    res.json({ message: 'comment updated' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// delete comment
async function deleteComment(req, res) {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    await comment.deleteOne();
    res.json({ message: 'comment deleted' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment
}

const {Schema, model} = require('../../database');

/**
 * An entity representing comment model
 * @typedef Comment
 * @property {Number} id
 * @property {ObjectId} user_id
 * @property {ObjectId} product_id
 * @property {string} content
 * @property {Date} publication_date 
 */

const commentSchema = new Schema({
    id: {type: Number, required: false, unique : true},
    user_id : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    product_id : {type : Schema.Types.ObjectId, ref : 'Product', required : true},
    content : {type : String, required: true},
    publication_date : {type: Date, defaul: Date.now}
});

const Comment = model ('Comment', commentSchema);

module.exports = Comment;
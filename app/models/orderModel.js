const { Schema, model } = require('../../database');

const productSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productList: [productSchema]
});

const Order = model('Order', orderSchema);

module.exports = Order;

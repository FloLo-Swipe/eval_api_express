const { Schema, model } = require('../../database');

/**
 * A entity representing a promotion information/model
 * @typedef Promo
 * @property {String} name
 * @property {Number} reduction
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {String} productId
 */

const promoSchema = new Schema({
  name: { type: String, required: true },
  reduction: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Promo = model('Promo', promoSchema);

module.exports = Promo;

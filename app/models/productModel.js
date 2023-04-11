const {Schema, model} = require('../../database');

/**
 * An entity representing Products model
 * @typedef Product
 * @property {Number} id
 * @property {string} name
 * @property {Number} stock
 * @property {string} category
 * @property {string} marque
 * @property {Number} price
 */

const productSchema = new Schema ({
    id: {type: Number, required: true, unique : true},
    name : {type : String, required: true},
    stock : {type : Number, required : true},
    category : {type : String, required: true, enum :["Ordinateurs de bureau","Ordinateurs portables",
     "Imprimantes", "Stockage", "Composants"]},
    marque : {type : String, required : true},
    price : { type : Number, require: true}
});

const Product = model("products", productSchema);

module.exports = Product;

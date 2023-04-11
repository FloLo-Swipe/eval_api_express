const {Schema, model} = require('../../database');

/**
 * A entity repensenting a user informations/model
 * @typedef User
 * @property {String} email
 * @property {String} password
 */

const userSchema = new Schema ({
    email : {type : String, required: true, unique: true},
    password: {type : String, required: true}
});

const User = model('User', userSchema);

module.exports = User;
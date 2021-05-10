var mongoose = require('mongoose');

const Item = new mongoose.Schema({
	sku: {type: String},
	name: {type: String},
    desc: {type: String}, 
    price: {type: Number},
    inv_level: {type: Number},
    tax: {type: Number} // TODO add a functionality to have different tax codes with different values
    //TODO - Add image
});

module.exports = mongoose.model('Item', Item);
var mongoose = require('mongoose') //默认去node_module查找
var Schema = mongoose.Schema;  //模型

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String
});

module.exports = mongoose.model('Good',productSchema);



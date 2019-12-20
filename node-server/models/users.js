var mongoose = require('mongoose') //默认去node_module查找
var Schema = mongoose.Schema;  //模型

var userSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "productId": String,
            "productName": String,
            "salePrice": String,
            "productImage": String,
            "checked":String,
            "productNum":String
        }
    ],
    "addressList":Array
});

module.exports = mongoose.model('User',userSchema);


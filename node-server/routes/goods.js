var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接数据库
mongoose.connect('mongodb://106.13.49.123:27017/dumall');

//成功
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

//失败
mongoose.connection.on("error", function () {
    console.log("MongoDB connected failed.")
});

//关闭连接
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});

//接口测试
router.get("/goodsrouter",function (req,res,next) {
    res.send("hello, goodslist")
});

//实现goods二级路由
router.get("/", function(req,res,next) {
    var sort = req.param("sort");
    Goods.find({}, function(err,doc) {
        if (err){
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
});

module.exports = router;
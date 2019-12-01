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
    //排序接口 req.param解析url参数
    let page = req.param('page');
    let pageSize = parseInt(req.param('pageSize'));
    // 1代表升序
    let sort = req.param("sort");
    let skip = (page -1) * pageSize;

    let params = {};
    // Goods是mongoose.Schema对象
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

    goodsModel.sort({salePrice: sort});
    goodsModel.exec(function(err,doc) {
    // Goods.find({}, function(err,doc) {
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
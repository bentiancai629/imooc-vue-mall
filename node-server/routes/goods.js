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

//查询商品列表
router.get("/list", function(req,res,next) {
    //排序接口 req.param解析url参数
    let page = req.param('page');
    let pageSize = parseInt(req.param('pageSize'));
    // 1代表升序
    let sort = req.param("sort");
    let skip = (page -1) * pageSize;
    let params = {};
    let priceLevel = req.param('priceLevel');
    let priceGt = '', priceLte = '';
    //价格区间排序
    if(priceLevel != 'all'){
        switch (priceLevel) {
            case '0':priceGt = 0; priceLte = 100;break;
            case '1':priceGt = 100; priceLte = 500;break;
            case '2':priceGt = 500; priceLte = 1000;break;
            case '3':priceGt = 1000; priceLte = 5000;break;
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }

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

//加入购物车
// goods已经是1级路由 这里是2级路由
router.post('/addCart',function (req,res,next) {
    var userId = "100000077", productId = req.body.productId; //get => param; post => req.body
    var Users = require('../models/users');

    //查询一个用户
    Users.findOne({userId:userId}, function (err,userDoc){
        if(err) {
            console.log("查询出错：" + userId);
            res.json({
                status:"1",
                msg:err.message
            })
        }else {
            //查询没有error,拿到用户信息
            //匹配userDoc的productId是否已经添加过
            if(userDoc){
                let goodsItem = '';
                userDoc.cartList.forEach(function(item) {
                    if (item.productId==productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                //判断goodsItem true or false？
                if(goodsItem){
                    userDoc.save(function (err2,doc2) {
                        if(err2){
                            console.log(err2.message);
                            // 商品查询有错
                            res.json({
                                status: "1",
                                message: err2.message
                            })
                        }else{
                            //购物车信息保存成功
                            res.json({
                                status:"0",
                                message:'',
                                result:'suc'
                            })
                        }
                    });
                }else {
                    //查询商品信息
                    Goods.findOne({productId:productId}, function (err1,doc) {
                        if(err1){
                            // 商品查询有错
                            res.json({
                                status: "1",
                                message: err1.message
                            })
                        }else{
                            //商品查询正常
                            if(doc){
                                //查询结果存在
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2,doc2) {
                                    if(err2){
                                        console.log(err2.message);
                                        // 商品查询有错
                                        res.json({
                                            status: "1",
                                            message: err2.message
                                        })
                                    }else{
                                        //购物车信息保存成功
                                        res.json({
                                            status:"0",
                                            message:'',
                                            result:'suc'
                                        })
                                    }

                                });

                            }
                        }
                    });
                }
            };
        }
    });
});

module.exports = router;
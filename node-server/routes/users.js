var express = require('express');
var router = express.Router();

//导入模型
var Users = require('./../models/users');

//登入的二级路由设置
router.post("/login", function (req, res, next) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    //查找某一个用户
    Users.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            // 解析mongo返回的doc
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60,  //cookies周期一小时
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60,  //cookies周期一小时
                });
                // req.session.user = doc;  //存到session
                // 请求成功
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            }
        }
    });
});


// 登出接口
router.post('/logout', function (req, res, next) {
    // 清理cookie
    res.cookie("userId", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''
    });
});

//检查登陆
router.get("/checkLogin", function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName
        });
    } else {
        //没取到cookies 没登陆
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
});

//查询用户名下的购物车数据
router.get("/cartList", function (req, res, next) {
    var userId = req.cookies.userId;
    Users.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            //查询请求成功
            if(doc){
                console.log("cartList: " + doc.cartList);
                //数据库有数据
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                });
            }
        }
    })
});

module.exports = router;
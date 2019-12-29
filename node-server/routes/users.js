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
            if (doc) {
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

//删除购物车
router.post("/cartDel", function (req, res, next) {
    var userId = req.cookies.userId, productId = req.body.productId;
    Users.update({
        userId: userId
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, function (err, doc) {
        if (err) {
            //删除失败
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    });
});

//修改购物车商品数量
router.post("/cartEdit", function (req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    //更新数据库
    Users.update({"userId": userId, "cartList.productId": productId}, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    }, function (err, doc) {
        //数据库操作失败
        if (err) {
            //删除失败
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    })
});

//全选
router.post("/editCheckAll", function (req, res, next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll;
    Users.findOne({userId: userId}, function (err, user) {
        if (err) {
            //删除失败
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            if (user) {
                //遍历商品修改checked状态
                user.cartList.forEach((item) => {
                    item.checked = checkAll;
                });
                user.save(function (err1, doc) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err1.message,
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                        });
                    }
                })
            }


        }
    })
});

//查询用户地址
router.get("/addressList",function (req,res,next) {
    var userId = req.cookies.userId;
    Users.findOne({userId:userId}, function (err,doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc.addressList
            });
        }
    })
});

module.exports = router;
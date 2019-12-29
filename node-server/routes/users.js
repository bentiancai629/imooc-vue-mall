var express = require('express');
var router = express.Router();

//导入模型
var Users = require('./../models/users');


//登陆的二级路由设置
router.post("/login", function(req, res, next) {
    var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
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
                    path:'/',
                    maxAge: 1000*60*60,  //cookies周期一小时
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

module.exports = router;
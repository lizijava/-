//引入
const express = require('express');
//创建路由对象
const home = express.Router();
//二级路由
home.get('/',(req, res) => {   //   / 相当与什么都不写
    res.send('欢迎来到首页')
})
//方法导出
module.exports = home;


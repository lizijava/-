//引入
const { render } = require('art-template');
const express = require('express');





//创建路由对象
const admin = express.Router();


//接收登录的post请求参数
admin.post('/login', require('./admin/login'));
//二级路由
admin.get('/login',require('./admin/loginPage'));
//创建用户列表路由
admin.get('/user', require('./admin/userPage'));
//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));  
//创建用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
//创建用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));
//创建用户删除功能路由
admin.get('/delete', require('./admin/user-delete'));
//创建文章列表页面路由
admin.get('/article', require('./admin/article'));
//创建文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
//创建文章添加路由功能
admin.post('/article-add', require('./admin/article-add.js'))
//方法导出
module.exports =  admin;


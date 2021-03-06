const express = require('express');
const app = express();
const home = require('./router/home');
const admin = require('./router/admin');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const { text } = require('body-parser');
const dateFormat = require('dateFormat'); //时间处理
const temlate = require('art-template');
temlate.defaults.imports.dateFormat = dateFormat; //向模板内导入 

require('./model/connect')
require('./model/user')
//处理past参数
app.use(bodyParser.urlencoded({extended:false}))  //bodyParser不能处理二进制数据
//配置session参数  它是服务器端的 处理cookie   
app.use(session({secret:'secret key'})) ;   //里面的参数传递的是一个对象 属性secret必须  后面的值随便写
//设置模板默认地址
app.set('views', path.join(__dirname, 'views'));
//设置模板默认后缀
app.set('view engine', 'art');
//设置art模板渲染引擎  
app.engine('art',require('express-art-template'));   // 容易漏渲染后缀art   容易漏express-

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

//拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

//配置路由响应地址
app.use('/home', home);
app.use('/admin', admin);     //先配置响应地址，否则错误代码 找不到地址



//框架提供的错误处理中间件
app.use((err, req, res, next) => {
     //将字符串转为对象JSON.parse()  方便调用  
     const result = JSON.parse(err);  //next()  实际传递的就是err  
   //为了加上id
   let params = [];
  for(let attr in result) {    //循环result 的那些属性
    if (attr != 'path') {
        params.push(attr + '=' + result[attr]);  //数组的push方法可以将数据放入数组    里面是将内容改为message='...'的形式
    }
  }
  res.redirect(`${result.path}?${params.join('&')}`);    //数组的join方法 拼接
    // res.redirect(`${result.path}?message=${result.message}`); 
    //res.redirect(`/admin/user-edit?message=${e.message}`);//这里是用模板字符串解析 要用``   也可以+ e.message拼接   重定向到表单编辑页面且传递错误信息
}
)

app.listen(80);
console.log('网站服务器启动成功');
    

const { User,  validateUser } = require('../../model/user');   //用户集合的构造函数
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {  //别忘了路由处加next
    
   
    try {                    //try{ }catch(){ }   
    
     //不符合规则的  重定向且返回错误信息
       await validateUser(req.body);
    }catch(e){
       return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));  //调用next()方法就会触发框架的错误处理中间件（只接受字符串），JSON.stringify()对象转字符串
    }             
     
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({email: req.body.email});
    //如果邮箱已经注册  
    if (user) {
        //重定向到用户添加页面
    //return res.redirect(`/admin/user-edit?message=邮箱地址被占用`);  // 这里用的是模板字符串解析中文直接写   redirect 里面包含了res.end()
    return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址被占用'}))
}
    //对密码加密处理
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;  //替换
    //添加到数据库
    await User.create(req.body);
    //重定向到用户列表
    res.redirect('/admin/user');
    // res.send(req.body);   //如果前面包含了res.end()这里就不能用res.send()  否则会报错
}

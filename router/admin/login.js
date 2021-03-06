//通过结构形式导入集合函数
const {User} = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //建立服务器端的验证（这里写的就是服务器端) 写在html中的是客户端 （客户端不安全，一旦禁用javascript 就失效）
    const {email, password} = req.body;
    //用户不输入时
    if(email.trim().length == 0 || password.trim().length == 0){
                                                                                  //通过模板来装饰提示信息   并且加定时器
        return res.status(400).render('admin/error', {msg:'请输入邮箱或密码'})    //send()默认200，  return 是阻止程序向下执行
    }
        //用户输入错误时                     根据邮箱地址查询用户信息
        let user = await User.findOne({email});  //查询到了返回对象 没查到返回空   await的异步函数是包着它的那个
        if (user) {
            let isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                req.session.username = user.username;  //将用户名添加到req中 req的username是新建的属性
               // res.send('登录成功')
               req.app.locals.userInfo = user;  //这里不需要导入app对象 因为req.app拿到的就是app.js里的app对象   在locals 添加userInfo属性  模板能直接用
               res.redirect('/admin/user');
            }else {
                res.status(400).render('admin/error', {msg:'邮箱或密码错误'})
            }
        }else {
            res.status(400).render('admin/error', {msg:'邮箱或密码错误'})
        }
    
}

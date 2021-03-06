const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
//创建集合模板
const userSchema = new mongoose.Schema({  // Schema构造函数  要实例化
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true   //保证唯一，插入数据库时不重复
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    state:{    
        type:Number,  
        default:0    //设置默认为0    0启用状态 1禁用状态
    }

});


//应用集合模板
const User = mongoose.model('User', userSchema);      //返回构造函数


//创建密码加密的数据
// async function createUser() {
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123456', salt);
//     const user = await User.create({
//     username:'iteheima',
//     email:'itheima@itcast.cn',
//     password:pass,
//     role:'admin',
//     state: 0 
//     });
// }
// createUser();
//创建数据 （有数据上面的库和集合才会自动创建）
// User.create({
//     username:'iteheima',
//     email:'itheima@itcast.cn',
//     password:'12314',
//     role:'admin',
//     state: 0
// }).then(()=>{
//     console.log('用户创建成功')
// }).catch(()=>{
//     console.log('用户创建失败')
// })


//定义验证规则
const validateUser = user =>{
const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
    email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),      //regex()正则表达式
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
};
//实施验证
   return Joi.validate(user, schema);
}
module.exports = {      //以对象形式 是为了以后加入更多
    User ,              // 实际上是User:User   ES6中键值相同 可以写成一个User
    validateUser
};
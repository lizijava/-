const {User} = require('../../model/user');  //对象导出 也应该对象导入 直接const User是拿不出来的 否则会报findOne不是函数
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    //接受post
const {username, email, role, state, password} = req.body;    //用解构的方式可以减少  req.body
    //改哪个
    const id = req.query.id;
    //从数据库中拿出来
    let user = await User.findOne({_id:id});   //里面参数类型为对象  
    //密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
       await User.updateOne({_id:id},{
           username:username,
           email:email,
           role:role,
           state:state,
           password:password
       })
       res.redirect('/admin/user');
    }else{
        let obj = {path:'/admin/user-edit',message:'密码比对失败',id:id};
         next(JSON.stringify(obj));
    }
}
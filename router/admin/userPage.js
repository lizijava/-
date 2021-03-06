const { render } = require('art-template');
const { User } = require('../../model/user');
module.exports = async(req, res) => {

    //添加标识  来访问管理页面
    req.app.locals.currentLink = 'user';  //  给locals添加一个新的属性  自定义为currentLink

     //接收用户传递过来的当前页参数
     let page = req.query.page || 1;  //用户没有传入页码 默认1
     //每页显示的数据条数
     let pagesize = 1;
     //查询用户总数
     let count = await User.countDocuments({});  //查询数据库的用户总数   参数是查询条件
     //总页数
     let total = Math.ceil(count / pagesize);  // Math.ceil 向上取整
     //res.send('总页数是' + total);
     //res.send(page);
     //页码对应数据开始查询位置
     let start = (page - 1) * pagesize;   //本页的开始是上一页数乘页的个数  （第一页从0开始  一页10个数  那么查询到9  ）

    //将用户信息从数据库中（对应页数 位置）查询出来
    let users = await User.find({}).limit(pagesize).skip(start);  //limit限制每页数目  
    //res.send(users)

    res.render('admin/user', {        
        users:users,
        page: page,
        total: total                //传递的参数
        })                               // 第二个参数 就是向页面中展示的数据
}
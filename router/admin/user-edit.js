
const { User } = require('../../model/user');
module.exports = async(req, res) => {

//添加标识  来访问管理页面
req.app.locals.currentLink = 'user';  // 这样是可以添加到模板中的  用来作判断 给locals添加一个新的属性  自定义为currentLink
    
 
    //获取地址的id参数
    const {  message,id } = req.query;


    if(id){
        //修改操作   修改和添加区别 是否给渲染模板传递user数据
        let user = await User.findOne({_id: id});

        //渲染编辑页面
        res.render('admin/user-edit', {
            message: message,    //将错误参数的变量传递  属性：变量  使用模板渲染并传递
            user: user,
            link:'/admin/user-modify?id='+id,   //区分地址    地址发生改变
            button:'修改'
        })
        }
          

    else {
        res.render('admin/user-edit', {
            message:message,
            link:'/admin/user-edit',
            button:'添加'
        })
        //添加操作
    }
}


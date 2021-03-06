module.exports = (req, res) => {

    //添加标识  来访问管理页面
    req.app.locals.currentLink = 'article';  //  给locals添加一个新的属性  自定义为currentLink

    res.render('admin/article-edit.art');    //渲染是根据配置文件夹
}
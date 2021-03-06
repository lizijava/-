const formidable = require('formidable');  //能接受二进制
const path = require('path');
const { Article } = require('../../model/article')
module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //保留上传文件后缀  默认是不保留(就会出现上传的图片没后缀)
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async (err, fields, files) => {
        //err 错误信息
        //fields 普通表单数据 (内容))
        //files 上传数据相关
           //split分割   cover是files下的一个对象 数据都在里面
        //res.send(files.cover.path.split('public')[1])   //数据库存储的是服务器的绝对路径 /  从uploads 开始
        //向数据库插入数据
       await Article.create({
            title: fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content,
        });
        //重定向到文章列表页面
        res.redirect('/admin/article')
    })
   
}
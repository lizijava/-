const { render } = require('art-template');
const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports =  async(req, res) => {
	
	// 标识 标识当前访问的是文章管理页面
	req.app.locals.currentLink = 'article';    //   locals可以让模板拿到  currentLink是一个属性  article 是它的值
	
	
//查询数据库的所有文章数据
//let articles = await Article.find().populate('author');  //pupulate()多集合联合查询     会报错
//page(1)当前页 size(2)每页显示的数据数目 display(3)显示的页码数 exec()向数据库发送查询请求 否则会不成功
let articles = await pagination(Article).find().page(1).size(2).display(3).populate('author').exec(); //解决 加上lean()让mongoose返回普通对象 而不是mongoose文档对象
	// res.send(articles);
	var str = JSON.stringify(articles);
	articles = JSON.parse(str);

	// 渲染文章列表页面模板
res.render('admin/article.art',{
	articles:articles       //把数据articles放到模板中
});
}
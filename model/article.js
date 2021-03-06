const { Mongoose } = require("mongoose");

//引入模块
const mongoose = require('mongoose');
//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
    type: String,
    maxlength: 20, 
    required: [true, '请填写文章标题']
},
author: {
    type: mongoose.Schema.Types.ObjectId,   //数据库特有的类型 
    ref:'User',  //关联的集合
    required:[true, '请传递作者'] 
},
publishDate:{
    type: Date,
    default: Date.now   //时间不输入默认为现在
},
cover:{
    type:String,
    default: null
},
content: {
    type:String
}
});

//根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

//将集合作为模块导出
module.exports = {
    Article
}
const mongoose = require('mongoose');
//连接数据库
  mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,  useUnifiedTopology: true })   //   mongodb 替代的是http 返回的是promise对象 就可以用 .then  .catch
 .then(() => {
     console.log('数据库连接成功');
 })
 .catch(() => {
     console.log('数据库连接失败')
 });

const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //获取用户id
    //res.send(req.query.id);
    //删除
    await User.findOneAndDelete({_id: req.query.id});
    //页码重定向
    res.redirect('/admin/user');
}
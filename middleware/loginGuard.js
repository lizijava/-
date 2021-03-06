const guard = (req, res, next) => {   //匹配的是以/admin开头
    if (req.url != '/login' && !req.session.username ) {   
       res.redirect('/admin/login'); 
    }else{
        next();  //登录状态将请求放行
    }

}
module.exports = guard;
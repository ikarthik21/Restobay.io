function auth(req,res,next){
    if(req.isAuthenticated()){
     return next();
    }
    return res.redirect('/sign');
    
    }
    
    module.exports=auth;   
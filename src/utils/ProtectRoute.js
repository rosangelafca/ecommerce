module.exports = function ProtectRoute(req,res,next){
    if(!req.session.user){
        req.flash('erroMsg','Acesso restrito, Faça login!')
        return res.redirect('/login');
    }
    next();
}
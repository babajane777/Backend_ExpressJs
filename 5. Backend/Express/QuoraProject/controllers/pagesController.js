module.exports.login = function(req, res){
    return res.render('log-in');
}

module.exports.Signin = function(req, res){
    return res.render('sign-in');
}

module.exports.questgrid = function(req, res){
    return res.render('Ques');
}

module.exports.close = function(req,res){
    return res.redirect('/');
}

module.exports.post = function(req,res){
    return res.render('post')
}
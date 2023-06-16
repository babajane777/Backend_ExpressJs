// controllers are the actions which were imported into index.js of routes.

module.exports.home = function(req,res){
    return res.render('home')
}
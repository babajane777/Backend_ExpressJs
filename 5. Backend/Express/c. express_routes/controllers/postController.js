module.exports.posts = function(req,res){
    return res.end('<h1>this is post controller </h1>')
}

module.exports.secondpost = function(req,res){
    return res.end('<h1>this is second post.</h1>')
}
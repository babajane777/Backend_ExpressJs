const Post = require('../models/post');

module.exports.posts = async function(req , res){
    // try{
    //     let user = req.user;

    //     if(!user){
    //         return res.redirect('log-in')
    //     }
    //     let post = await Post.create({

    //         post : req.body.post,
    //         user : req.user._id,
    //         image : req.file.path
            
    //     })
        return res.redirect('back');
       
    // }catch(err){
    //     if(err){
    //         console.log(err)
    //     }
    //     return res.redirect('back');

    // }
   
}



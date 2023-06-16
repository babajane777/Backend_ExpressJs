const Comment = require('../models/comments');
const Post  = require('../models/post');

module.exports.createcomment = async function(req, res){
    try{
        let user= req.user;
        if(!user){
            return res.redirect('/login');
        }

        let post = await Post.findById(req.body.post) ;
    
        let comment = await Comment.create({
            user: req.user._id,
            post: req.body.post,
            comment: req.body.comment
        })

        post.comments.push(comment);
        post.save();

        comment =  await comment.populate('user', 'username email');

        return res.redirect('back');

    }catch(err){
    

        console.log(err);

    }

}
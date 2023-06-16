const Post = require('../models/post');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
    const posts = await Post.find().populate('user').populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
     return res.render('home',{
        title: 'codial/home',
        posts: posts
     })

    // populate the user of each post
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     console.log(posts);
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })

}

// module.exports.actionName = function(req, res){}
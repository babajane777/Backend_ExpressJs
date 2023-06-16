const Post = require('../models/post');
const Comments = require('../models/comments');

module.exports.homepage = async function (req, res) {
    try {
        
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        return res.render('home', {
             posts: posts
            });

    } catch (err) {
        if (err) {
            console.log(err)
        }

    }

}
const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/homeController');
const pagescontroller = require('../controllers/pagesController');
// const postcontroller = require('../controllers/postController');
const Post = require('../models/post');
const uploads = Post.uploadedposts;
const imagepath = Post.postImagesPath;
const passport = require('passport');
const commentcontroller = require('../controllers/commentController');



router.get('/' , homecontroller.homepage);
router.get('/close' , pagescontroller.close);
router.get('/ask', pagescontroller.questgrid);
router.get('/post', pagescontroller.post);
router.get('/login', pagescontroller.login);
router.get('/signup',pagescontroller.Signin);
router.use('/user', require('./users'));
router.use('/comment', require('./comments'));
// router.use('/posts', require('./posts'));


router.post('/create' , uploads, function(req, res){
    let user = req.user;
    if(!user){
        return res.redirect('login');
    }
    Post.create({
        post:req.body.post,
        user: req.user._id,
        image: imagepath + '/' + req.file.filename

    })
    return res.redirect('/post')
});







module.exports = router; 
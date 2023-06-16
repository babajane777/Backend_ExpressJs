const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');

console.log("router loaded");

router.get('/',homeController.home);
router.get('/test', function(req,res){
    return res.render('test')
})

// this directs request to the user folder
router.use('/users', require('./users'));

// this directs request to the posts folder
router.use('/posts' , require('./posts'));

// router.use('/test' , require('./test'));



module.exports = router;
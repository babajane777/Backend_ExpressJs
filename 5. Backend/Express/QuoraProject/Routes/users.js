const express = require('express');
const router = express.Router();
const passport = require('passport');
const userscontroller = require('../controllers/userController');

router.post('/create', userscontroller.create);
router.post('/createsession' , userscontroller.createsession);

router.get('/auth/google' , passport.authenticate('google', {scope:['profile' , 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect : '/login'}), function(req, res){
    return res.redirect('back');
});

module.exports = router;